// frontend/src/components/DynamicForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getGenerator, generateResult } from '../utils/api';
import LoadingSpinner from './common/LoadingSpinner';

function DynamicForm() {
  const [generator, setGenerator] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchGenerator = async () => {
      setIsLoading(true);
      try {
        const data = await getGenerator(id);
        setGenerator(data);
        const initialData = {};
        data.inputFields.forEach(field => {
          initialData[field.name] = '';
        });
        setFormData(initialData);
      } catch (error) {
        console.error('Error fetching generator:', error);
        setError('Failed to load generator. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenerator();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError('Please fill in all fields');
      return;
    }
    setIsGenerating(true);
    setError('');
    try {
      const result = await generateResult(id, formData);
      history.push(`/results/${result.uniqueIdentifier}`);
    } catch (error) {
      console.error('Error generating result:', error);
      setError('Failed to generate result. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div role="alert">{error}</div>;
  if (!generator) return <div>Generator not found</div>;

  return (
    <form onSubmit={handleSubmit} aria-label={`Generate ${generator.name}`}>
      <h2>{generator.name}</h2>
      {error && <div role="alert" className="error">{error}</div>}
      {generator.inputFields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.name}:</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            required
            aria-required="true"
          />
        </div>
      ))}
      <button type="submit" disabled={isGenerating || !isFormValid()}>
        {isGenerating ? <LoadingSpinner /> : 'Generate'}
      </button>
    </form>
  );
}

export default DynamicForm;