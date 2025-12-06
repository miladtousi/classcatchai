import { cn } from "@/lib/utils";
import { Star, Zap, Trophy } from "lucide-react";

interface XPBadgeProps {
  xp: number;
  level: number;
  className?: string;
}

export function XPBadge({ xp, level, className }: XPBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 bg-card rounded-2xl px-4 py-2.5 shadow-card border border-border/50",
        className
      )}
    >
      {/* Level Badge */}
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-glow">
          <Trophy className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
          <span className="text-xs font-black text-accent-foreground">{level}</span>
        </div>
      </div>

      {/* XP Counter */}
      <div className="flex flex-col">
        <span className="text-xs font-medium text-muted-foreground">Level {level}</span>
        <div className="flex items-center gap-1">
          <Zap className="w-4 h-4 text-accent fill-accent" />
          <span className="text-lg font-black text-foreground">{xp}</span>
          <span className="text-sm font-medium text-muted-foreground">XP</span>
        </div>
      </div>

      {/* Stars earned today */}
      <div className="flex items-center gap-0.5 ml-2">
        {[1, 2, 3].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-5 h-5 transition-all duration-300",
              star <= 2
                ? "text-accent fill-accent animate-pop"
                : "text-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}
