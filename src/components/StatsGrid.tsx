import { cn } from "@/lib/utils";
import { BookOpen, Clock, Flame, Target } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sublabel?: string;
  color: "primary" | "secondary" | "success" | "accent";
}

function StatCard({ icon, label, value, sublabel, color }: StatCardProps) {
  const colorClasses = {
    primary: "from-primary/20 to-primary/5 text-primary",
    secondary: "from-secondary/20 to-secondary/5 text-secondary",
    success: "from-success/20 to-success/5 text-success",
    accent: "from-accent/20 to-accent/5 text-accent-foreground",
  };

  return (
    <div className="bg-card rounded-2xl p-5 shadow-card border border-border/50 transition-all duration-300 hover:shadow-float hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
            colorClasses[color]
          )}
        >
          {icon}
        </div>
        <span className="text-3xl font-black text-foreground">{value}</span>
      </div>
      <div className="mt-3">
        <p className="text-sm font-bold text-foreground">{label}</p>
        {sublabel && (
          <p className="text-xs text-muted-foreground">{sublabel}</p>
        )}
      </div>
    </div>
  );
}

interface StatsGridProps {
  lessonsCompleted: number;
  totalLessons: number;
  streakDays: number;
  minutesLearned: number;
  weeklyGoalProgress: number;
}

export function StatsGrid({
  lessonsCompleted,
  totalLessons,
  streakDays,
  minutesLearned,
  weeklyGoalProgress,
}: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<BookOpen className="w-6 h-6" />}
        label="Lessons Done"
        value={lessonsCompleted}
        sublabel={`of ${totalLessons} this week`}
        color="primary"
      />
      <StatCard
        icon={<Flame className="w-6 h-6" />}
        label="Day Streak"
        value={streakDays}
        sublabel="Keep it going!"
        color="accent"
      />
      <StatCard
        icon={<Clock className="w-6 h-6" />}
        label="Minutes"
        value={minutesLearned}
        sublabel="Total learning time"
        color="secondary"
      />
      <StatCard
        icon={<Target className="w-6 h-6" />}
        label="Weekly Goal"
        value={`${weeklyGoalProgress}%`}
        sublabel="Almost there!"
        color="success"
      />
    </div>
  );
}
