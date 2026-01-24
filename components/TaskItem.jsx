import React, { useState, useCallback, useEffect } from 'react';
import { taskApi } from '../services/api';

const TaskItem = React.memo(({ task, onTaskDeleted, onTaskUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  // Update local state when task prop changes (e.g., when task is updated externally)
  useEffect(() => {
    if (!isEditing) {
      setEditTitle(task.title);
      setEditDescription(task.description || '');
    }
  }, [task, isEditing]);

  const handleDelete = useCallback(async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await taskApi.deleteTask(task.id);
      onTaskDeleted(task.id);
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err.response?.data?.detail || 'An error occurred while deleting the task');
    } finally {
      setIsDeleting(false);
    }
  }, [task.id, onTaskDeleted]);

  const toggleCompletion = useCallback(async () => {
    try {
      const response = await taskApi.updateTaskCompletion(task.id, !task.completed);
      onTaskUpdated(response);
    } catch (err) {
      console.error('Error updating task completion:', err);
      setError(err.response?.data?.detail || 'An error occurred while updating task completion');
    }
  }, [task.id, task.completed, onTaskUpdated]);

  const handleEditClick = useCallback(() => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(true);
    setError('');
  }, [task.title, task.description]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setError('');
  }, []);

  const handleSaveEdit = useCallback(async () => {
    if (!editTitle.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const response = await taskApi.updateTask(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        completed: task.completed
      });

      onTaskUpdated(response);
      setIsEditing(false);
      setError('');
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err.response?.data?.detail || 'An error occurred while updating the task');
    }
  }, [task.id, task.completed, editTitle, editDescription, onTaskUpdated]);

  return (
    <div className={`border rounded-lg p-4 shadow-sm ${task.completed ? 'bg-green-50' : 'bg-white'}`}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
          {error}
        </div>
      )}

      {isEditing ? (
        // Editing mode
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Edit Task</h3>

          <div className="mb-3">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task title"
              maxLength={255}
            />
          </div>

          <div className="mb-3">
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task description (optional)"
              rows="2"
              maxLength={1000}
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-1 px-3 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Display mode
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={toggleCompletion}
                className="mt-1 mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`mt-1 text-gray-600 ${task.completed ? 'line-through' : ''}`}>
                    {task.description}
                  </p>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  Created: {new Date(task.created_at).toLocaleString()}
                  {task.updated_at !== task.created_at && (
                    <span>, Updated: {new Date(task.updated_at).toLocaleString()}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-2 mt-2 sm:mt-0">
            <button
              onClick={handleEditClick}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`text-red-600 hover:text-red-800 text-sm font-medium ${
                isDeleting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default TaskItem;