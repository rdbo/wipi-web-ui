import { createMemo, createSignal, onCleanup, Show } from "solid-js";
import { useTheme } from "../providers/theme";
import Sigma from "lucide-solid/icons/sigma";

export default function ThemeButton() {
  const { theme, setTheme, sigmaMode, setSigmaMode } = useTheme();
  const sunImage = '/assets/images/sun.svg';
  const moonImage = '/assets/images/moon.svg';
  const img = createMemo(() => theme() == "dark" ? moonImage : sunImage);

  const [clickCount, setClickCount] = createSignal(0);
  let clickTimeout: ReturnType<typeof setTimeout> | undefined;

  onCleanup(() => {
    clearTimeout(clickTimeout);
  });

  const switchTheme = () => {
    if (sigmaMode()) {
      setSigmaMode(false);
      clearTimeout(clickTimeout);
      return;
    }

    const nextCount = clickCount() + 1;
    setClickCount(nextCount);
    
    clearTimeout(clickTimeout);
    
    if (nextCount >= 5) {
        setSigmaMode(!sigmaMode());
        setClickCount(0);
        return;
    }

    clickTimeout = setTimeout(() => {
        setClickCount(0);
    }, 500);

    if (theme() == "light")
      setTheme("dark");
    else {
      setTheme("light");
    }
  }

  return <button onClick={switchTheme} class="cursor-pointer select-none px-2 rounded-full py-2 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
    <Show when={sigmaMode()} fallback={<img class="h-8" src={img()} />}>
       <Sigma class="h-8 w-8 text-[#00ffd0]" />
    </Show>
  </button>
}
