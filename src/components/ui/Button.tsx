import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition px-4 py-2";

    const variants = {
      default: "bg-orange-500 text-white focus:ring-orange-500",
      outline:
        "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
    };

    const disabledClass =
      "bg-gray-200 text-gray-500 border-dashed border-2 border-gray-400 cursor-not-allowed";

    return (
      <button
        ref={ref}
        className={`${base} ${
          disabled ? disabledClass : variants[variant]
        } ${className}`}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";