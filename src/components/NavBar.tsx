import { A } from "@solidjs/router";
import { useTheme } from "../providers/theme";
import Button from "./ui/Button";
import ThemeButton from "./ThemeButton";

export default function NavBar() {
  return <nav class="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <A href="/" class="flex items-center gap-3 h-full px-1">
        <img src="/assets/wipi.svg" class="h-8 w-8" />
        <h1 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">WiPi Web UI</h1>
      </A>
      <div class="flex items-center justify-center gap-2">
        <div class="items-center w-12 h-12 rounded-full border-2 border-rose-600 flex items-center justify-center">
          <A href="/">
            <img src="/assets/images/chart-line.svg" class="w-8"/>
          </A>
        </div>
        <div class="items-center w-12 h-12 rounded-full border-2 border-rose-600 flex items-center justify-center">
          <A href="/settings">
            <img src="/assets/images/settings.svg" class="w-8"/>
          </A>
        </div>
      </div>
      <div>
        <ThemeButton/>
      </div>
    </div>
  </nav>;
}
