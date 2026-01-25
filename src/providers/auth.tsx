import axios, { AxiosError, AxiosInstance, AxiosResponse, HttpStatusCode } from "axios";
import log from "loglevel";
import { Accessor, createComputed, createContext, createMemo, createSignal, onCleanup, onMount, ParentProps, PropsWithChildren, useContext } from "solid-js";

export interface ILoginRequest {
  password: string;
}

export interface IAuthContext {
  signIn: (request: ILoginRequest) => Promise<void>;
  signOut: () => void;
  isAuthenticated: Accessor<boolean | null>
  apiHttpClient: AxiosInstance
};

interface ILoginResponse {
  auth_token: string;
};

const AuthContext = createContext<IAuthContext>();

export function AuthProvider(props: ParentProps) {
  const authTokenEntry = "authToken";
  const [authToken, setAuthToken] = createSignal<string | null>(localStorage.getItem(authTokenEntry));
  const setAndPersistAuthToken = (authToken: string | null) => {
    setAuthToken(authToken);
    if (authToken) {
      localStorage.setItem(authTokenEntry, authToken);
    } else {
      localStorage.removeItem(authTokenEntry);
    }
  };
  const isAuthenticated = createMemo(() => {
    return authToken() != null;
  });

  const signIn = async (request: ILoginRequest): Promise<void> => {
    log.info("Attempting sign in...");
    const response = await axios.post<ILoginResponse>("/api/login", request);
    log.info("Signed in successfully");
    setAndPersistAuthToken(response.data.auth_token);
  };

  const signOut = async () => {
    // We manually pass the token so that we dont
    // have to await for the post to finish in order
    // to clear the token state
    const token = authToken();
    axios.post("/api/logout", null, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setAndPersistAuthToken(null);
  };

  const apiHttpClient = axios.create({
    baseURL: `${window.location.origin}/api`,
  })

  apiHttpClient.interceptors.request.use(config => {
    if (authToken() && !config.headers.Authorization)
      config.headers.Authorization = `Bearer ${authToken()}`;
    return config;
  });

  apiHttpClient.interceptors.response.use(
    resp => resp,
    (error: AxiosError) => {
      if (!error.response)
        return error;

      if (error.response.status == HttpStatusCode.Unauthorized) {
        setAndPersistAuthToken(null);
      }
      return Promise.reject(error);
    }
  );

  // Check authentication status when the
  // AuthProvider loads for the first time
  // If the authentication is bad, it will
  // automatically clear the token.
  apiHttpClient.post('/auth_status').then();

  return <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, apiHttpClient }}>
    {props.children}
  </AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("Missing context Provider");
  return context;
}
