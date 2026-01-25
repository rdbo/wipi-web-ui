import log from "loglevel";
import { Accessor, createComputed, createContext, createEffect, createMemo, createSignal, onCleanup, onMount, ParentProps, PropsWithChildren, Setter, useContext } from "solid-js";

export type Theme = "light" | "dark" | "sigma";

export interface IThemeContext {
  theme: Accessor<Theme>;
  setTheme: Setter<Theme>;
};

const ThemeContext = createContext<IThemeContext>();

export function ThemeProvider(props: ParentProps) {
  const [theme, setTheme] = createSignal<Theme>((localStorage.getItem("theme") as Theme | null) ?? "light");

  createEffect(() => {
    log.info("Theme changed to: " + theme());
    localStorage.setItem("theme", theme());
    switch (theme()) {
      case "dark":
        document.documentElement.classList.remove("light");
        document.documentElement.classList.remove("sigma");
        document.documentElement.classList.add("dark");
        break;
      case "sigma":
        document.documentElement.classList.remove("light");
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("sigma");
        break;
      default:
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.remove("sigma");
        break
    }
  });

  return <ThemeContext.Provider value={{ theme, setTheme }}>
    {props.children}
  </ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("Missing context Provider");
  return context;
}
