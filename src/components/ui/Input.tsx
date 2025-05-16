import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-2 text-sm border rounded-md outline-none transition placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";