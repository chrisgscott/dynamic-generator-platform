// frontend/src/components/admin/ErrorLogs.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getErrorLogs, clearErrorLogs } from '../../utils/api';
import LoadingSpinner from '../common/LoadingSpinner';

function ErrorLogs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchErrorLogs();
  }, []);

  const fetchErrorLogs = async () => {
    setIsLoading(true);
    try {
      const data = await getErrorLogs();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching error logs:', error);
      setError('Failed to fetch error logs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearLogs = async () => {
    if (window.confirm('Are you sure you want to clear all error logs?')) {
      setIsLoading(true);
      try {
        await clearErrorLogs();
        setLogs([]);
      } catch (error) {
        console.error('Error clearing error logs:', error);
        setError('Failed to clear error logs');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error" role="alert">{error}</div>;

  return (
    <div className="error-logs">
      <h2>Error Logs</h2>
      <Link to="/admin">Back to Dashboard</Link>
      <button onClick={handleClearLogs}>Clear Logs</button>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Error Message</th>
            <th>Stack Trace</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.message}</td>
              <td>
                <pre>{log.stack}</pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ErrorLogs;