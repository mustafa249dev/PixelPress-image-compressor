import React from "react";
import type { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isFullWidth = false,
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "font-semibold rounded-lg transition-colors duration-200";

  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-60",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-700",
    success: "bg-green-500 hover:bg-green-600 text-white",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const classes = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${isFullWidth ? "w-full" : ""}
    ${isLoading || disabled ? "cursor-not-allowed opacity-60" : ""}
    ${className}
  `.trim();

  return (
    <button className={classes} disabled={isLoading || disabled} {...props}>
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
