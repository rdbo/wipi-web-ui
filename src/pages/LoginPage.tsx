import { useNavigate } from "@solidjs/router";
import { useAuth } from "../providers/auth";
import { createEffect } from "solid-js";

export default function LoginPage() {
  let passwordElement! : HTMLInputElement;
  const { signIn } = useAuth();

  const doSignIn = () => {
    const password = passwordElement.value;
    signIn({ password });
  }

  return <>
    <h1>Login Page</h1>
    <div>
      <label>Password:</label>
      <input ref={passwordElement} type="password"/>
      <button onClick={doSignIn}>Submit</button>
    </div>
  </>
}
