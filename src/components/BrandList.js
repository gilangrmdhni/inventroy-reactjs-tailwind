import React, { useState, useEffect } from 'react';

function BrandList() {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3001/brands');
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brand data:', error);
    }
  }

  async function handleDelete(brandId) {
    const shouldDelete = window.confirm('Yakin ingin menghapus merek ini?');

    if (!shouldDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/brands/${brandId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Brand with id ${brandId} deleted successfully!`);
        // Remove the deleted brand from the state
        setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== brandId));
      } else {
        console.error(`Failed to delete brand with id ${brandId}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error deleting brand with id ${brandId}:`, error);
    }
  }

  async function handleAddBrand() {
    // Proses untuk menambah merek baru
    try {
      const response = await fetch('http://localhost:3001/brands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newBrandName }),
      });

      if (response.ok) {
        console.log('Brand added successfully!');
        // Muat ulang data merek setelah penambahan berhasil
        fetchData();
        setNewBrandName(''); // Bersihkan input setelah penambahan berhasil
        setIsModalOpen(false); // Tutup modal setelah penambahan berhasil
      } else {
        console.error('Failed to add brand:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding brand:', error);
    }
  }

  return (
    <div className="container mx-auto mt-8">
      {/* Tombol "Tambah Merek" di kanan atas */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-3 py-1 rounded-md"
        >
          Tambah Merek
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Daftar Merek</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-center">Nama Merek</th>
            <th className="py-2 px-4 border-b text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id} className="hover:bg-gray-50 transition">
              <td className="py-3 px-4 border-b text-center">{brand.name}</td>
              <td className="py-3 px-4 border-b space-x-2 text-center">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                  onClick={() => handleDelete(brand.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form untuk tambah brand */}
      <div
        style={{
          display: isModalOpen ? 'block' : 'none',
          marginTop: '20px',
        }}
      >
        <label className="block mb-2">Nama Merek:</label>
        <input
          type="text"
          value={newBrandName}
          onChange={(e) => setNewBrandName(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={handleAddBrand}
          className="bg-blue-500 text-white px-3 py-1 rounded-md ml-2"
        >
          Tambah
        </button>
      </div>
    </div>
  );
}

export default BrandList;
