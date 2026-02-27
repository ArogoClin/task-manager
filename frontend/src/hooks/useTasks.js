import { useState, useEffect, useCallback } from 'react';
import { taskAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
  });

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskAPI.getAll(filters);
      setTasks(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch statistics
  const fetchStats = useCallback(async () => {
    try {
      const response = await taskAPI.getStats();
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  // Create task
  const createTask = async (taskData) => {
    try {
      const response = await taskAPI.create(taskData);
      setTasks((prev) => [response.data, ...prev]);
      fetchStats(); // Update stats
      toast.success('Task created successfully!');
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create task';
      toast.error(message);
      throw err;
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      const response = await taskAPI.update(id, taskData);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data : task))
      );
      fetchStats(); // Update stats
      toast.success('Task updated successfully!');
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update task';
      toast.error(message);
      throw err;
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await taskAPI.delete(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      fetchStats(); // Update stats
      toast.success('Task deleted successfully!');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete task';
      toast.error(message);
      throw err;
    }
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({ status: '', priority: '', search: '' });
  };

  // Initial fetch
  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [fetchTasks, fetchStats]);

  return {
    tasks,
    stats,
    loading,
    error,
    filters,
    createTask,
    updateTask,
    deleteTask,
    updateFilters,
    resetFilters,
    refetch: fetchTasks,
  };
};