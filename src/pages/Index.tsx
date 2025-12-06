import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LessonCard } from "@/components/LessonCard";
import { StatsGrid } from "@/components/StatsGrid";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  // Mock data for demonstration
  const studentData = {
    name: "Emma",
    xp: 1250,
    level: 7,
  };

  const todayLesson = {
    title: "Learning About Animals",
    subject: "Science",
  };

  const lessons = [
    {
      id: 1,
      title: "Numbers and Counting to 100",
      subject: "Math",
      duration: "15 min",
      progress: 12,
      maxProgress: 12,
      isCompleted: true,
      isNew: false,
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
    },
    {
      id: 3,
      title: "Colors and Shapes in Art",
      subject: "Art",
      duration: "12 min",
      progress: 0,
      maxProgress: 8,
      isCompleted: false,
      isNew: true,
    },
    {
      id: 4,
      title: "German Words: Family",
      subject: "German",
      duration: "18 min",
      progress: 3,
      maxProgress: 15,
      isCompleted: false,
      isNew: false,
    },
  ];

  const stats = {
    lessonsCompleted: 12,
    totalLessons: 20,
    streakDays: 5,
    minutesLearned: 145,
    weeklyGoalProgress: 72,
  };

  const handleStartLesson = (lessonTitle?: string) => {
    toast({
      title: "🎉 Let's go!",
      description: lessonTitle
        ? `Starting "${lessonTitle}"`
        : "Loading your lesson...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        studentName={studentData.name}
        xp={studentData.xp}
        level={studentData.level}
      />

      <main className="container mx-auto px-4 pb-12">
        {/* Hero with Fox Avatar */}
        <HeroSection
          todayLesson={todayLesson}
          onStartLesson={() => handleStartLesson(todayLesson.title)}
        />

        {/* Stats Section */}
        <section className="py-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span>📊</span> Your Progress
          </h2>
          <StatsGrid {...stats} />
        </section>

        {/* Lessons Grid */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <span>📚</span> This Week's Lessons
            </h2>
            <span className="text-sm font-medium text-muted-foreground">
              {stats.lessonsCompleted}/{stats.totalLessons} completed
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <LessonCard
                  {...lesson}
                  onPlay={() => handleStartLesson(lesson.title)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Encouragement Section */}
        <section className="py-8">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-8 text-center border border-border/50">
            <div className="text-5xl mb-4">🌟</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              You're doing amazing!
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Keep learning every day and watch your knowledge grow! Mousey believes in you! 🐭
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
