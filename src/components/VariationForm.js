// src/components/VariationForm.js
import React from 'react';

function VariationForm({ variation, onChange, onRemove }) {
    return (
        <div className="mb-4 border p-4">
            <h2 className="text-lg font-semibold mb-2">Variation</h2>
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input
                    type="text"
                    value={variation.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    className="w-full border p-2"
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">SKU</label>
                <input
                    type="text"
                    value={variation.sku}
                    onChange={(e) => onChange('sku', e.target.value)}
                    className="w-full border p-2"
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Harga Jual</label>
                <input
                    type="number"
                    value={variation.price}
                    onChange={(e) => onChange('price', e.target.value)}
                    className="w-full border p-2"
                />
            </div>
            <button onClick={onRemove} className="text-red-500">Hapus Variation</button>
        </div>
    );
}

export default VariationForm;
