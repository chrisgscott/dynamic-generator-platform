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
      <div className="App">
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/admin" component={AdminDashboard} />
          <PrivateRoute path="/create-generator" component={GeneratorBuilder} />
          <PrivateRoute path="/edit-generator/:id" component={EditGenerator} />
          <PrivateRoute path="/admin/submissions/:id" component={SubmissionsList} />
          <PrivateRoute path="/admin/submission/:id" component={SubmissionDetails} />
          <PrivateRoute path="/admin/error-logs" component={ErrorLogs} />
          <Route path="/generate/:id" component={DynamicForm} />
          <Route path="/results/:id" component={Results} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;