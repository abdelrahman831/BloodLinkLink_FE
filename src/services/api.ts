// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => apiCall('/dashboard/stats'),
  getDailyConsumption: () => apiCall('/dashboard/consumption'),
  getWeeklyDonations: () => apiCall('/dashboard/donations/weekly'),
  getHospitals: () => apiCall('/dashboard/hospitals'),
};

// Blood Inventory APIs
export const inventoryAPI = {
  getAll: () => apiCall('/inventory'),
  getByType: (bloodType: string) => apiCall(`/inventory/${bloodType}`),
  update: (bloodType: string, data: any) => 
    apiCall(`/inventory/${bloodType}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Hospitals & Requests APIs
export const hospitalsAPI = {
  getAll: () => apiCall('/hospitals'),
  getRequests: (filters?: any) => {
    const queryParams = filters ? `?${new URLSearchParams(filters)}` : '';
    return apiCall(`/hospitals/requests${queryParams}`);
  },
  approveRequest: (requestId: number) => 
    apiCall(`/hospitals/requests/${requestId}/approve`, {
      method: 'POST',
    }),
  rejectRequest: (requestId: number) => 
    apiCall(`/hospitals/requests/${requestId}/reject`, {
      method: 'POST',
    }),
};

// Donations & Campaigns APIs
export const campaignsAPI = {
  getAll: () => apiCall('/campaigns'),
  getById: (id: number) => apiCall(`/campaigns/${id}`),
  create: (data: any) => 
    apiCall('/campaigns', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: number, data: any) => 
    apiCall(`/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: number) => 
    apiCall(`/campaigns/${id}`, {
      method: 'DELETE',
    }),
};

// Transfers & Logistics APIs
export const transfersAPI = {
  getAll: () => apiCall('/transfers'),
  getById: (id: string) => apiCall(`/transfers/${id}`),
  create: (data: any) => 
    apiCall('/transfers', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateStatus: (id: string, status: string) => 
    apiCall(`/transfers/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// Analytics & Reports APIs
export const analyticsAPI = {
  getMonthlyData: () => apiCall('/analytics/monthly'),
  getBloodTypeDistribution: () => apiCall('/analytics/blood-types'),
  getDonorAgeGroups: () => apiCall('/analytics/donors/age-groups'),
  exportReport: (type: string, period: string) => 
    apiCall(`/analytics/export?type=${type}&period=${period}`),
};

// Auth APIs
export const authAPI = {
  login: (email: string, password: string) => 
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () => apiCall('/auth/logout', { method: 'POST' }),
  getCurrentUser: () => apiCall('/auth/me'),
};

// Settings APIs
export const settingsAPI = {
  getProfile: () => apiCall('/settings/profile'),
  updateProfile: (data: any) => 
    apiCall('/settings/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  updatePassword: (currentPassword: string, newPassword: string) => 
    apiCall('/settings/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
  getNotifications: () => apiCall('/settings/notifications'),
  updateNotifications: (settings: any) => 
    apiCall('/settings/notifications', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),
};
