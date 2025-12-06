import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Camera, 
  Mic, 
  Sparkles,
  Check,
  Loader2
} from "lucide-react";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonNotes, setLessonNotes] = useState("");
  const [subject, setSubject] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const subjects = [
    { id: "math", label: "Math", emoji: "🔢" },
    { id: "science", label: "Science", emoji: "🔬" },
    { id: "german", label: "German", emoji: "🇩🇪" },
    { id: "art", label: "Art", emoji: "🎨" },
    { id: "music", label: "Music", emoji: "🎵" },
    { id: "sports", label: "Sports", emoji: "⚽" },
  ];

  const handleFileUpload = (type: string) => {
    // Simulate file upload
    setUploadedFiles(prev => [...prev, `${type}-${Date.now()}`]);
    toast({
      title: "File uploaded! 📎",
      description: `Your ${type} has been added to the lesson.`,
    });
  };

  const handleSubmit = async () => {
    if (!lessonTitle || !lessonNotes || !subject) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    toast({
      title: "Lesson created! 🎉",
      description: "Mousey is ready to teach this lesson to your students!",
    });

    // Reset form
    setLessonTitle("");
    setLessonNotes("");
    setSubject("");
    setUploadedFiles([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-6 flex items-center gap-4 bg-card/50 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent to-reward flex items-center justify-center shadow-soft">
            <span className="text-xl">📚</span>
          </div>
          <div>
            <h1 className="text-xl font-black gradient-text">Teacher Portal</h1>
            <p className="text-xs text-muted-foreground font-medium">Create lessons for your students</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-8 animate-slide-up">
          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Create Today's Lesson</h2>
            <p className="text-muted-foreground">
              Upload your notes and materials. Mousey will transform them into a fun, child-friendly lesson! 🐭
            </p>
          </div>

          {/* Form */}
          <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-card border border-border/50 space-y-6">
            {/* Subject Selection */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Subject *</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {subjects.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSubject(s.id)}
                    className={`p-3 rounded-2xl border-2 transition-all ${
                      subject === s.id
                        ? "border-primary bg-primary/10 shadow-soft"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="text-2xl block mb-1">{s.emoji}</span>
                    <span className="text-xs font-medium text-foreground">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lesson Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Lesson Title *</label>
              <Input
                placeholder="e.g., Learning About Animals"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* Lesson Notes */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Lesson Notes *</label>
              <Textarea
                placeholder="Write your lesson notes here... Include key concepts, vocabulary, and anything you want the students to learn today."
                value={lessonNotes}
                onChange={(e) => setLessonNotes(e.target.value)}
                className="min-h-[150px] rounded-xl"
              />
            </div>

            {/* Upload Options */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Additional Materials</label>
              <div className="grid sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleFileUpload("photo")}
                  className="flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground text-sm">Photos</p>
                    <p className="text-xs text-muted-foreground">Whiteboard, worksheets</p>
                  </div>
                </button>

                <button
                  onClick={() => handleFileUpload("document")}
                  className="flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-border hover:border-secondary/50 hover:bg-secondary/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <FileText className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground text-sm">Documents</p>
                    <p className="text-xs text-muted-foreground">PDFs, worksheets</p>
                  </div>
                </button>

                <button
                  onClick={() => handleFileUpload("recording")}
                  className="flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-border hover:border-accent/50 hover:bg-accent/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mic className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground text-sm">Recordings</p>
                    <p className="text-xs text-muted-foreground">Voice explanations</p>
                  </div>
                </button>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {uploadedFiles.map((file, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-success/10 text-success rounded-full text-sm"
                    >
                      <Check className="w-3 h-3" />
                      {file.split("-")[0]}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full rounded-2xl h-14 text-lg font-bold"
              variant="hero"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Mousey is learning...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Create Lesson with AI
                </>
              )}
            </Button>
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-6 text-center border border-border/50">
            <div className="text-4xl mb-3">🤖✨</div>
            <h3 className="font-bold text-foreground mb-2">How it works</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Our AI (powered by Google Gemini) will analyze your notes and create a fun, 
              age-appropriate summary. Mousey will then present it to your students with 
              friendly animations and simple language!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
