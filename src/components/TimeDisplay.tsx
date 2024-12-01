import { Clock } from 'lucide-react';

interface TimeDisplayProps {
  time: string;
}

const TimeDisplay = ({ time }: TimeDisplayProps) => {
  return (
    <div className="flex items-center">
      <Clock className="w-4 h-4 mr-2 text-gray-400" />
      {time}
    </div>
  );
};

export default TimeDisplay;