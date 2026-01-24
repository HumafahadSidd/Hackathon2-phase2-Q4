'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Agent Components with a loading fallback
const DynamicDailyTaskAgent = dynamic(() => import('./AgentComponents').then(mod => ({ default: mod.DailyTaskAgent })), {
  loading: () => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  ),
  ssr: false // Disable SSR for this component if it uses browser APIs
});

const DynamicPriorityTaskAgent = dynamic(() => import('./AgentComponents').then(mod => ({ default: mod.PriorityTaskAgent })), {
  loading: () => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  ),
  ssr: false // Disable SSR for this component if it uses browser APIs
});

const DynamicOverdueTaskAgent = dynamic(() => import('./AgentComponents').then(mod => ({ default: mod.OverdueTaskAgent })), {
  loading: () => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  ),
  ssr: false // Disable SSR for this component if it uses browser APIs
});

const DynamicRecurringTaskAgent = dynamic(() => import('./AgentComponents').then(mod => ({ default: mod.RecurringTaskAgent })), {
  loading: () => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  ),
  ssr: false // Disable SSR for this component if it uses browser APIs
});

const DynamicTaskStatsAgent = dynamic(() => import('./AgentComponents').then(mod => ({ default: mod.TaskStatsAgent })), {
  loading: () => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  ),
  ssr: false // Disable SSR for this component if it uses browser APIs
});

export {
  DynamicDailyTaskAgent,
  DynamicPriorityTaskAgent,
  DynamicOverdueTaskAgent,
  DynamicRecurringTaskAgent,
  DynamicTaskStatsAgent
};