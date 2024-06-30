// frontend/src/components/admin/GeneratorBuilder.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createGenerator } from '../../utils/api';
import LoadingSpinner from '../common/LoadingSpinner';

function GeneratorBuilder() {
  const [generatorName, setGeneratorName] = useState('');
  const [inputFields, setInputFields] = useState([{ name: '', type: 'text' }]);
  const [outputFields, setOutputFields] = useState([{ name: '', type: 'text' }]);
  const [promptTemplate, setPromptTemplate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const addField = (setterFunction) => {
    setterFunction(prevFields => [...prevFields, { name: '', type: 'text' }]);
  };

  const updateField = (index, key, value, setterFunction) => {
    setterFunction(prevFields => {
      const newFields = [...prevFields];
      newFields[index][key] = value;
      return newFields;
    });
  };

  const isFormValid = () => {
    return (
      generatorName.trim() !== '' &&
      inputFields.every(field => field.name.trim() !== '') &&
      outputFields.every(field => field.name.trim() !== '') &&
      promptTemplate.trim() !== ''
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await createGenerator({ 
        name: generatorName, 
        inputFields, 
        outputFields, 
        promptTemplate 
      });
      history.push('/admin');
    } catch (error) {
      console.error('Error creating generator:', error);
      setError('Failed to create generator. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Create new generator">
      <h2>Create New Generator</h2>
      {error && <div role="alert" className="error">{error}</div>}
      <div>
        <label htmlFor="generator-name">Generator Name:</label>
        <input
          id="generator-name"
          type="text"
          value={generatorName}
          onChange={(e) => setGeneratorName(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <h3>Input Fields:</h3>
      {inputFields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            value={field.name}
            onChange={(e) => updateField(index, 'name', e.target.value, setInputFields)}
            placeholder="Field name"
            required
            aria-required="true"
          />
          <select
            value={field.type}
            onChange={(e) => updateField(index, 'type', e.target.value, setInputFields)}
            required
            aria-required="true"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="select">Select</option>
          </select>
        </div>
      ))}
      <button type="button" onClick={() => addField(setInputFields)}>Add Input Field</button>
      
      <h3>Output Fields:</h3>
      {outputFields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            value={field.name}
            onChange={(e) => updateField(index, 'name', e.target.value, setOutputFields)}
            placeholder="Field name"
            required
            aria-required="true"
          />
          <select
            value={field.type}
            onChange={(e) => updateField(index, 'type', e.target.value, setOutputFields)}
            required
            aria-required="true"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="array">Array</option>
          </select>
        </div>
      ))}
      <button type="button" onClick={() => addField(setOutputFields)}>Add Output Field</button>

      <div>
        <label htmlFor="prompt-template">Prompt Template:</label>
        <textarea
          id="prompt-template"
          value={promptTemplate}
          onChange={(e) => setPromptTemplate(e.target.value)}
          placeholder="Enter your prompt template here. Use {field_name} to reference input fields."
          rows="5"
          required
          aria-required="true"
        />
      </div>
      <button type="submit" disabled={isLoading || !isFormValid()}>
        {isLoading ? <LoadingSpinner /> : 'Create Generator'}
      </button>
    </form>
  );
}

export default GeneratorBuilder;