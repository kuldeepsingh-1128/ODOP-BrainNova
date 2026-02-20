import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const Register = () => {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  const [role, setRole] = useState<"buyer" | "seller">((roleParam === "seller" ? "seller" : "buyer"));
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get form data
      const formData = new FormData(e.target as HTMLFormElement);
      const email = (formData.get('email') as string).trim().toLowerCase();
      const password = formData.get('password') as string;
      const name = formData.get('name') as string;
      const phone = formData.get('phone') as string;
      const district = role === 'seller' ? formData.get('district') as string : null;

      // Validate inputs
      if (!email || !password || !name || !phone) {
        throw new Error('All fields are required.');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address.');
      }

      console.log('Starting registration for:', email);

      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            name,
            phone,
            role,
            district,
          }
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        
        // Handle specific error cases
        if (authError.status === 429) {
          throw new Error('Too many signup attempts. Please wait 15 minutes and try with a different email address.');
        }
        if (authError.message?.includes('rate limit')) {
          throw new Error('Rate limit exceeded. Please wait 15 minutes and try again with a different email.');
        }
        if (authError.message?.includes('invalid') || authError.message?.includes('Invalid')) {
          throw new Error('Email address is invalid. Please use a valid email format.');
        }
        if (authError.message?.includes('already registered') || authError.message?.includes('User already exists')) {
          throw new Error('This email is already registered. Try a different email or login to your existing account.');
        }
        
        throw authError;
      }

      console.log('User created in Auth:', authData.user?.id);

      // Try to insert user data into users table
      if (authData.user) {
        try {
          const { data: insertData, error: dbError } = await supabase
            .from('users')
            .insert({
              id: authData.user.id,
              email,
              name,
              phone,
              role,
              district,
              created_at: new Date().toISOString(),
            })
            .select();

          if (dbError) {
            console.warn('Database insert warning:', dbError);
          } else {
            console.log('User data inserted into database:', insertData);
          }
        } catch (dbErr) {
          console.warn('Database insertion skipped:', dbErr);
          // Continue anyway - user was created in auth
        }
      }

      toast({ 
        title: "Registration Successful!", 
        description: `Welcome to ODOP Marketplace, ${name}! You can now log in.` 
      });

      // Redirect based on role
      setTimeout(() => {
        if (role === "buyer") {
          navigate("/login?email=" + encodeURIComponent(email));
        } else {
          navigate("/login?email=" + encodeURIComponent(email) + "&role=seller");
        }
      }, 1500);
    } catch (error: any) {
      console.error('Registration error:', error);
      
      const errorMessage = error.message || "Something went wrong. Please try again.";
      
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="gradient-radial-glow absolute inset-0 pointer-events-none" />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center font-bold text-primary-foreground text-sm">O</div>
            <span className="font-bold text-lg text-foreground">ODOP <span className="text-primary">Market</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join the ODOP marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-lg p-6 space-y-4">
          {/* Role toggle */}
          <div className="flex rounded-lg bg-background p-1">
            {(["buyer", "seller"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-sm rounded-md font-medium transition-all ${
                  role === r ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {r === "buyer" ? "Buyer" : "Seller"}
              </button>
            ))}
          </div>

          <div>
            <Label className="text-foreground">Full Name</Label>
            <Input name="name" placeholder="Your full name" required className="mt-1 bg-background border-border" />
          </div>
          <div>
            <Label className="text-foreground">Email</Label>
            <Input name="email" type="email" placeholder="you@example.com" required className="mt-1 bg-background border-border" />
          </div>
          <div>
            <Label className="text-foreground">Phone</Label>
            <Input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" required className="mt-1 bg-background border-border" />
          </div>

          {role === "seller" && (
            <div>
              <Label className="text-foreground">District</Label>
              <Input name="district" placeholder="Your district" required className="mt-1 bg-background border-border" />
            </div>
          )}

          <div>
            <Label className="text-foreground">Password</Label>
            <div className="relative mt-1">
              <Input name="password" type={showPw ? "text" : "password"} placeholder="••••••••" required className="bg-background border-border pr-10" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full neon-glow gap-2" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"} <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
