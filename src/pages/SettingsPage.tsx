import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Settings, Mic, MessageSquare, Globe, Moon, ArrowLeft, Bell } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [voiceActivation, setVoiceActivation] = useState(true);
  const [smsFallback, setSmsFallback] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
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
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm text-white/80 mt-1">Customize your experience</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Emergency Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Emergency Features
            </CardTitle>
            <CardDescription>Configure emergency response options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <Label htmlFor="voice" className="text-base font-medium">
                    Voice Activation
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Trigger SOS with voice command
                  </p>
                </div>
              </div>
              <Switch
                id="voice"
                checked={voiceActivation}
                onCheckedChange={setVoiceActivation}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <Label htmlFor="sms" className="text-base font-medium">
                    SMS Fallback
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Send SMS when no internet
                  </p>
                </div>
              </div>
              <Switch
                id="sms"
                checked={smsFallback}
                onCheckedChange={setSmsFallback}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <Label htmlFor="notifications" className="text-base font-medium">
                    Push Notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Receive safety alerts
                  </p>
                </div>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              Preferences
            </CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>About GoGuard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Version 1.0.0</p>
            <p>Your Safety, Smartly Guarded</p>
            <div className="pt-4 space-y-2">
              <Button variant="link" className="h-auto p-0 text-primary">
                Privacy Policy
              </Button>
              <br />
              <Button variant="link" className="h-auto p-0 text-primary">
                Terms of Service
              </Button>
              <br />
              <Button variant="link" className="h-auto p-0 text-primary">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSaveSettings} className="w-full shadow-medium">
          Save Settings
        </Button>
      </div>

      <Navbar />
    </div>
  );
};

export default SettingsPage;
