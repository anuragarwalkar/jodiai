import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens (if needed)
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
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

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Profile Services
export const profileService = {
  // Get all profiles from backend (already transformed)
  getProfiles: async (userPreferences = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add user preferences as query parameters
      if (userPreferences.ageRange) queryParams.append('ageRange', userPreferences.ageRange);
      if (userPreferences.location) queryParams.append('location', userPreferences.location);
      if (userPreferences.education) queryParams.append('education', userPreferences.education);
      if (userPreferences.caste) queryParams.append('caste', userPreferences.caste);
      if (userPreferences.income) queryParams.append('income', userPreferences.income);
      
      const url = `/profiles/profiles${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch profiles');
    }
  },

  // Calculate compatibility between two profiles
  calculateCompatibility: async (profile1, profile2) => {
    try {
      const response = await apiClient.post('/profiles/compatibility', {
        profile1,
        profile2
      });
      return response.data;
    } catch (error) {
      console.error('Error calculating compatibility:', error);
      throw new Error(error.response?.data?.message || 'Failed to calculate compatibility');
    }
  }
};

// AI Services
export const aiService = {
  // Analyze a single profile with AI
  analyzeProfile: async (profile, userRequirements) => {
    try {
      const response = await apiClient.post('/ai/analyze-profile', {
        profile,
        userRequirements
      });
      return response.data;
    } catch (error) {
      console.error('Error analyzing profile:', error);
      throw new Error(error.response?.data?.message || 'Failed to analyze profile');
    }
  },

  // Generate match recommendations for multiple profiles
  generateRecommendations: async (profiles, userProfile, userRequirements) => {
    try {
      const response = await apiClient.post('/ai/recommend-matches', {
        profiles,
        userProfile,
        userRequirements
      });
      return response.data;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      throw new Error(error.response?.data?.message || 'Failed to generate recommendations');
    }
  },

  // Set user requirements
  setRequirements: async (requirements) => {
    try {
      const response = await apiClient.post('/ai/set-requirements', {
        requirements
      });
      return response.data;
    } catch (error) {
      console.error('Error setting requirements:', error);
      throw new Error(error.response?.data?.message || 'Failed to set requirements');
    }
  }
};

// Utility function to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status,
      data: error.response.data
    };
  } else if (error.request) {
    // Network error
    return {
      message: 'Network error - please check your connection',
      status: 0,
      data: null
    };
  } else {
    // Other error
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1,
      data: null
    };
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL.replace('/api', '')}/health`);
    return response.data;
  } catch (error) {
    throw new Error('Backend server is not responding');
  }
};

export default apiClient;
