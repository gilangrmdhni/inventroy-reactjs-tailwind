import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        name: '',
        sku: '',
        brand: '',
        description: '',
        variations: [],
    });

    const [brands, setBrands] = useState([]);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        // Jika ada ID produk, ambil data produk dari API
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/products/${id}`);
                    const data = await response.json();
                    setProduct(data);
                } catch (error) {
                    console.error('Error fetching product data:', error);
                }
            };

            fetchProduct();
        }

        // Ambil data merek dari API
        const fetchBrands = async () => {
            try {
                const response = await fetch('http://localhost:3001/brands');
                const data = await response.json();
                setBrands(data);
            } catch (error) {
                console.error('Error fetching brand data:', error);
            }
        };

        fetchBrands();
    }, [id]);

    const validateForm = () => {
        // Lakukan validasi form di sini
        if (!product.name || !product.sku || !product.brand || !product.description || !product.variations.length) {
            setFormError('Semua bidang harus diisi');
            return false;
        }

        // Validasi tambahan jika diperlukan
        // ...

        return true;
    };

    const handleFormChange = (field, value) => {
        setProduct({ ...product, [field]: value });
    };

    const handleVariationChange = (index, field, value) => {
        const updatedVariations = [...product.variations];
        updatedVariations[index][field] = value;
        setProduct({ ...product, variations: updatedVariations });
    };

    const handleAddVariation = () => {
        setProduct({
            ...product,
            variations: [...product.variations, { name: '', sku: '', price: 0 }],
        });
    };

    const handleRemoveVariation = (index) => {
        const updatedVariations = [...product.variations];
        updatedVariations.splice(index, 1);
        setProduct({ ...product, variations: updatedVariations });
    };

    const saveProduct = async () => {
        if (!validateForm()) {
            return; // Tidak melanjutkan penyimpanan jika form tidak valid
        }

        try {
            const url = id ? `http://localhost:3001/products/${id}` : 'http://localhost:3001/products';
            const method = id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                console.log(id ? 'Product updated successfully!' : 'Product added successfully!');
                // Reset the form after successful addition or update
                setProduct({
                    name: '',
                    sku: '',
                    brand: '',
                    description: '',
                    variations: [],
                });

                // Navigate to the product-list page
                navigate('/product-list');
            } else {
                console.error('Failed to save product:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <div className="container mx-auto mt-8 product-form-container">

            <button className="text-2xl font-bold mb-4">{id ? 'Edit Produk' : 'Tambah Produk'}</button>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    className="w-full border p-2"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">SKU</label>
                <input
                    type="text"
                    value={product.sku}
                    onChange={(e) => handleFormChange('sku', e.target.value)}
                    className="w-full border p-2"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Brand</label>
                <select
                    value={product.brand}
                    onChange={(e) => handleFormChange('brand', e.target.value)}
                    className="w-full border p-2"
                >
                    <option value="">Pilih Brand</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.name}>
                            {brand.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                <ReactQuill
                    value={product.description}
                    onChange={(value) => handleFormChange('description', value)}
                />
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Variasi Produk</h2>
                {product.variations.map((variation, index) => (
                    <div key={index} className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Variasi {index + 1}</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={variation.name}
                                onChange={(e) => handleVariationChange(index, 'name', e.target.value)}
                                placeholder="Nama"
                                className="w-1/3 border p-2"
                            />
                            <input
                                type="text"
                                value={variation.sku}
                                onChange={(e) => handleVariationChange(index, 'sku', e.target.value)}
                                placeholder="SKU"
                                className="w-1/3 border p-2"
                            />
                            <input
                                type="number"
                                value={variation.price}
                                onChange={(e) => handleVariationChange(index, 'price', e.target.value)}
                                placeholder="Harga Jual"
                                className="w-1/3 border p-2"
                            />
                            <button onClick={() => handleRemoveVariation(index)}>Hapus</button>
                        </div>
                    </div>
                ))}
                <button  className="bg-blue-500 text-white p-2 rounded-md" onClick={handleAddVariation}>Tambah Variasi</button>
            </div>
            {formError && <p className="text-red-500 mb-4">{formError}</p>}

            <button className="bg-green-500 text-white p-2 rounded-md" onClick={saveProduct}>
                {id ? 'Update Produk' : 'Simpan Produk'}
            </button>
        </div>
    );
};

export default ProductForm;
