import { VALID_STATUSES, VALID_PRIORITIES } from '../config/constants.js';

/**
 * Validate task creation/update request body
 */
export const validateTask = (req, res, next) => {
  const { title, status, priority, dueDate } = req.body;
  const errors = [];

  // Validate title (only for POST)
  if (req.method === 'POST') {
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      errors.push('Title is required and must be a non-empty string');
    }
    if (title && title.length > 255) {
      errors.push('Title must not exceed 255 characters');
    }
  }

  // Validate status
  if (status && !VALID_STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  // Validate priority
  if (priority && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`Priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }

  // Validate dueDate
  if (dueDate) {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      errors.push('Due date must be a valid date');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

/**
 * Validate task ID parameter
 */
export const validateTaskId = (req, res, next) => {
  const { id } = req.params;
  const taskId = parseInt(id);

  if (isNaN(taskId) || taskId < 1) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID',
    });
  }

  req.taskId = taskId; // Attach parsed ID to request
  next();
};