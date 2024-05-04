import { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';
import ProductForm from './ProductForm';

function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        // Fetch seller's products from the database
        const fetchProducts = async () => {
            const productsCollection = collection(fireDB, 'products');
            const snapshot = await getDocs(productsCollection);
            const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsData);
        };

        fetchProducts();
    }, []);

    const deleteProduct = async (productId) => {
        try {
            await deleteDoc(doc(fireDB, 'products', productId));
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error("Error deleting product: ", error);
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setShowForm(true);
    };

    return (
        <div className="container mx-auto flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
                onClick={() => setShowForm(true)}>Add Product</button>

            {showForm && <ProductForm setShowForm={setShowForm} editProduct={editProduct} />}

            <div className="overflow-x-auto w-full">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">SKU</th>
                            <th className="px-4 py-2">MRP</th>
                            <th className="px-4 py-2">Unit of Measure</th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="border px-4 py-2">{product.name}</td>
                                <td className="border px-4 py-2">{product.description}</td>
                                <td className="border px-4 py-2">{product.categoryId}</td>
                                <td className="border px-4 py-2">{product.sku}</td>
                                <td className="border px-4 py-2">{product.mrp}</td>
                                <td className="border px-4 py-2">{product.unitOfMeasure}</td>
                                <td className="border px-4 py-2"><img src={product.image} alt={product.name} className="w-16 h-16 object-cover" /></td>
                                <td className="border px-4 py-2">
                                    <button 
                                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                        onClick={() => handleEdit(product)}>Edit</button>
                                    <button 
                                        className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                                        onClick={() => deleteProduct(product.id)}>Delete</button>
                                    {/* Add edit/update functionality here */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageProduct;
