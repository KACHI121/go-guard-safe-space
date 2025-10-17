import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Car, MapPin, AlertTriangle, Navigation, Clock, TrendingUp } from 'lucide-react';
import AlertModal from '../AlertModal';

const DriverDashboard = () => {
  const { user } = useAuth();
  const [showAlertModal, setShowAlertModal] = useState(false);

  const recentTrips = [
    { id: 1, from: 'Downtown', to: 'Airport', duration: '45 min', date: 'Today' },
    { id: 2, from: 'Mall', to: 'Residence', duration: '20 min', date: 'Yesterday' },
    { id: 3, from: 'Office', to: 'Home', duration: '35 min', date: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary text-white p-6 shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.name}! 🚗</h1>
            <p className="text-sm text-white/80 mt-1">Drive safe, stay protected</p>
          </div>
          <Avatar className="w-12 h-12 border-2 border-white/30">
            <AvatarFallback className="bg-white/20 text-white text-lg">
              {user?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Emergency Panic Button */}
        <Card className="shadow-strong border-destructive/50">
          <CardContent className="pt-6">
            <Button
              onClick={() => setShowAlertModal(true)}
              className="w-full h-24 bg-destructive hover:bg-destructive/90 text-white text-xl font-bold shadow-medium"
            >
              <AlertTriangle className="w-8 h-8 mr-3" />
              🚨 PANIC BUTTON
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Press in case of emergency - instantly alerts authorities
            </p>
          </CardContent>
        </Card>

        {/* Current Route */}
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Navigation className="w-5 h-5 text-primary" />
              Route Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Car className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No active route</p>
                <Button variant="link" className="mt-2 text-primary">
                  Start New Trip
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground mt-1">Safe Trips</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-accent" />
                <p className="text-2xl font-bold">48h</p>
                <p className="text-xs text-muted-foreground mt-1">Drive Time</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trip History */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5 text-primary" />
              Trip History
            </CardTitle>
            <CardDescription>Your recent journeys</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTrips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Car className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {trip.from} → {trip.to}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{trip.date}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{trip.duration}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <AlertModal open={showAlertModal} onOpenChange={setShowAlertModal} />
    </div>
  );
};

export default DriverDashboard;
