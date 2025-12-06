import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LessonCard } from "@/components/LessonCard";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Calendar, TrendingUp, Clock, Star } from "lucide-react";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const childInfo = {
    name: "Emma",
    class: "Class 3A",
    school: "Grundschule am Park",
  };

  const weeklyProgress = {
    lessonsWatched: 8,
    totalLessons: 12,
    timeSpent: 95, // minutes
    streak: 5,
  };

  const recentLessons = [
    {
      id: 1,
      title: "Numbers and Counting to 100",
      subject: "Math",
      duration: "15 min",
      progress: 12,
      maxProgress: 12,
      isCompleted: true,
      isNew: false,
      date: "Today",
    },
    {
      id: 2,
      title: "Learning About Animals",
      subject: "Science",
      duration: "20 min",
      progress: 5,
      maxProgress: 10,
      isCompleted: false,
      isNew: true,
      date: "Today",
    },
    {
      id: 3,
      title: "German Words: Family",
      subject: "German",
      duration: "18 min",
      progress: 15,
      maxProgress: 15,
      isCompleted: true,
      isNew: false,
      date: "Yesterday",
    },
    {
      id: 4,
      title: "Colors and Shapes in Art",
      subject: "Art",
      duration: "12 min",
      progress: 0,
      maxProgress: 8,
      isCompleted: false,
      isNew: true,
      date: "Yesterday",
    },
  ];

  const handlePlayLesson = (title: string) => {
    toast({
      title: "Starting lesson 🎬",
      description: `Opening "${title}" - Watch together with your child!`,
    });
    navigate("/student");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-6 flex items-center gap-4 bg-card/50 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-soft">
            <span className="text-xl">👨‍👩‍👧</span>
          </div>
          <div>
            <h1 className="text-xl font-black gradient-text">Parent Portal</h1>
            <p className="text-xs text-muted-foreground font-medium">Track your child's progress</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Child Info Card */}
          <div className="bg-card rounded-3xl p-6 shadow-card border border-border/50 animate-slide-up">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-3xl">👧</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{childInfo.name}</h2>
                <p className="text-muted-foreground">{childInfo.class} • {childInfo.school}</p>
              </div>
            </div>
          </div>

          {/* Weekly Stats */}
          <section className="animate-slide-up animation-delay-100">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              This Week's Progress
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-card rounded-2xl p-4 text-center shadow-soft border border-border/50">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{weeklyProgress.lessonsWatched}/{weeklyProgress.totalLessons}</p>
                <p className="text-xs text-muted-foreground">Lessons Watched</p>
              </div>
              
              <div className="bg-card rounded-2xl p-4 text-center shadow-soft border border-border/50">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{weeklyProgress.timeSpent}</p>
                <p className="text-xs text-muted-foreground">Minutes Learned</p>
              </div>
              
              <div className="bg-card rounded-2xl p-4 text-center shadow-soft border border-border/50">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-accent/10 flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{weeklyProgress.streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              
              <div className="bg-card rounded-2xl p-4 text-center shadow-soft border border-border/50">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-success/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-success" />
                </div>
                <p className="text-2xl font-bold text-foreground">{Math.round((weeklyProgress.lessonsWatched / weeklyProgress.totalLessons) * 100)}%</p>
                <p className="text-xs text-muted-foreground">Week Complete</p>
              </div>
            </div>
          </section>

          {/* Recent Lessons */}
          <section className="animate-slide-up animation-delay-200">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span>📚</span> Recent Lessons
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {recentLessons.map((lesson) => (
                <div key={lesson.id} className="relative">
                  <span className="absolute -top-2 -right-2 z-10 text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                    {lesson.date}
                  </span>
                  <LessonCard
                    {...lesson}
                    onPlay={() => handlePlayLesson(lesson.title)}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Tips Card */}
          <div className="bg-gradient-to-r from-secondary/10 via-primary/10 to-accent/10 rounded-3xl p-6 text-center border border-border/50 animate-slide-up animation-delay-300">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="font-bold text-foreground mb-2">Tip for Parents</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Watch lessons together with your child! You can use the AR feature to make 
              Mousey appear in your living room - kids love it! Tap "View in AR" to try it.
            </p>
            <Button 
              variant="playful" 
              className="mt-4"
              onClick={() => navigate("/student")}
            >
              Watch Lessons Together
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;
