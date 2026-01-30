'use client';

import dynamic from 'next/dynamic';

// Dynamically import the TaskForm component with a loading fallback
const DynamicTaskForm = dynamic(() => import('./TaskForm'), {
  loading: () => (
    <div className="mb-6 p-4 border rounded-md">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/6 mb-3"></div>
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/6 mb-3"></div>
        <div className="h-20 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-1/5"></div>
      </div>
    </div>
  ),
  ssr: false // Disable SSR for this component if it uses browser APIs
});

// Wrap the dynamic import to ensure it doesn't receive userId prop
const TaskFormWrapper = (props) => {
  const { userId, ...restProps } = props; // Destructure to remove userId
  return <DynamicTaskForm {...restProps} />;
};

export default TaskFormWrapper;