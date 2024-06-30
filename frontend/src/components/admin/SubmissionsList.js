// frontend/src/components/admin/SubmissionsList.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubmissions } from '../../utils/api';
import LoadingSpinner from '../common/LoadingSpinner';

function SubmissionsList() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchSubmissions();
  }, [id]);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const data = await getSubmissions(id);
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError('Failed to fetch submissions');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error" role="alert">{error}</div>;

  return (
    <div className="submissions-list">
      <h2>Submissions for Generator {id}</h2>
      <Link to="/admin">Back to Dashboard</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(submission => (
            <tr key={submission.id}>
              <td>{submission.id}</td>
              <td>{new Date(submission.created_at).toLocaleString()}</td>
              <td>
                <Link to={`/admin/submission/${submission.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubmissionsList;