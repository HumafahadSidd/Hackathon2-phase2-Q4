'use client';

import { useState, useEffect } from 'react';
import { taskApi } from '@/services/api';

const AgentButton = ({ 
  children, 
  onClick, 
  isLoading, 
  className = "" 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        isLoading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      } ${className}`}
    >
      {isLoading ? 'Processing...' : children}
    </button>
  );
};

const DailyTaskAgent = ({ onActionComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRunAgent = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await taskApi.runDailyTaskAgent();
      onActionComplete?.(response);
    } catch (err) {
      console.error('Error running daily task agent:', err);
      setError(err.message || 'Failed to run daily task agent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">Daily Task Agent</h3>
      <p className="text-gray-600 text-sm mb-3">
        Creates a default daily task if none exist for today
      </p>
      <AgentButton 
        onClick={handleRunAgent} 
        isLoading={loading}
        className="w-full"
      >
        Run Daily Task Agent
      </AgentButton>
      {error && (
        <div className="mt-2 text-red-600 text-sm">{error}</div>
      )}
    </div>
  );
};

const PriorityTaskAgent = ({ onActionComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const handleRunAgent = async () => {
    try {
      setLoading(true);
      setError('');
      setResults(null);
      
      const response = await taskApi.getPriorityTasks();
      setResults(response.priority_tasks);
      onActionComplete?.(response);
    } catch (err) {
      console.error('Error running priority task agent:', err);
      setError(err.message || 'Failed to run priority task agent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">Priority Task Agent</h3>
      <p className="text-gray-600 text-sm mb-3">
        Identifies urgent/high-priority tasks based on keywords
      </p>
      <AgentButton 
        onClick={handleRunAgent} 
        isLoading={loading}
        className="w-full"
      >
        Run Priority Task Agent
      </AgentButton>
      {error && (
        <div className="mt-2 text-red-600 text-sm">{error}</div>
      )}
      {results && results.length > 0 && (
        <div className="mt-3">
          <h4 className="font-medium text-sm mb-1">Priority Tasks Found:</h4>
          <ul className="text-sm text-gray-700">
            {results.slice(0, 3).map((task, index) => (
              <li key={index} className="truncate">{task.title}</li>
            ))}
            {results.length > 3 && (
              <li className="text-xs text-gray-500">+{results.length - 3} more</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const OverdueTaskAgent = ({ onActionComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const handleRunAgent = async () => {
    try {
      setLoading(true);
      setError('');
      setResults(null);
      
      const response = await taskApi.getOverdueTasks();
      setResults(response);
      onActionComplete?.(response);
    } catch (err) {
      console.error('Error running overdue task agent:', err);
      setError(err.message || 'Failed to run overdue task agent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">Overdue Task Agent</h3>
      <p className="text-gray-600 text-sm mb-3">
        Identifies tasks past due date or long-pending
      </p>
      <AgentButton 
        onClick={handleRunAgent} 
        isLoading={loading}
        className="w-full"
      >
        Run Overdue Task Agent
      </AgentButton>
      {error && (
        <div className="mt-2 text-red-600 text-sm">{error}</div>
      )}
      {results && (results.overdue_tasks.length > 0 || results.long_pending_tasks.length > 0) && (
        <div className="mt-3">
          {results.overdue_tasks.length > 0 && (
            <div className="mb-2">
              <h4 className="font-medium text-sm">Overdue Tasks:</h4>
              <ul className="text-sm text-gray-700">
                {results.overdue_tasks.slice(0, 3).map((task, index) => (
                  <li key={index} className="truncate">{task.title}</li>
                ))}
                {results.overdue_tasks.length > 3 && (
                  <li className="text-xs text-gray-500">+{results.overdue_tasks.length - 3} more</li>
                )}
              </ul>
            </div>
          )}
          {results.long_pending_tasks.length > 0 && (
            <div>
              <h4 className="font-medium text-sm">Long Pending Tasks:</h4>
              <ul className="text-sm text-gray-700">
                {results.long_pending_tasks.slice(0, 3).map((task, index) => (
                  <li key={index} className="truncate">{task.title}</li>
                ))}
                {results.long_pending_tasks.length > 3 && (
                  <li className="text-xs text-gray-500">+{results.long_pending_tasks.length - 3} more</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const RecurringTaskAgent = ({ onActionComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRunAgent = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await taskApi.runRecurringTaskAgent();
      onActionComplete?.(response);
    } catch (err) {
      console.error('Error running recurring task agent:', err);
      setError(err.message || 'Failed to run recurring task agent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">Recurring Task Agent</h3>
      <p className="text-gray-600 text-sm mb-3">
        Creates recurring tasks based on predefined schedules
      </p>
      <AgentButton 
        onClick={handleRunAgent} 
        isLoading={loading}
        className="w-full"
      >
        Run Recurring Task Agent
      </AgentButton>
      {error && (
        <div className="mt-2 text-red-600 text-sm">{error}</div>
      )}
    </div>
  );
};

const TaskStatsAgent = ({ onActionComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);

  const handleRunAgent = async () => {
    try {
      setLoading(true);
      setError('');
      setStats(null);
      
      const response = await taskApi.getTaskStats();
      setStats(response);
      onActionComplete?.(response);
    } catch (err) {
      console.error('Error running task stats agent:', err);
      setError(err.message || 'Failed to run task stats agent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">Task Stats Agent</h3>
      <p className="text-gray-600 text-sm mb-3">
        Shows statistics about your tasks
      </p>
      <AgentButton 
        onClick={handleRunAgent} 
        isLoading={loading}
        className="w-full"
      >
        Get Task Statistics
      </AgentButton>
      {error && (
        <div className="mt-2 text-red-600 text-sm">{error}</div>
      )}
      {stats && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-blue-50 p-2 rounded text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div className="bg-green-50 p-2 rounded text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div className="bg-yellow-50 p-2 rounded text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
          <div className="bg-red-50 p-2 rounded text-center">
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <div className="text-xs text-gray-600">Overdue</div>
          </div>
        </div>
      )}
    </div>
  );
};

export {
  DailyTaskAgent,
  PriorityTaskAgent,
  OverdueTaskAgent,
  RecurringTaskAgent,
  TaskStatsAgent
};