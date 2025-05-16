import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={`bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded ${className}`}
      {...props}
    />
  )
);
Button.displayName = "Button";