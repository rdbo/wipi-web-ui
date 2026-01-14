import axios, { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import log from "loglevel";
import { Accessor, createComputed, createContext, createEffect, createMemo, createSignal, onCleanup, onMount, ParentProps, PropsWithChildren, Setter, useContext } from "solid-js";

export type Theme = "light" | "dark";

export interface IThemeContext {
  theme: Accessor<Theme>;
  setTheme: Setter<Theme>;
  sigmaMode: Accessor<boolean>;
  setSigmaMode: Setter<boolean>;
};

const ThemeContext = createContext<IThemeContext>();

export function ThemeProvider(props: ParentProps) {
  const [theme, setTheme] = createSignal<Theme>((localStorage.getItem("theme") as Theme | null) ?? "light");
  const [sigmaMode, setSigmaMode] = createSignal(false);

  createEffect(() => {
    log.info("Theme changed to: " + theme());
    localStorage.setItem("theme", theme());
    if (theme() === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  createEffect(() => {
    if (sigmaMode()) {
      document.documentElement.classList.add("sigma");
    } else {
      document.documentElement.classList.remove("sigma");
    }
  });
  return <ThemeContext.Provider value={{ theme, setTheme, sigmaMode, setSigmaMode }}>
    {props.children}
  </ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("Missing context Provider");
  return context;
}
