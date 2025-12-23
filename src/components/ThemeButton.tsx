import { createMemo } from "solid-js";
import { useTheme } from "../providers/theme";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const sunImage = '/assets/images/sun.svg';
  const moonImage = '/assets/images/moon.svg';
  const img = createMemo(() => theme() == "dark" ? moonImage : sunImage);

  const switchTheme = () => {
    if (theme() == "light")
      setTheme("dark");
    else {
      setTheme("light");
    }
  }

  return <button onClick={switchTheme} class="cursor-pointer select-none px-2 rounded-full py-2 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
    <img class="h-8" src={img()} />
  </button>
}
