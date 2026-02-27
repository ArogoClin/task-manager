import React from 'react';
import { ClipboardList, Search as SearchIcon } from 'lucide-react';
import TaskCard from './TaskCard';

const EmptyState = ({ type = 'no-tasks' }) => {
  const states = {
    'no-tasks': {
      icon: ClipboardList,
      title: 'No tasks yet',
      description: 'Create your first task to get started organizing your work.',
    },
    'no-results': {
      icon: SearchIcon,
      title: 'No tasks found',
      description: 'Try adjusting your filters or search terms.',
    },
  };

  const state = states[type];
  const Icon = state.icon;

  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{state.title}</h3>
      <p className="text-sm text-gray-600 max-w-sm mx-auto">{state.description}</p>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
          <div className="flex justify-between mb-4">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TaskList = ({ tasks, loading, onEdit, onDelete, onStatusChange }) => {
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (tasks.length === 0) {
    return <EmptyState type="no-results" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;