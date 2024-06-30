// frontend/src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGenerators } from '../utils/api';
import LoadingSpinner from './common/LoadingSpinner';

function Home() {
  const [generators, setGenerators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGenerators = async () => {
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

    fetchGenerators();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <h1>Dynamic Generator Platform</h1>
      <h2>Available Generators</h2>
      <ul>
        {generators.map(generator => (
          <li key={generator.id}>
            <Link to={`/generate/${generator.id}`}>{generator.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/login">Admin Login</Link>
    </div>
  );
}

export default Home;