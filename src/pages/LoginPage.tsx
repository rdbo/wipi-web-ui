import { useNavigate } from "@solidjs/router";
import { useAuth } from "../providers/auth";
import { createEffect } from "solid-js";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function LoginPage() {
  let passwordElement!: HTMLInputElement;
  const { signIn } = useAuth();

  const doSignIn = (e: Event) => {
    e.preventDefault();
    const password = passwordElement.value;
    signIn({ password });
  }

  return <div class="flex justify-center mt-16">
    <Card class="w-96 !border-0 sm:!border-2 max-sm:w-full">
      <Card.Title>Login</Card.Title>
      <Card.Body>
        <form class="flex flex-col gap-4" onSubmit={doSignIn}>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">Password</label>
            <input ref={passwordElement} class="flex h-10 w-full rounded-md border border-slate-600 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:border-rose-500 transition-colors disabled:cursor-not-allowed disabled:opacity-50" type="password" required />
          </div>
          <Button class="w-full">Sign In</Button>
        </form>
      </Card.Body>
    </Card>
  </div>
}

