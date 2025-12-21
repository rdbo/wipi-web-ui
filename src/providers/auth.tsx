import axios from "axios";
import log from "loglevel";
import { Accessor, createContext, createSignal, ParentProps, PropsWithChildren, useContext } from "solid-js";

export interface ILoginRequest {
  password: string;
}

export interface IAuthContext {
  signIn: (request: ILoginRequest) => Promise<void>;
  signOut: () => void;
  authToken: Accessor<string | null>
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
  }

  const signIn = async (request: ILoginRequest): Promise<void> => {
    log.info("Attempting sign in...");
    const response = await axios.post<ILoginResponse>("/api/login", request);
    log.info("Signed in successfully");
    setAndPersistAuthToken(response.data.auth_token);
  };

  const signOut = async () => {
    axios.post("/api/logout", {}, { headers: { 'Authorization': `Bearer ${authToken()}` } });
    setAndPersistAuthToken(null);
  };

  return <AuthContext.Provider value={{signIn, signOut, authToken}}>
    {props.children}
  </AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("Missing context Provider");
  return context;
}
