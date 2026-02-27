import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return '';
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

export const getRelativeTime = (date) => {
  if (!date) return '';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const isOverdue = (dueDate, status) => {
  if (!dueDate || status === 'completed') return false;
  return isPast(new Date(dueDate));
};

export const getDueDateStatus = (dueDate) => {
  if (!dueDate) return null;
  
  const date = new Date(dueDate);
  
  if (isToday(date)) return 'today';
  if (isTomorrow(date)) return 'tomorrow';
  if (isPast(date)) return 'overdue';
  
  return 'upcoming';
};

export const formatDueDateLabel = (dueDate) => {
  if (!dueDate) return 'No due date';
  
  const status = getDueDateStatus(dueDate);
  const formatted = formatDate(dueDate);
  
  switch (status) {
    case 'today':
      return `Today, ${formatted}`;
    case 'tomorrow':
      return `Tomorrow, ${formatted}`;
    case 'overdue':
      return `Overdue: ${formatted}`;
    default:
      return formatted;
  }
};