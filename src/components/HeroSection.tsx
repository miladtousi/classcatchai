import { MouseyAvatar } from "./MouseyAvatar";
import { Button } from "./ui/button";
import { Play, Sparkles, Volume2 } from "lucide-react";
import { useState } from "react";

interface HeroSectionProps {
  todayLesson?: {
    title: string;
    subject: string;
  };
  onStartLesson?: () => void;
}

export function HeroSection({ todayLesson, onStartLesson }: HeroSectionProps) {
  const [isWaving, setIsWaving] = useState(false);

  const handleWave = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2000);
  };

  return (
    <section className="relative w-full py-8 lg:py-12 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Mousey Avatar */}
          <div 
            className="relative w-full max-w-sm lg:max-w-md aspect-square cursor-pointer"
            onClick={handleWave}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-full blur-2xl animate-pulse" />
            <MouseyAvatar isWaving={isWaving} className="relative z-10" />
            
            {/* Click hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft">
              <span className="text-sm font-medium text-muted-foreground">Click to say hi!</span>
              <span className="text-lg">👋</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 animate-slide-up">
            {/* Greeting */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                Ready to learn today!
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground">
                Hi there,{" "}
                <span className="gradient-text">friend!</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                I'm Mousey, your learning buddy! 🐭 Let me help you catch up on today's lessons in a fun way!
              </p>
            </div>

            {/* Today's Lesson Preview */}
            {todayLesson && (
              <div className="bg-card rounded-3xl p-6 shadow-card border border-border/50 max-w-lg mx-auto lg:mx-0 animation-delay-200 animate-slide-up">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-bold text-muted-foreground">TODAY'S LESSON</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{todayLesson.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{todayLesson.subject}</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero" size="lg" className="flex-1" onClick={onStartLesson}>
                    <Play className="w-5 h-5 fill-current" />
                    Start Learning
                  </Button>
                  <Button variant="playful" size="lg">
                    <Volume2 className="w-5 h-5" />
                    Listen First
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
