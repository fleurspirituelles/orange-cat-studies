import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`
          w-full
          px-4
          py-2
          text-sm
          border
          rounded-md
          outline-none
          transition
          placeholder-gray-400
          focus:ring-2
          focus:ring-orange-500
          focus:border-orange-500
          ${className}
        `}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";