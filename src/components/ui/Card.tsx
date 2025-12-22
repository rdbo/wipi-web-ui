import { JSX, ParentProps } from "solid-js"

export function Card({class: userClass, children, ...rest}: JSX.IntrinsicElements["div"]) {
  const classAttr = "bg-white border-2 border-gray-300 w-96 rounded-lg px-2" + (userClass ? " " + userClass : "");
  return <div class={classAttr} {...rest}>
    {children}
  </div>
}

Card.Title = ({class: userClass, children, ...rest}: JSX.IntrinsicElements["h1"]) => {
  const classAttr = "pt-6 pb-2 text-xl font-black text-slate-900 text-center" + (userClass ? " " + userClass : "");
  return <h1 class={classAttr} {...rest}>{children}</h1>;
}

Card.Body = ({class: userClass, children, ...rest}: JSX.IntrinsicElements["h1"]) => {
  const classAttr = "border-t-2 border-gray-200 px-2 pt-4 pb-8" + (userClass ? " " + userClass : "");
  return <div class={classAttr} {...rest}>{children}</div>;
}
