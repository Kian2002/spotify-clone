import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, disabled, type = "button", ...props }, ref) => (
    <button
      type={type}
      disabled={disabled}
      ref={ref}
      {...props}
      className={
        ` w-full 
        rounded-full 
        bg-green-500
        border
        border-transparent
        px-3 
        py-3 
        disabled:cursor-not-allowed 
        disabled:opacity-50
        text-black
        font-bold
        hover:opacity-75
        transition 
        ${disabled && "opacity-75 cursor-not-allowed"} ` + className
      }
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";

export default Button;
