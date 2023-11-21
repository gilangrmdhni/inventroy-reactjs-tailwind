import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import FormEditProduct from './FormEditProduct';

Modal.setAppElement('#root');

function ProductList() {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []); 

    const handleEdit = (productId) => {
        setSelectedProductId(productId);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedProductId(null);
        setIsModalOpen(false);
    };

    const handleSaveProduct = () => {
        fetchData(); // Panggil fetchData untuk memuat ulang data setelah penyimpanan sukses
    };

    const handleDelete = async (productId) => {
        const shouldDelete = window.confirm('Yakin ingin menghapus produk ini?');

        if (!shouldDelete) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/products/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Product with id ${productId} deleted successfully!`);
                // Remove the deleted product from the state
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
            } else {
                console.error(`Failed to delete product with id ${productId}:`, response.statusText);
            }
        } catch (error) {
            console.error(`Error deleting product with id ${productId}:`, error);
        }
    };
    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Daftar Produk</h1>
                <Link to="/product-form" className="bg-green-500 text-white px-3 py-1 rounded-md">
                    Tambah Produk
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b text-center">Nama</th>
                            <th className="py-2 px-4 border-b text-center">SKU</th>
                            <th className="py-2 px-4 border-b text-center">Brand</th>
                            <th className="py-2 px-4 border-b text-center">Variasi</th>
                            <th className="py-2 px-4 border-b text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition">
                                <td className="py-3 px-4 border-b text-center">{product.name}</td>
                                <td className="py-3 px-4 border-b text-center">{product.sku}</td>
                                <td className="py-3 px-4 border-b text-center">{product.brand}</td>
                                <td className="py-3 px-4 border-b text-center">
                                    {product.variations.map((variation, index) => (
                                        <div key={index}>
                                            <strong>{variation.name}:</strong> {variation.sku}, Harga: {variation.price}
                                        </div>
                                    ))}
                                </td>
                                <td className="py-3 px-4 border-b space-x-2 text-center">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                        onClick={() => handleEdit(product.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Modal untuk Edit */}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={handleModalClose}
                    contentLabel="Edit Product Modal"
                >
                    {/* Render komponen FormEditProduct di dalam modal */}
                    <FormEditProduct
                        productId={selectedProductId}
                        onClose={handleModalClose}
                        onSave={handleSaveProduct}
                    />
                </Modal>
            </div>
        </div>
    );
}

export default ProductList;
