import { Home, MapPin, AlertCircle, User, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import AlertModal from './AlertModal';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlertModal, setShowAlertModal] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: MapPin, label: 'Map', path: '/dashboard' },
    { icon: AlertCircle, label: 'SOS', path: '#', onClick: () => setShowAlertModal(true) },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.onClick) {
      item.onClick();
    } else {
      navigate(item.path);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-strong z-50">
        <div className="flex justify-around items-center h-16 max-w-2xl mx-auto px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isSOS = item.label === 'SOS';

            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 transition-smooth flex-1 py-2',
                  isSOS
                    ? 'text-destructive hover:scale-110'
                    : isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className={cn('w-5 h-5', isSOS && 'w-6 h-6')} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      <AlertModal open={showAlertModal} onOpenChange={setShowAlertModal} />
    </>
  );
};

export default Navbar;
