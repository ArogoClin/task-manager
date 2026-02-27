import prisma from '../utils/prismaClient.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Get all tasks with optional filtering
 * @route   GET /api/tasks?status=pending&priority=high&search=keyword
 * @access  Public
 */
export const getAllTasks = asyncHandler(async (req, res) => {
  const { status, priority, search } = req.query;

  // Build where clause
  const where = {};

  if (status) {
    where.status = status;
  }

  if (priority) {
    where.priority = priority;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  // Fetch tasks
  const tasks = await prisma.task.findMany({
    where,
    orderBy: [
      { priority: 'desc' }, // Urgent first
      { dueDate: 'asc' },   // Earliest due date first
      { createDate: 'desc' }, // Newest first
    ],
  });

  // Add computed fields
  const now = new Date();
  const enhancedTasks = tasks.map((task) => ({
    ...task,
    isOverdue:
      task.dueDate &&
      new Date(task.dueDate) < now &&
      task.status !== 'completed',
    tags: task.tags ? JSON.parse(task.tags) : [],
  }));

  res.status(200).json({
    success: true,
    count: enhancedTasks.length,
    data: enhancedTasks,
  });
});

/**
 * @desc    Get single task by ID
 * @route   GET /api/tasks/:id
 * @access  Public
 */
export const getTask = asyncHandler(async (req, res) => {
  const { taskId } = req; // From validateTaskId middleware

  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${taskId} not found`,
    });
  }

  // Parse tags
  const enhancedTask = {
    ...task,
    tags: task.tags ? JSON.parse(task.tags) : [],
  };

  res.status(200).json({
    success: true,
    data: enhancedTask,
  });
});

/**
 * @desc    Create new task
 * @route   POST /api/tasks
 * @access  Public
 */
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, tags, dueDate } = req.body;

  // Prepare data
  const taskData = {
    title: title.trim(),
    description: description?.trim() || null,
    status: status || 'pending',
    priority: priority || 'medium',
    tags: tags && Array.isArray(tags) ? JSON.stringify(tags) : null,
    dueDate: dueDate ? new Date(dueDate) : null,
  };

  // Create task
  const task = await prisma.task.create({
    data: taskData,
  });

  // Parse tags for response
  const enhancedTask = {
    ...task,
    tags: task.tags ? JSON.parse(task.tags) : [],
  };

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: enhancedTask,
  });
});

/**
 * @desc    Update task
 * @route   PUT /api/tasks/:id
 * @access  Public
 */
export const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req;
  const { title, description, status, priority, tags, dueDate } = req.body;

  // Check if task exists
  const existingTask = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!existingTask) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${taskId} not found`,
    });
  }

  // Prepare update data (only include provided fields)
  const updateData = {};

  if (title !== undefined) updateData.title = title.trim();
  if (description !== undefined) updateData.description = description?.trim() || null;
  if (status !== undefined) updateData.status = status;
  if (priority !== undefined) updateData.priority = priority;
  if (tags !== undefined) {
    updateData.tags = tags && Array.isArray(tags) ? JSON.stringify(tags) : null;
  }
  if (dueDate !== undefined) {
    updateData.dueDate = dueDate ? new Date(dueDate) : null;
  }

  // Update task
  const task = await prisma.task.update({
    where: { id: taskId },
    data: updateData,
  });

  // Parse tags for response
  const enhancedTask = {
    ...task,
    tags: task.tags ? JSON.parse(task.tags) : [],
  };

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: enhancedTask,
  });
});

/**
 * @desc    Delete task
 * @route   DELETE /api/tasks/:id
 * @access  Public
 */
export const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req;

  // Check if task exists
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${taskId} not found`,
    });
  }

  // Delete task
  await prisma.task.delete({
    where: { id: taskId },
  });

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
    data: { id: taskId },
  });
});

/**
 * @desc    Get task statistics
 * @route   GET /api/tasks/stats
 * @access  Public
 */
export const getTaskStats = asyncHandler(async (req, res) => {
  const now = new Date();

  // Run all queries in parallel
  const [total, pending, inProgress, completed, overdue, byPriority] = await Promise.all([
    prisma.task.count(),
    prisma.task.count({ where: { status: 'pending' } }),
    prisma.task.count({ where: { status: 'in_progress' } }),
    prisma.task.count({ where: { status: 'completed' } }),
    prisma.task.count({
      where: {
        dueDate: { lt: now },
        status: { not: 'completed' },
      },
    }),
    prisma.task.groupBy({
      by: ['priority'],
      _count: true,
    }),
  ]);

  // Format priority counts
  const priorityStats = {
    low: 0,
    medium: 0,
    high: 0,
    urgent: 0,
  };

  byPriority.forEach((item) => {
    priorityStats[item.priority] = item._count;
  });

  res.status(200).json({
    success: true,
    data: {
      total,
      byStatus: {
        pending,
        inProgress,
        completed,
      },
      overdue,
      byPriority: priorityStats,
    },
  });
});