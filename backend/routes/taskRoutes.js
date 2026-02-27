import express from 'express';
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} from '../controllers/taskController.js';
import { validateTask, validateTaskId } from '../middleware/validateRequest.js';

const router = express.Router();

// Stats route 
router.get('/stats', getTaskStats);

// CRUD routes
router.route('/')
  .get(getAllTasks)
  .post(validateTask, createTask);

router.route('/:id')
  .get(validateTaskId, getTask)
  .put(validateTaskId, validateTask, updateTask)
  .delete(validateTaskId, deleteTask);

export default router;