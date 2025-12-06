import { cn } from "@/lib/utils";
import { BookOpen, Clock, Play, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { ProgressBar } from "./ProgressBar";

interface LessonCardProps {
  title: string;
  subject: string;
  duration: string;
  progress: number;
  maxProgress: number;
  isCompleted?: boolean;
  isNew?: boolean;
  onPlay?: () => void;
  className?: string;
}

export function LessonCard({
  title,
  subject,
  duration,
  progress,
  maxProgress,
  isCompleted = false,
  isNew = false,
  onPlay,
  className,
}: LessonCardProps) {
  const subjectColors: Record<string, string> = {
    Math: "bg-primary/10 text-primary",
    German: "bg-secondary/10 text-secondary",
    Science: "bg-success/10 text-success",
    Art: "bg-reward/10 text-reward",
    Music: "bg-accent/10 text-accent-foreground",
    default: "bg-muted text-muted-foreground",
  };

  const subjectColor = subjectColors[subject] || subjectColors.default;

  return (
    <div
      className={cn(
        "relative group bg-card rounded-3xl p-5 shadow-card border border-border/50 transition-all duration-300 hover:shadow-float hover:-translate-y-1",
        isCompleted && "opacity-75",
        className
      )}
    >
      {/* New Badge */}
      {isNew && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="flex items-center gap-1 bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-soft animate-pulse">
            <Sparkles className="w-3 h-3" />
            New!
          </div>
        </div>
      )}

      {/* Completed Overlay */}
      {isCompleted && (
        <div className="absolute top-4 right-4 z-10">
          <CheckCircle className="w-8 h-8 text-success fill-success/20" />
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Subject Tag */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-bold",
              subjectColor
            )}
          >
            {subject}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{duration}</span>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground leading-tight line-clamp-2">
              {title}
            </h3>
          </div>
        </div>

        {/* Progress */}
        <ProgressBar
          value={progress}
          max={maxProgress}
          size="sm"
          variant={isCompleted ? "success" : "default"}
          showValue={false}
        />

        {/* Action Button */}
        <Button
          variant={isCompleted ? "secondary" : "hero"}
          size="lg"
          className="w-full"
          onClick={onPlay}
        >
          <Play className="w-5 h-5 fill-current" />
          {isCompleted ? "Review Lesson" : "Start Learning"}
        </Button>
      </div>
    </div>
  );
}
