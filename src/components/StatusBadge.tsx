interface StatusBadgeProps {
  status: 'present' | 'absent' | 'late';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'text-green-600 bg-green-100';
      case 'absent':
        return 'text-red-600 bg-red-100';
      case 'late':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'present':
        return 'حاضر';
      case 'absent':
        return 'غائب';
      case 'late':
        return 'متأخر';
      default:
        return '';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {getStatusText(status)}
    </span>
  );
};

export default StatusBadge;