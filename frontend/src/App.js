// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import Login from './components/Login';
import AdminDashboard from './components/admin/Dashboard';
import GeneratorBuilder from './components/admin/GeneratorBuilder';
import EditGenerator from './components/admin/EditGenerator';
import SubmissionsList from './components/admin/SubmissionsList';
import SubmissionDetails from './components/admin/SubmissionDetails';
import ErrorLogs from './components/admin/ErrorLogs';
import DynamicForm from './components/DynamicForm';
import Results from './components/Results';
import './styles/App.css';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/generate/:id" element={<DynamicForm />} />
          <Route path="/results/:id" element={<Results />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/create-generator" element={<GeneratorBuilder />} />
            <Route path="/edit-generator/:id" element={<EditGenerator />} />
            <Route path="/admin/submissions/:id" element={<SubmissionsList />} />
            <Route path="/admin/submission/:id" element={<SubmissionDetails />} />
            <Route path="/admin/error-logs" element={<ErrorLogs />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;