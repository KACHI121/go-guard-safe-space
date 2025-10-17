import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, Phone, X } from 'lucide-react';
import { toast } from 'sonner';

interface AlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertModal = ({ open, onOpenChange }: AlertModalProps) => {
  const [countdown, setCountdown] = useState(5);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (open && !isConfirmed) {
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleConfirm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [open, isConfirmed]);

  const handleConfirm = () => {
    setIsConfirmed(true);
    toast.success('Emergency alert sent! Help is on the way.', {
      description: 'Your location and details have been shared with emergency contacts.',
      duration: 5000,
    });
    setTimeout(() => {
      onOpenChange(false);
      setIsConfirmed(false);
    }, 3000);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setIsConfirmed(false);
    toast.info('Emergency alert cancelled');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!isConfirmed ? (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center animate-pulse">
                  <AlertCircle className="w-12 h-12 text-destructive" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl">Emergency Alert</DialogTitle>
              <DialogDescription className="text-center text-base">
                Sending SOS alert in <span className="text-destructive font-bold text-xl">{countdown}</span> seconds
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 mt-4">
              <Button
                onClick={handleConfirm}
                className="w-full bg-destructive hover:bg-destructive/90 text-lg py-6"
              >
                <Phone className="w-5 h-5 mr-2" />
                Send Alert Now
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="w-full text-lg py-6"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Your location will be shared with emergency contacts and authorities
            </p>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Phone className="w-12 h-12 text-secondary" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl text-secondary">Alert Sent!</DialogTitle>
              <DialogDescription className="text-center text-base">
                Help is on the way. Stay safe and keep your phone nearby.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 p-4 bg-secondary/10 rounded-lg">
              <p className="text-sm text-center font-medium">
                Emergency contacts have been notified with your current location.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;
