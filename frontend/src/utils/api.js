// frontend/src/utils/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
const ADMIN_BASE_URL = process.env.REACT_APP_ADMIN_BASE_URL || 'http://localhost:3001/admin';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const adminApi = axios.create({
  baseURL: ADMIN_BASE_URL,
});

// Set the AUTH token for any request
adminApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export const login = async (username, password) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};

export const createGenerator = async (generatorData) => {
  const response = await adminApi.post('/generators', generatorData);
  return response.data;
};

export const getGenerators = async () => {
  const response = await adminApi.get('/generators');
  return response.data;
};

export const getGenerator = async (id) => {
  const response = await adminApi.get(`/generators/${id}`);
  return response.data;
};

export const updateGenerator = async (id, generatorData) => {
  const response = await adminApi.put(`/generators/${id}`, generatorData);
  return response.data;
};

export const deleteGenerator = async (id) => {
  const response = await adminApi.delete(`/generators/${id}`);
  return response.data;
};

export const generateResult = async (generatorId, inputData) => {
  const response = await api.post('/generate', { generatorId, ...inputData });
  return response.data;
};

export const getResult = async (id) => {
  const response = await api.get(`/result/${id}`);
  return response.data;
};

export const unlockActionPlan = async (email, uniqueIdentifier) => {
  const response = await api.post('/unlock-action-plan', { email, uniqueIdentifier });
  return response.data.actionPlan;
};

export const getSubmissions = async (generatorId) => {
  const response = await adminApi.get(`/submissions/${generatorId}`);
  return response.data;
};

export const getSubmissionDetails = async (submissionId) => {
  const response = await adminApi.get(`/submission/${submissionId}`);
  return response.data;
};

export const getErrorLogs = async () => {
  const response = await adminApi.get('/error-logs');
  return response.data;
};

export const clearErrorLogs = async () => {
  const response = await adminApi.post('/clear-error-logs');
  return response.data;
};