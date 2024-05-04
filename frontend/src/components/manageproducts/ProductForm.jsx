import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductForm({ setShowForm, editProduct }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [sku, setSku] = useState('');
    const [mrp, setMrp] = useState('');
    const [unitOfMeasure, setUnitOfMeasure] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (editProduct) {
            setName(editProduct.name);
            setDescription(editProduct.description);
            setCategoryId(editProduct.categoryId);
            setSku(editProduct.sku);
            setMrp(editProduct.mrp);
            setUnitOfMeasure(editProduct.unitOfMeasure);
            // Set image if available
            // setImage(editProduct.image); // You may not want to pre-fill the image field
        }
    }, [editProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('categoryId', categoryId);
        formData.append('sku', sku);
        formData.append('mrp', mrp);
        formData.append('unitOfMeasure', unitOfMeasure);
        formData.append('image', image);

        try {
            let response;
            if (editProduct) {
                response = await axios.put(`YOUR_BACKEND_URL/products/${editProduct.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                response = await axios.post('YOUR_BACKEND_URL/products', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            setShowForm(false);
        } catch (error) {
            console.error('Error adding/editing product:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-full">
            <div className="container mx-auto">
                <h2 className="text-xl font-bold mb-2">{editProduct ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmit} className="max-w-lg">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="block w-full border border-gray-300 rounded px-4 py-2 mb-2" required />
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="block w-full border border-gray-300 rounded px-4 py-2 mb-2" required />
                    <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder="Category ID" className="block w-full border border-gray-300 rounded px-4 py-2 mb-2" required />
                    <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="SKU" className="block w-full border border-gray-300 rounded px-4 py-2 mb-2" required />
                    <input type="number" value={mrp} onChange={(e) => setMrp(e.target.value)} placeholder="MRP" className="block w-full border border-gray-300 rounded px-4 py-2 mb-2" required />
                    <input type="text" value={unitOfMeasure} onChange={(e) => setUnitOfMeasure(e.target.value)} placeholder="No of Items" className="block w-full border border-gray-300 rounded px-4 py-2 mb-2" required />
                    <h5>{editProduct ? 'Change Image' : 'Add Image Of item'}</h5>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} className="block w-full border border-gray-300 rounded px-4 py-2 mb-2" required />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{editProduct ? 'Save Changes' : 'Add'}</button>
                </form>
            </div>
        </div>
    );
}

export default ProductForm;
