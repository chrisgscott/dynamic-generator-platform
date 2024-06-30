// frontend/src/components/admin/SubmissionDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubmissionDetails } from '../../utils/api';
import LoadingSpinner from '../common/LoadingSpinner';

function SubmissionDetails() {
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchSubmissionDetails();
  }, [id]);

  const fetchSubmissionDetails = async () => {
    setIsLoading(true);
    try {
      const data = await getSubmissionDetails(id);
      setSubmission(data);
    } catch (error) {
      console.error('Error fetching submission details:', error);
      setError('Failed to fetch submission details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error" role="alert">{error}</div>;
  if (!submission) return <div>Submission not found</div>;

  return (
    <div className="submission-details">
      <h2>Submission Details</h2>
      <Link to="/admin">Back to Dashboard</Link>
      <h3>Input Data</h3>
      <pre>{JSON.stringify(submission.inputData, null, 2)}</pre>
      <h3>Output Data</h3>
      <pre>{JSON.stringify(submission.outputData, null, 2)}</pre>
      {submission.actionPlan && (
        <>
          <h3>Action Plan</h3>
          <pre>{JSON.stringify(submission.actionPlan, null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default SubmissionDetails;