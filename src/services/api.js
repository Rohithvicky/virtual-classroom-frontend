import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Update with your backend URL

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

// User Services
export const userService = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
  getByRole: (role) => api.get(`/users/role/${role}`),
};

// Course Services
export const courseService = {
  getAll: () => api.get('/courses'),
  create: (courseData) => api.post('/courses', courseData),
  getById: (id) => api.get(`/courses/${id}`),
  update: (id, courseData) => api.put(`/courses/${id}`, courseData),
  delete: (id) => api.delete(`/courses/${id}`),
  getByUser: (userId) => api.get(`/courses/user/${userId}`),
  enroll: (courseId) => api.post(`/courses/${courseId}/enroll`),
};

// Assignment Services
export const assignmentService = {
  getAll: () => api.get('/assignments'),
  create: (assignmentData) => api.post('/assignments', assignmentData),
  getById: (id) => api.get(`/assignments/${id}`),
  update: (id, assignmentData) => api.put(`/assignments/${id}`, assignmentData),
  delete: (id) => api.delete(`/assignments/${id}`),
  getByCourse: (courseId) => api.get(`/assignments/course/${courseId}`),
  getByUser: (userId) => api.get(`/assignments/user/${userId}`),
  submit: (id, submissionData) => api.post(`/assignments/${id}/submit`, submissionData),
};

// Live Class Services
export const liveClassService = {
  getAll: () => api.get('/live-classes'),
  create: (liveClassData) => api.post('/live-classes', liveClassData),
  getById: (id) => api.get(`/live-classes/${id}`),
  update: (id, liveClassData) => api.put(`/live-classes/${id}`, liveClassData),
  delete: (id) => api.delete(`/live-classes/${id}`),
  getByCourse: (courseId) => api.get(`/live-classes/course/${courseId}`),
  getUpcoming: () => api.get('/live-classes/upcoming'),
  join: (id) => api.post(`/live-classes/${id}/join`),
};

// Announcement Services
export const announcementService = {
  getAll: () => api.get('/announcements'),
  create: (announcementData) => api.post('/announcements', announcementData),
  getById: (id) => api.get(`/announcements/${id}`),
  update: (id, announcementData) => api.put(`/announcements/${id}`, announcementData),
  delete: (id) => api.delete(`/announcements/${id}`),
  getByCourse: (courseId) => api.get(`/announcements/course/${courseId}`),
};

// Quiz Services
export const quizService = {
  getAll: () => api.get('/quizzes'),
  create: (quizData) => api.post('/quizzes', quizData),
  getById: (id) => api.get(`/quizzes/${id}`),
  update: (id, quizData) => api.put(`/quizzes/${id}`, quizData),
  delete: (id) => api.delete(`/quizzes/${id}`),
  getByCourse: (courseId) => api.get(`/quizzes/course/${courseId}`),
  submit: (id, answers) => api.post(`/quizzes/${id}/submit`, answers),
  getResults: (id) => api.get(`/quizzes/${id}/results`),
};

// Discussion Services
export const discussionService = {
  getAll: () => api.get('/discussions'),
  create: (discussionData) => api.post('/discussions', discussionData),
  getById: (id) => api.get(`/discussions/${id}`),
  getByCourse: (courseId) => api.get(`/discussions/course/${courseId}`),
  addComment: (id, commentData) => api.post(`/discussions/${id}/comments`, commentData),
};

// In services/api.js
export const testBackendConnection = async () => {
  try {
    const response = await api.get('/auth/test');
    return "Backend connected successfully";
  } catch (error) {
    console.error('Backend connection error:', error);
    return "Backend connection failed";
  }
};


export default api;