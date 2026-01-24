import React, { useState } from 'react';
import { taskApi } from '../services/api';

const TaskForm = ({ onTaskCreated, taskToEdit = null, onTaskUpdated = null }) => {
  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      if (taskToEdit) {
        // Update existing task
        const response = await taskApi.updateTask(taskToEdit.id, {
          title: title.trim(),
          description: description.trim(),
          completed: taskToEdit.completed
        });

        if (onTaskUpdated) {
          onTaskUpdated(response);
        }
      } else {
        // Create new task
        const response = await taskApi.createTask({
          title: title.trim(),
          description: description.trim()
        });

        if (onTaskCreated) {
          onTaskCreated(response);
        }
      }

      // Reset form
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      console.error('Error saving task:', err);
      setError(err.response?.data?.detail || 'An error occurred while saving the task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-semibold mb-3">
        {taskToEdit ? 'Edit Task' : 'Create New Task'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task title"
          maxLength={255}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task description (optional)"
          rows="3"
          maxLength={1000}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
      >
        {taskToEdit ? 'Update Task' : 'Create Task'}
      </button>

      {taskToEdit && (
        <button
          type="button"
          onClick={() => {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
          }}
          className="ml-2 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;