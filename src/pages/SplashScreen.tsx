import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import logo from '@/assets/goguard-logo.png';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="text-center animate-fade-in">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <img 
              src={logo} 
              alt="GoGuard Logo" 
              className="w-32 h-32 animate-scale-in"
            />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          GoGuard
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          Your Safety, Smartly Guarded
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-12 h-1 bg-gradient-primary rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
