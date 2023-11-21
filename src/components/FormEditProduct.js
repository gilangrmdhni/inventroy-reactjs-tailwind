import React, { useState, useEffect } from 'react';

const FormEditProduct = ({ productId, onClose, onSave }) => {
  const [product, setProduct] = useState({
    name: '',
    sku: '',
    brand: '',
    description: '',
    variations: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [productId]);

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
    try {
      const url = `http://localhost:3001/products/${productId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        console.log('Product updated successfully!');
        onSave(); // Panggil fungsi onSave untuk memuat ulang data setelah penyimpanan sukses
        onClose(); // Tutup modal setelah penyimpanan sukses
      } else {
        console.error('Failed to update product:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <label className="block text-sm font-medium text-gray-700">Name:</label>
      <input
        type="text"
        value={product.name}
        onChange={(e) => handleFormChange('name', e.target.value)}
        className="w-full border p-2 mb-2"
      />
      <label className="block text-sm font-medium text-gray-700">SKU:</label>
      <input
        type="text"
        value={product.sku}
        onChange={(e) => handleFormChange('sku', e.target.value)}
        className="w-full border p-2 mb-2"
      />
      <label className="block text-sm font-medium text-gray-700">Brand:</label>
      <select
        value={product.brand}
        onChange={(e) => handleFormChange('brand', e.target.value)}
        className="w-full border p-2 mb-2"
      >
        <option value="">Choose Brand</option>
        <option value="Brand A">Brand A</option>
        <option value="Brand B">Brand B</option>
      </select>
      <label className="block text-sm font-medium text-gray-700">Description:</label>
      <textarea
        value={product.description}
        onChange={(e) => handleFormChange('description', e.target.value)}
        className="w-full border p-2 mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">Variations:</h3>
      {product.variations.map((variation, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Variation {index + 1}</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={variation.name}
              onChange={(e) => handleVariationChange(index, 'name', e.target.value)}
              placeholder="Name"
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
              placeholder="Price"
              className="w-1/3 border p-2"
            />
            <button
              onClick={() => handleRemoveVariation(index)}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={handleAddVariation}
        className="bg-blue-500 text-white px-3 py-1 rounded-md"
      >
        Add Variation
      </button>
      <div className="mt-4 space-x-2">
        <button onClick={saveProduct} className="bg-green-500 text-white px-4 py-2 rounded-md">
          Save
        </button>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FormEditProduct;