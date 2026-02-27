export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

export const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

export const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    dotColor: 'bg-yellow-500',
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    dotColor: 'bg-blue-500',
  },
  completed: {
    label: 'Completed',
    color: 'bg-green-100 text-green-800 border-green-300',
    dotColor: 'bg-green-500',
  },
};

export const PRIORITY_CONFIG = {
  low: {
    label: 'Low',
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
  },
  medium: {
    label: 'Medium',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
  },
  high: {
    label: 'High',
    color: 'text-orange-500',
    bgColor: 'bg-orange-100',
  },
  urgent: {
    label: 'Urgent',
    color: 'text-red-500',
    bgColor: 'bg-red-100',
  },
};