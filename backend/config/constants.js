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

export const VALID_STATUSES = Object.values(TASK_STATUS);
export const VALID_PRIORITIES = Object.values(TASK_PRIORITY);