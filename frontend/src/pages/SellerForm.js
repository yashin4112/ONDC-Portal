// Component for seller form
import React, { useState } from 'react';
import api from '../services/api';

function SellerForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/sellers', {
        name,
        email,
        phoneNumber,
        address,
      });
      alert('Seller created successfully');
      setName('');
      setEmail('');
      setPhoneNumber('');
      setAddress('');
    } catch (error) {
      console.error('Error creating seller:', error);
    }
  };

  return (
    <div>
      <h2>Create Seller</h2>
      <form onSubmit={handleSubmit}>
        {/* Seller input fields */}
      </form>
    </div>
  );
}

export default SellerForm;
