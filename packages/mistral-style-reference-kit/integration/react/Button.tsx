import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}) {
  return (
    <button
      className={`msr-button msr-button--${variant} ${className}`}
      {...props}
    />
  );
}
