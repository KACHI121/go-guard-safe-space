import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Mic, Bell, Shield, Clock } from 'lucide-react';
import AlertModal from '../AlertModal';

const TouristDashboard = () => {
  const { user } = useAuth();
  const [showAlertModal, setShowAlertModal] = useState(false);

  const recentAlerts = [
    { id: 1, type: 'Safe Zone Entered', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'High-Risk Area Alert', time: '5 hours ago', status: 'warning' },
    { id: 3, type: 'Check-in Reminder', time: 'Yesterday', status: 'info' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary text-white p-6 shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Hello, {user?.name}! 👋</h1>
            <p className="text-sm text-white/80 mt-1">Stay safe on your journey</p>
          </div>
          <Avatar className="w-12 h-12 border-2 border-white/30">
            <AvatarFallback className="bg-white/20 text-white text-lg">
              {user?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Map Section */}
        <Card className="shadow-soft overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5 text-primary" />
              Your Location
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-48 bg-muted flex items-center justify-center border-t">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Map will be displayed here</p>
                <p className="text-xs mt-1">Google Maps Integration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-auto py-4 flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-smooth"
          >
            <Shield className="w-6 h-6 text-secondary" />
            <span className="text-sm font-medium">View Safe Zones</span>
          </Button>
          <Button
            onClick={() => setShowAlertModal(true)}
            className="h-auto py-4 flex-col gap-2 bg-destructive hover:bg-destructive/90 text-white shadow-medium"
          >
            <Mic className="w-6 h-6" />
            <span className="text-sm font-medium">SOS Alert</span>
          </Button>
        </div>

        {/* Recent Alerts */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="w-5 h-5 text-accent" />
              Recent Alerts
            </CardTitle>
            <CardDescription>Your latest notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    alert.status === 'success'
                      ? 'bg-secondary'
                      : alert.status === 'warning'
                      ? 'bg-destructive'
                      : 'bg-primary'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.type}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card className="shadow-soft gradient-secondary text-white">
          <CardHeader>
            <CardTitle className="text-lg">💡 Safety Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/90">
              Always share your live location with trusted contacts when exploring new areas. Stay aware of your surroundings.
            </p>
          </CardContent>
        </Card>
      </div>

      <AlertModal open={showAlertModal} onOpenChange={setShowAlertModal} />
    </div>
  );
};

export default TouristDashboard;
