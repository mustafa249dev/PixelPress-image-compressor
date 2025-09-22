export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "outline";
  size?: "sm" | "md" | "lg";
  isFullWidth?: boolean;
  isLoading?: boolean;
}