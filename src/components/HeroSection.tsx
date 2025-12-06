import { MouseyAvatar } from "./MouseyAvatar";
import { ARViewer } from "./ARViewer";
import { Button } from "./ui/button";
import { Play, Sparkles, Volume2, Square, Smartphone } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface HeroSectionProps {
  todayLesson?: {
    title: string;
    subject: string;
  };
  onStartLesson?: () => void;
}

const TALKING_DURATION = 60000; // 1 minute in milliseconds

export function HeroSection({ todayLesson, onStartLesson }: HeroSectionProps) {
  const [isTalking, setIsTalking] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showAR, setShowAR] = useState(false);

  const startTalking = useCallback(() => {
    setIsTalking(true);
    setTimeRemaining(TALKING_DURATION / 1000);
    onStartLesson?.();
  }, [onStartLesson]);

  const stopTalking = useCallback(() => {
    setIsTalking(false);
    setTimeRemaining(0);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!isTalking) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsTalking(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTalking]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
          <div className="relative w-full max-w-sm lg:max-w-md aspect-square">
            <div className={`absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-full blur-2xl ${isTalking ? 'animate-pulse' : ''}`} />
            <MouseyAvatar isTalking={isTalking} className="relative z-10" />
            
            {/* Status indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft">
              {isTalking ? (
                <>
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-foreground">
                    Mousey is teaching... {formatTime(timeRemaining)}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-sm font-medium text-muted-foreground">Click to start learning!</span>
                  <span className="text-lg">🎓</span>
                </>
              )}
            </div>
            
            {/* AR Button */}
            <button
              onClick={() => setShowAR(true)}
              className="absolute top-4 right-4 z-20 p-3 bg-card/90 backdrop-blur-sm rounded-full shadow-soft hover:bg-card transition-colors group"
              aria-label="View in AR"
            >
              <Smartphone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 animate-slide-up">
            {/* Greeting */}
            <div className="space-y-2">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${isTalking ? 'bg-success/20 text-success' : 'bg-success/10 text-success'}`}>
                <Sparkles className="w-4 h-4" />
                {isTalking ? "Learning in progress!" : "Ready to learn today!"}
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground">
                Hi there,{" "}
                <span className="gradient-text">friend!</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                {isTalking 
                  ? "Listen carefully! Mousey is explaining today's lesson... 🐭✨"
                  : "I'm Mousey, your learning buddy! 🐭 Let me help you catch up on today's lessons in a fun way!"
                }
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
                  {isTalking ? (
                    <Button 
                      variant="destructive" 
                      size="lg" 
                      className="flex-1"
                      onClick={stopTalking}
                    >
                      <Square className="w-5 h-5 fill-current" />
                      Stop Lesson
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="hero" 
                        size="lg" 
                        className="flex-1" 
                        onClick={startTalking}
                      >
                        <Play className="w-5 h-5 fill-current" />
                        Start Learning
                      </Button>
                      <Button 
                        variant="playful" 
                        size="lg"
                        onClick={startTalking}
                      >
                        <Volume2 className="w-5 h-5" />
                        Listen First
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* AR Viewer Modal */}
      {showAR && <ARViewer onClose={() => setShowAR(false)} />}
    </section>
  );
}
