import React, { useState } from 'react';
import './CertificateForm.css';

function CertificateForm({ onGenerate }) {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ name, course, date });
    setName('');
    setCourse('');
    setDate('');
  };

  return (
    <div className="form-container">
      <h2>Fill in the Certificate Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipient's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Course Title"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Generate Certificate</button>
      </form>
    </div>
  );
}

export default CertificateForm;
