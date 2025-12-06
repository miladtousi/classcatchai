import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Users, BookOpen, Mail, Lock, ArrowLeft } from 'lucide-react';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type Role = 'teacher' | 'parent' | 'student';

const roles: { id: Role; title: string; icon: React.ReactNode; color: string }[] = [
  { id: 'student', title: 'Student', icon: <GraduationCap className="w-6 h-6" />, color: 'from-blue-400 to-blue-600' },
  { id: 'parent', title: 'Parent', icon: <Users className="w-6 h-6" />, color: 'from-green-400 to-green-600' },
  { id: 'teacher', title: 'Teacher', icon: <BookOpen className="w-6 h-6" />, color: 'from-purple-400 to-purple-600' },
];

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    try {
      authSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === 'email') fieldErrors.email = err.message;
          if (err.path[0] === 'password') fieldErrors.password = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (isSignUp && !selectedRole) {
      toast({
        title: 'Please select a role',
        description: 'Choose whether you are a student, parent, or teacher.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, selectedRole!);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'Account exists',
              description: 'This email is already registered. Please sign in instead.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Sign up failed',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Welcome to ClassCatch! 🎉',
            description: 'Your account has been created successfully.',
          });
          navigate(`/${selectedRole}`);
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Sign in failed',
            description: 'Invalid email or password. Please try again.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Welcome back! 👋',
            description: 'You have signed in successfully.',
          });
          // Navigation will happen automatically via AuthProvider
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '2.5s' }} />
      <div className="absolute top-1/3 right-10 w-12 h-12 bg-blue-300 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '2s' }} />

      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-purple-100">
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to home</span>
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-2">🐭</div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isSignUp ? 'Join ClassCatch!' : 'Welcome Back!'}
            </h1>
            <p className="text-gray-500 mt-2">
              {isSignUp ? 'Create your account to start learning' : 'Sign in to continue your journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role selection for signup */}
            {isSignUp && (
              <div className="space-y-3">
                <Label className="text-gray-700">I am a...</Label>
                <div className="grid grid-cols-3 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedRole === role.id
                          ? `border-purple-500 bg-gradient-to-br ${role.color} text-white shadow-lg scale-105`
                          : 'border-gray-200 hover:border-purple-300 bg-white'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {role.icon}
                        <span className="text-sm font-medium">{role.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 h-12 rounded-xl ${errors.email ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 h-12 rounded-xl ${errors.password ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg shadow-lg"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </Button>
          </form>

          {/* Toggle sign in/up */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrors({});
              }}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
