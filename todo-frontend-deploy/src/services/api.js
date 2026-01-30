import axios from 'axios';

// Create an axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 5000, // 5 seconds timeout to prevent long waits
});

// Note: We can't use React hooks directly in this service file
// So we'll continue to use localStorage for token management
// The AuthContext will keep localStorage in sync

// Add a request interceptor to include the JWT token in all requests
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (synced with AuthContext)
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token might be expired, redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      // We can't use router here, so we'll reload the page to trigger the auth check
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Task-related API functions
const taskApi = {
  // Create a new task for a user
  createTask: async (taskData) => {
    try {
      const response = await apiClient.post('/api/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Get all tasks for a user
  getUserTasks: async () => {
    try {
      const response = await apiClient.get('/api/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching user tasks:', error);
      throw error;
    }
  },

  // Get a specific task for a user
  getTaskById: async (taskId) => {
    try {
      const response = await apiClient.get(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  },

  // Update a task for a user
  updateTask: async (taskId, taskData) => {
    try {
      const response = await apiClient.put(`/api/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete a task for a user
  deleteTask: async (taskId) => {
    try {
      const response = await apiClient.delete(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Update task completion status
  updateTaskCompletion: async (taskId, completed) => {
    try {
      const response = await apiClient.patch(`/api/tasks/${taskId}/complete`, {
        completed: completed
      });
      return response.data;
    } catch (error) {
      console.error('Error updating task completion:', error);
      throw error;
    }
  },

  // Agent API functions
  runDailyTaskAgent: async () => {
    try {
      const response = await apiClient.post('/api/agents/daily');
      return response.data;
    } catch (error) {
      console.error('Error running daily task agent:', error);
      throw error;
    }
  },

  getPriorityTasks: async () => {
    try {
      const response = await apiClient.get('/api/agents/priority');
      return response.data;
    } catch (error) {
      console.error('Error getting priority tasks:', error);
      throw error;
    }
  },

  getOverdueTasks: async () => {
    try {
      const response = await apiClient.get('/api/agents/overdue');
      return response.data;
    } catch (error) {
      console.error('Error getting overdue tasks:', error);
      throw error;
    }
  },

  runRecurringTaskAgent: async () => {
    try {
      const response = await apiClient.post('/api/agents/recurring');
      return response.data;
    } catch (error) {
      console.error('Error running recurring task agent:', error);
      throw error;
    }
  },

  getTaskStats: async () => {
    try {
      const response = await apiClient.get('/api/agents/stats');
      return response.data;
    } catch (error) {
      console.error('Error getting task stats:', error);
      throw error;
    }
  }
};

export default apiClient;
export { taskApi };