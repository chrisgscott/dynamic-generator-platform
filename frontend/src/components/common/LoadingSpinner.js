// frontend/src/components/common/LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-spinner" aria-label="Loading">
      <div className="spinner"></div>
    </div>
  );
}

export default LoadingSpinner;