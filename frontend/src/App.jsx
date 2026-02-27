import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import TaskStats from './components/tasks/TaskStats';
import TaskFilters from './components/tasks/TaskFilters';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';
import { useTasks } from './hooks/useTasks';

function App() {
  const {
    tasks,
    stats,
    loading,
    filters,
    createTask,
    updateTask,
    deleteTask,
    updateFilters,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Handle create task
  const handleCreateTask = async (taskData) => {
    setFormLoading(true);
    try {
      await createTask(taskData);
      setIsModalOpen(false);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle update task
  const handleUpdateTask = async (taskData) => {
    setFormLoading(true);
    try {
      await updateTask(editingTask.id, taskData);
      setIsModalOpen(false);
      setEditingTask(null);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  // Handle edit click
  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Handle create click
  const handleCreateClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Handle status change (quick complete)
  const handleStatusChange = async (taskId, newStatus) => {
    await updateTask(taskId, { status: newStatus });
  };

  // Handle search from header
  const handleSearchChange = (searchValue) => {
    updateFilters({ search: searchValue });
  };

  return (
    <>
      <Layout 
        searchValue={filters.search} 
        onSearchChange={handleSearchChange}
      >
        {/* Statistics Cards */}
        <TaskStats stats={stats} loading={loading} />

        {/* Filters and Create Button */}
        <TaskFilters
          filters={filters}
          onFilterChange={updateFilters}
          onCreateClick={handleCreateClick}
        />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />

        {/* Empty state when no tasks at all */}
        {!loading && tasks.length === 0 && !filters.status && !filters.priority && !filters.search && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Welcome to TaskMaster!
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start organizing your work by creating your first task. Click the "New Task" button to get started.
            </p>
          </div>
        )}
      </Layout>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
        loading={formLoading}
      />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;