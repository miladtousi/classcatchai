import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showValue?: boolean;
  variant?: "default" | "success" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProgressBar({
  value,
  max,
  label,
  showValue = true,
  variant = "default",
  size = "md",
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const variantClasses = {
    default: "bg-gradient-to-r from-primary to-primary-glow",
    success: "bg-gradient-to-r from-success to-secondary",
    accent: "bg-gradient-to-r from-accent to-primary",
  };

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-semibold text-foreground">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-bold text-primary">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full bg-muted overflow-hidden",
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
