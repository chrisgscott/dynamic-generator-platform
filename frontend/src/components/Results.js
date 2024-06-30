// frontend/src/components/Results.js
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getResult, unlockActionPlan } from '../utils/api';
import LoadingSpinner from './common/LoadingSpinner';

function Results() {
  const [result, setResult] = useState(null);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      try {
        const data = await getResult(id);
        setResult(data);
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while fetching the result.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  const handleShare = () => {
    const shareLink = `${window.location.origin}/results/${id}`;
    navigator.clipboard.writeText(shareLink).then(() => {
      alert('Share link copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
      alert('Failed to copy share link. Please try again.');
    });
  };

  const handleRestart = () => {
    history.push('/');
  };

  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setIsUnlocking(true);
    setError('');
    try {
      const actionPlan = await unlockActionPlan(email, id);
      setResult(prevResult => ({ ...prevResult, actionPlan }));
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while unlocking the action plan.');
    } finally {
      setIsUnlocking(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error" role="alert">{error}</div>;
  if (!result) return <div>No result found.</div>;

  return (
    <div className="results-container">
      <header>
        <h1>Your Generated Result 🚀</h1>
        <div className="header-buttons">
          <button className="restart-button" onClick={handleRestart}>Restart</button>
          <button className="share-button" onClick={handleShare}>Share link</button>
        </div>
      </header>

      <section className="generated-content">
        <h2>Generated Content</h2>
        {Object.entries(result.outputData).map(([key, value]) => (
          <div key={key}>
            <h3>{key}</h3>
            <p>{Array.isArray(value) ? value.join(', ') : value}</p>
          </div>
        ))}
      </section>

      {!result.actionPlan && (
        <section className="action-plan">
          <h2>Unlock Action Plan</h2>
          <form onSubmit={handleUnlock} className="email-form">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              aria-required="true"
            />
            <button type="submit" disabled={isUnlocking || !isValidEmail(email)}>
              {isUnlocking ? <LoadingSpinner /> : 'Unlock for FREE'}
            </button>
          </form>
        </section>
      )}

      {result.actionPlan && (
        <section className="action-plan">
          <h2>Action Plan</h2>
          <pre>{JSON.stringify(result.actionPlan, null, 2)}</pre>
        </section>
      )}
    </div>
  );
}

export default Results;