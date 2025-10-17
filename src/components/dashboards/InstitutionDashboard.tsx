import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Users, AlertCircle, TrendingUp, Shield, Activity } from 'lucide-react';

const InstitutionDashboard = () => {
  const { user } = useAuth();

  const registeredUsers = [
    { id: 1, name: 'John Smith', type: 'Driver', status: 'Active', alerts: 0 },
    { id: 2, name: 'Sarah Johnson', type: 'Tourist', status: 'Active', alerts: 1 },
    { id: 3, name: 'Mike Wilson', type: 'Driver', status: 'Inactive', alerts: 0 },
    { id: 4, name: 'Emily Brown', type: 'Tourist', status: 'Active', alerts: 2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary text-white p-6 shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{user?.name} Dashboard</h1>
            <p className="text-sm text-white/80 mt-1">Managing safety protocols</p>
          </div>
          <Avatar className="w-12 h-12 border-2 border-white/30">
            <AvatarFallback className="bg-white/20 text-white text-lg">
              <Building2 className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Analytics Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-3xl font-bold">156</p>
                <p className="text-xs text-muted-foreground mt-1">Active Users</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-destructive" />
                <p className="text-3xl font-bold">12</p>
                <p className="text-xs text-muted-foreground mt-1">Active Alerts</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-3xl font-bold">98%</p>
                <p className="text-xs text-muted-foreground mt-1">Safety Score</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-accent" />
                <p className="text-3xl font-bold">+24%</p>
                <p className="text-xs text-muted-foreground mt-1">This Month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registered Users */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-primary" />
              Registered Users
            </CardTitle>
            <CardDescription>Manage drivers and tourists</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {registeredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user.alerts > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {user.alerts} alert{user.alerts > 1 ? 's' : ''}
                    </Badge>
                  )}
                  <Badge
                    variant={user.status === 'Active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {user.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Emergency Response Links */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="w-5 h-5 text-accent" />
              Emergency Response
            </CardTitle>
            <CardDescription>Quick access to emergency services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2 text-secondary" />
              View Active Alerts
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <AlertCircle className="w-4 h-4 mr-2 text-destructive" />
              Emergency Protocols
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2 text-primary" />
              Manage Responders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstitutionDashboard;
