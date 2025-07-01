
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: any | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  sendOTP: (email: string) => Promise<{ error?: string; otp?: string }>;
  verifyOTP: (email: string, otp: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile
          setTimeout(async () => {
            try {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', session.user.id)
                .single();
              
              setUserProfile(profile);
            } catch (error) {
              console.error('Error fetching profile:', error);
            }
          }, 0);
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const sendOTP = async (email: string) => {
    try {
      const response = await fetch(`https://wzsupjftqiwealmgkqqu.supabase.co/functions/v1/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.supabaseKey}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { error: data.error || 'Failed to send OTP' };
      }

      return { otp: data.otp }; // For demo purposes
    } catch (error) {
      console.error('Error sending OTP:', error);
      return { error: 'Failed to send OTP' };
    }
  };

  const verifyOTP = async (email: string, otp: string, password: string, fullName: string) => {
    try {
      const response = await fetch(`https://wzsupjftqiwealmgkqqu.supabase.co/functions/v1/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.supabaseKey}`,
        },
        body: JSON.stringify({ email, otp, password, fullName }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { error: data.error || 'Failed to verify OTP' };
      }

      return {};
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return { error: 'Failed to verify OTP' };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    return { error: 'Please use OTP verification flow' };
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          return { error: 'Invalid email or password. Please check your credentials and try again.' };
        }
        if (error.message.includes('Email not confirmed')) {
          return { error: 'Please verify your email address first.' };
        }
        return { error: error.message };
      }

      toast({
        title: "Login Successful!",
        description: "Welcome back to HomeEase",
      });

      return {};
    } catch (error) {
      console.error('Error signing in:', error);
      return { error: 'An unexpected error occurred. Please try again.' };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      userProfile,
      loading,
      signUp,
      sendOTP,
      verifyOTP,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
