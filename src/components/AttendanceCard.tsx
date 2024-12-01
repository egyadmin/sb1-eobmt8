import { Clock, UserCheck, UserX, Calendar } from 'lucide-react';

interface AttendanceCardProps {
  title: string;
  value: string | number;
  icon: 'attendance' | 'absent' | 'late' | 'schedule';
  color: string;
}

const AttendanceCard = ({ title, value, icon, color }: AttendanceCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case 'attendance':
        return <UserCheck className="w-6 h-6 text-white" />;
      case 'absent':
        return <UserX className="w-6 h-6 text-white" />;
      case 'late':
        return <Clock className="w-6 h-6 text-white" />;
      case 'schedule':
        return <Calendar className="w-6 h-6 text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className={`${color} rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-medium mb-1">{title}</p>
          <h3 className="text-white text-3xl font-bold">{value}</h3>
        </div>
        <div className="bg-white/20 p-3 rounded-full">
          {getIcon()}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;