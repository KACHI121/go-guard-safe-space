import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Phone, Users, LogOut, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
    toast.info('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="gradient-primary text-white p-6 shadow-medium">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-sm text-white/80 mt-1">Manage your account</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Avatar */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
                <AvatarFallback className="bg-gradient-primary text-white text-3xl">
                  {user?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-sm text-muted-foreground capitalize mt-1">{user?.userType}</p>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-destructive" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>People to notify in case of emergency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emergency">Primary Emergency Contact</Label>
              <Input
                id="emergency"
                type="tel"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="+1 (555) 987-6543"
              />
            </div>
            <Button variant="outline" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Add Another Contact
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={handleSave} className="w-full shadow-medium">
            Save Changes
          </Button>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default ProfilePage;
