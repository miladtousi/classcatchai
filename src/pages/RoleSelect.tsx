import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, BookOpen } from "lucide-react";

const RoleSelect = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: "student",
      title: "I'm a Student",
      subtitle: "Watch fun lessons with Mousey!",
      icon: GraduationCap,
      emoji: "🎒",
      gradient: "from-primary to-accent",
      path: "/student",
    },
    {
      id: "parent",
      title: "I'm a Parent",
      subtitle: "Review lessons with your child",
      icon: Users,
      emoji: "👨‍👩‍👧",
      gradient: "from-secondary to-primary",
      path: "/parent",
    },
    {
      id: "teacher",
      title: "I'm a Teacher",
      subtitle: "Upload today's lesson content",
      icon: BookOpen,
      emoji: "📚",
      gradient: "from-accent to-reward",
      path: "/teacher",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* Logo & Title */}
        <div className="space-y-4 animate-slide-up">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent shadow-float">
            <span className="text-5xl">🐭</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground">
            Welcome to{" "}
            <span className="gradient-text">ClassCatch AI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Your friendly learning companion that helps you catch up on lessons! 🌟
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {roles.map((role, index) => (
            <button
              key={role.id}
              onClick={() => navigate(role.path)}
              className={`group relative p-6 bg-card rounded-3xl shadow-card border border-border/50 hover:shadow-float hover:-translate-y-2 transition-all duration-300 animate-slide-up`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform`}>
                <span className="text-3xl">{role.emoji}</span>
              </div>
              
              {/* Text */}
              <h3 className="text-lg font-bold text-foreground mb-1">{role.title}</h3>
              <p className="text-sm text-muted-foreground">{role.subtitle}</p>

              {/* Hover glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
            </button>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-sm text-muted-foreground animate-slide-up animation-delay-400">
          Made with 💖 for young learners
        </p>
      </div>
    </div>
  );
};

export default RoleSelect;
