// frontend/src/components/CTA.js
import React from 'react';
import { CTA_HEADLINE, CTA_DESCRIPTION, CTA_BUTTON_TEXT, CTA_BUTTON_URL } from '../config/constants';
import '../styles/CTA.css';

function CTA() {
  return (
    <section className="cta-section">
      <h2>{CTA_HEADLINE}</h2>
      <p>{CTA_DESCRIPTION}</p>
      <a href={CTA_BUTTON_URL} className="cta-button" target="_blank" rel="noopener noreferrer">
        {CTA_BUTTON_TEXT}
      </a>
    </section>
  );
}

export default CTA;