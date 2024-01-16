import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FirstPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Save user details to local storage
    localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));

    // Route to the second page
    navigate('/second');
  };

  return (
    <div>
      <h2>First Page</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Phone:</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FirstPage;
