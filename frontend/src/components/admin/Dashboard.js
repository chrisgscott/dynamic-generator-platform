// frontend/src/components/admin/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGenerators, deleteGenerator } from '../../utils/api';
import LoadingSpinner from '../common/LoadingSpinner';

function AdminDashboard() {
  const [generators, setGenerators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGenerators();
  }, []);

  const fetchGenerators = async () => {
    setIsLoading(true);
    try {
      const data = await getGenerators();
      setGenerators(data);
    } catch (error) {
      console.error('Error fetching generators:', error);
      setError('Failed to fetch generators');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, isDefault) => {
    if (isDefault) {
      alert('Cannot delete a default generator');
      return;
    }

    if (window.confirm('Are you sure you want to delete this generator?')) {
      try {
        await deleteGenerator(id);
        fetchGenerators();
      } catch (error) {
        console.error('Error deleting generator:', error);
        setError('Failed to delete generator');
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error" role="alert">{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/create-generator">Create New Generator</Link></li>
          <li><Link to="/admin/error-logs">View Error Logs</Link></li>
        </ul>
      </nav>
      <h2>Existing Generators</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {generators.map(generator => (
            <tr key={generator.id}>
              <td>{generator.name} {generator.is_default && '(Default)'}</td>
              <td>
                <Link to={`/generate/${generator.id}`}>Use</Link>
                <Link to={`/edit-generator/${generator.id}`}>Edit</Link>
                <Link to={`/admin/submissions/${generator.id}`}>View Submissions</Link>
                <button 
                  onClick={() => handleDelete(generator.id, generator.is_default)}
                  disabled={generator.is_default}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;