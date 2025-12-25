import { A } from "@solidjs/router";
import { useTheme } from "../providers/theme";
import Button from "./ui/Button";
import ThemeButton from "./ThemeButton";
import { For, Show } from "solid-js";
import { useAuth } from "../providers/auth";

export default function NavBar() {
  const { isAuthenticated } = useAuth();
  const routes = [
    {
      "path": "/",
      "icon": "/assets/images/chart-line.svg"
    },
    {
      "path": "/settings",
      "icon": "/assets/images/settings.svg"
    }
  ];
  return <nav class="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
    <div class="w-full px-8 h-16 grid grid-cols-3 items-center">
      <A href="/" class="flex items-center gap-3 h-full px-1 justify-self-start">
        <img src="/assets/wipi.svg" class="h-8 w-8" />
        <h1 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">WiPi Web UI</h1>
      </A>
      <div class="justify-self-center">
        <Show when={isAuthenticated()}>
          <div class="flex items-center justify-center gap-2">
            <For each={routes}>
              {(route) =>
                <A href={route.path} class="w-12 h-12 rounded-full border-2 border-rose-600 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-gray-700 transition-colors">
                  <img src={route.icon} class="w-8" />
                </A>
              }
            </For>
          </div>
        </Show>
      </div>
      <div class="justify-self-end">
        <ThemeButton />
      </div>
    </div>
  </nav>;
}
