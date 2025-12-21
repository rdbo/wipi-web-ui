import { Navigate, Route, RouteProps, useLocation, useNavigate } from "@solidjs/router";
import { useAuth } from "./providers/auth";
import { createEffect, createSignal } from "solid-js";

export type RouteProtection = "Authenticated" | "Unauthenticated" | "Any";

export interface IProtectedRoute<S extends string> extends RouteProps<S> {
  protection?: RouteProtection;
}

export default function ProtectedRoute<S extends string>({ protection = "Authenticated", children, component, ...rest}: IProtectedRoute<S>) {
  const { authToken } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>(authToken() != null);
  createEffect(() => {
    setIsAuthenticated(authToken() != null);
  });

  const CheckAuth = (props: any) => {
    const location = useLocation();
    const navigate = useNavigate();

    createEffect(() => {
      if (!isAuthenticated() && protection == "Authenticated" && location.pathname != "/login") {
        navigate("/login");
      }

      if (isAuthenticated() && protection == "Unauthenticated" && location.pathname != "/") {
        navigate("/");
      }
    });

    return (component ? component(props) : <></>);
  }

  return <Route component={CheckAuth} {...rest}>
    {children}
  </Route>
}
