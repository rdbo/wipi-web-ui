import { JSX } from "solid-js";

export default function Button({class: userClassAttr, children, ...rest}: JSX.IntrinsicElements["button"]) {
  const classAttr = `
  inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50 bg-rose-600 text-white hover:bg-rose-700 h-10 px-4 py-2 shadow-sm
  dark:focus:ring-offset-gray-900
  sigma:bg-sigma-bright sigma:text-sigma-faint sigma:font-bold sigma:hover:text-sigma-bright sigma:hover:bg-sigma-faint sigma:focus:ring-0 sigma:focus:ring-offset-2 sigma:focus:ring-offset-sigma-dim sigma:inset-ring-2 sigma:inset-ring-sigma-bright
  ` + (userClassAttr ? " " + userClassAttr : "");
  return <button {...rest} class={classAttr}>
    {children}
  </button>
}

Button.Primary = Button;
Button.Secondary = ({class: userClassAttr, children, ...rest}: JSX.IntrinsicElements["button"]) => {
  const classAttr = "bg-slate-600 hover:bg-slate-700 focus:ring-slate-500" + (userClassAttr ? " " + userClassAttr : "");
  return <Button {...rest} class={classAttr}>
    {children}
  </Button>
};
