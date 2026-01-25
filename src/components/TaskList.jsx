import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TaskItem from './TaskItem';
import { taskApi } from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const tasksData = await taskApi.getUserTasks();
      setTasks(tasksData);
      setError('');
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.message || 'An error occurred while fetching tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskDeleted = useCallback((deletedTaskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== deletedTaskId));
  }, []);

  const handleTaskUpdated = useCallback((updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading tasks...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  // Memoize the task list to prevent unnecessary re-renders
  const taskItems = useMemo(() =>
    tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        userId={userId}
        onTaskDeleted={handleTaskDeleted}
        onTaskUpdated={handleTaskUpdated}
      />
    )), [tasks, userId, handleTaskDeleted, handleTaskUpdated]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found. Create your first task!</p>
      ) : (
        <div className="space-y-3">
          {taskItems}
        </div>
      )}
    </div>
  );
};

export default TaskList;