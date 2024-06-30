// frontend/src/components/admin/EditGenerator.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGenerator, updateGenerator } from '../../utils/api';
import LoadingSpinner from '../common/LoadingSpinner';

function EditGenerator() {
  const [generator, setGenerator] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenerator = async () => {
      try {
        const data = await getGenerator(id);
        setGenerator(data);
      } catch (error) {
        console.error('Error fetching generator:', error);
        setError('Failed to fetch generator');
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenerator();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGenerator({ ...generator, [name]: value });
  };

  const handleFieldChange = (index, key, value, fieldType) => {
    const updatedFields = [...generator[fieldType]];
    updatedFields[index][key] = value;
    setGenerator({ ...generator, [fieldType]: updatedFields });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await updateGenerator(id, generator);
      navigate('/admin');
    } catch (error) {
      console.error('Error updating generator:', error);
      setError('Failed to update generator');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error" role="alert">{error}</div>;
  if (!generator) return <div>Generator not found</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Generator: {generator.name}</h2>
      <div>
        <label htmlFor="name">Generator Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={generator.name}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <h3>Input Fields:</h3>
      {generator.inputFields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            value={field.name}
            onChange={(e) => handleFieldChange(index, 'name', e.target.value, 'inputFields')}
            placeholder="Field name"
            required
          />
          <select
            value={field.type}
            onChange={(e) => handleFieldChange(index, 'type', e.target.value, 'inputFields')}
            required
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="select">Select</option>
          </select>
        </div>
      ))}

      <h3>Output Fields:</h3>
      {generator.outputFields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            value={field.name}
            onChange={(e) => handleFieldChange(index, 'name', e.target.value, 'outputFields')}
            placeholder="Field name"
            required
          />
          <select
            value={field.type}
            onChange={(e) => handleFieldChange(index, 'type', e.target.value, 'outputFields')}
            required
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="array">Array</option>
          </select>
        </div>
      ))}

      <div>
        <label htmlFor="promptTemplate">Prompt Template:</label>
        <textarea
          id="promptTemplate"
          name="promptTemplate"
          value={generator.promptTemplate}
          onChange={handleInputChange}
          rows="5"
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : 'Update Generator'}
      </button>
    </form>
  );
}

export default EditGenerator;