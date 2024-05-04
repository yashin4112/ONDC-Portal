import React, { useState } from 'react';
import api from '../services/api';

function CatalogItemForm() {
  const [sellerId, setSellerId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState('');
  const [mrp, setMrp] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/catalog', {
        sellerId,
        name,
        description,
        sku,
        mrp,
        unitOfMeasure,
        image,
      });
      alert('Catalog item created successfully');
      setSellerId('');
      setName('');
      setDescription('');
      setSku('');
      setMrp('');
      setUnitOfMeasure('');
      setImage('');
    } catch (error) {
      console.error('Error creating catalog item:', error);
    }
  };

  return (
    <div>
      <h2>Create Catalog Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sellerId">Seller ID:</label>
          <input
            type="text"
            id="sellerId"
            value={sellerId}
            onChange={(e) => setSellerId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sku">SKU:</label>
          <input
            type="text"
            id="sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="mrp">MRP:</label>
          <input
            type="number"
            id="mrp"
            value={mrp}
            onChange={(e) => setMrp(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="unitOfMeasure">Unit of Measure:</label>
          <input
            type="text"
            id="unitOfMeasure"
            value={unitOfMeasure}
            onChange={(e) => setUnitOfMeasure(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Create Catalog Item</button>
      </form>
    </div>
  );
}

export default CatalogItemForm;
