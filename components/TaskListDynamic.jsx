'use client';

import dynamic from 'next/dynamic';

// Dynamically import the TaskList component with a loading fallback
const DynamicTaskList = dynamic(() => import('./TaskList'), {
  loading: () => (
    <div className="mt-6">
      <div className="h-6 bg-gray-200 rounded w-1/5 mb-4"></div>
      <div className="space-y-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm animate-pulse">
            <div className="flex items-center">
              <div className="h-5 w-5 rounded border border-gray-300 mr-3"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-6 w-12 bg-gray-200 rounded"></div>
                <div className="h-6 w-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  ssr: false // Disable SSR for this component if it uses browser APIs
});

// Wrap the dynamic import to ensure it doesn't receive userId prop
const TaskListWrapper = (props) => {
  const { userId, ...restProps } = props; // Destructure to remove userId
  return <DynamicTaskList {...restProps} />;
};

export default TaskListWrapper;