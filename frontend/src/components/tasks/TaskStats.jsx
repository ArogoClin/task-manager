import React from 'react';
import { 
  ListTodo, 
  Clock, 
  PlayCircle, 
  CheckCircle2,
  AlertCircle 
} from 'lucide-react';
import Card from '../ui/Card';

const StatCard = ({ icon: Icon, label, value, color, bgColor }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`${bgColor} p-4 rounded-lg`}>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      </div>
    </Card>
  );
};

const TaskStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      icon: ListTodo,
      label: 'Total Tasks',
      value: stats?.total || 0,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Clock,
      label: 'Pending',
      value: stats?.byStatus?.pending || 0,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: PlayCircle,
      label: 'In Progress',
      value: stats?.byStatus?.inProgress || 0,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: CheckCircle2,
      label: 'Completed',
      value: stats?.byStatus?.completed || 0,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
      
      {/* Overdue indicator if exists */}
      {stats?.overdue > 0 && (
        <Card className="p-4 md:col-span-2 lg:col-span-4 bg-red-50 border-red-200">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm font-medium text-red-800">
              You have {stats.overdue} overdue task{stats.overdue > 1 ? 's' : ''}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TaskStats;