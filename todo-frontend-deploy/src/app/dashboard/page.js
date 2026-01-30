'use client';

import { useMemo, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/hoc/ProtectedRoute';
import TaskForm from '@/components/TaskFormDynamic'; // Using dynamic import
import TaskList from '@/components/TaskListDynamic'; // Using dynamic import
import {
  DynamicDailyTaskAgent,
  DynamicPriorityTaskAgent,
  DynamicOverdueTaskAgent,
  DynamicRecurringTaskAgent,
  DynamicTaskStatsAgent
} from '@/components/AgentComponentsDynamic';

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg text-gray-700">Loading dashboard...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Access denied. Please log in.</p>
      </div>
    );
  }

  // Memoize the welcome message to prevent unnecessary re-renders
  const welcomeMessage = useMemo(() => `Welcome, ${user.name || user.email}!`, [user.name, user.email]);

  // Handler for when an agent performs an action that should refresh the dashboard
  const handleAgentAction = () => {
    // Trigger a refresh of the task list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Task Dashboard</h1>
        <p className="text-gray-600 mb-6">{welcomeMessage}</p>

        {/* Agent Components Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DynamicDailyTaskAgent onActionComplete={handleAgentAction} />
          <DynamicPriorityTaskAgent onActionComplete={handleAgentAction} />
          <DynamicOverdueTaskAgent onActionComplete={handleAgentAction} />
          <DynamicRecurringTaskAgent onActionComplete={handleAgentAction} />
          <DynamicTaskStatsAgent onActionComplete={handleAgentAction} />

          {/* Placeholder for future agent */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-center">
            <p className="text-gray-500 text-center">More AI agents coming soon</p>
          </div>
        </div>

        <hr className="my-8" />

        {/* Task Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TaskForm key={`task-form-${refreshTrigger}`} />
          </div>
          <div className="lg:col-span-2">
            <TaskList key={`task-list-${refreshTrigger}`} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;