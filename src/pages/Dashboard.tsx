import { useAuth } from '@/contexts/AuthContext';
import TouristDashboard from '@/components/dashboards/TouristDashboard';
import DriverDashboard from '@/components/dashboards/DriverDashboard';
import InstitutionDashboard from '@/components/dashboards/InstitutionDashboard';
import Navbar from '@/components/Navbar';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const renderDashboard = () => {
    switch (user.userType) {
      case 'tourist':
        return <TouristDashboard />;
      case 'driver':
        return <DriverDashboard />;
      case 'institution':
        return <InstitutionDashboard />;
      default:
        return <TouristDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {renderDashboard()}
      <Navbar />
    </div>
  );
};

export default Dashboard;
