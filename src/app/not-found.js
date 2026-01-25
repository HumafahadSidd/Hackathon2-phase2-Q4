'use client';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Not Found</h2>
      <p className="text-gray-600 mb-4">Could not find the requested page</p>
      <a 
        href="/" 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Return Home
      </a>
    </div>
  );
}