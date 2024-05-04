// Component for searching catalog
import React, { useState } from 'react';
import api from '../services/api';

function SearchCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/catalog/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching catalog:', error);
    }
  };

  return (
    <div>
      <h2>Search Catalog</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map(item => (
          <li key={item._id}>
            <div>Name: {item.name}</div>
            <div>Description: {item.description}</div>
            <div>SKU: {item.sku}</div>
            <div>MRP: {item.mrp}</div>
            <div>Unit of Measure: {item.unitOfMeasure}</div>
            {/* Display other item details */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchCatalog;
