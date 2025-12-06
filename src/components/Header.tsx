import { XPBadge } from "./XPBadge";
import { Bell, Settings, User } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  studentName: string;
  xp: number;
  level: number;
}

export function Header({ studentName, xp, level }: HeaderProps) {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-card/50 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-soft">
          <span className="text-xl">🐭</span>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-black gradient-text">ClassCatch</h1>
          <p className="text-xs text-muted-foreground font-medium">Learn with fun!</p>
        </div>
      </div>

      {/* Center - Welcome */}
      <div className="hidden md:flex flex-col items-center">
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h2 className="text-lg font-bold text-foreground">{studentName}! 👋</h2>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <XPBadge xp={xp} level={level} className="hidden sm:flex" />
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>

        <Button variant="outline" size="icon" className="rounded-full border-2">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
