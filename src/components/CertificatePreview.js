import React, { forwardRef } from 'react';
import './CertificatePreview.css';

const CertificatePreview = forwardRef(({ name, course, date }, ref) => {
  return (
    <div className="certificate" ref={ref}>
      <h1>Certificate of Completion</h1>
      <p>This certificate is proudly presented to</p>
      <h2>{name || 'John Doe'}</h2>
      <p>for successfully completing the</p>
      <h3>{course || 'Awesome Course'}</h3>
      <p>on</p>
      <p className="date">{date || '01 August 2025'}</p>
    </div>
  );
});

export default CertificatePreview;
