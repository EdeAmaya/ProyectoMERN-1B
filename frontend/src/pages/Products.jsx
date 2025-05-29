import React, { useState } from "react";
import ListProducts from "../components/Products/ListProducts";
import RegisterProduct from "../components/Products/RegisterProduct";
import toast, { Toaster } from 'react-hot-toast';
import useDataProducts from "../components/Products/hooks/useDataProducts";

const Products = () => {
  const [activeTab, setActiveTab] = useState("list");
  
  // Usar el hook personalizado para manejar los productos
  const {
    products,
    loading,
    id,
    name,
    description,
    price,
    stock,
    setName,
    setDescription,
    setPrice,
    setStock,
    saveProduct,
    deleteProduct,
    updateProduct,
    handleEdit,
    clearForm
  } = useDataProducts();

  // Función para cambiar a la pestaña de formulario y limpiar
  const handleNewProduct = () => {
    clearForm();
    setActiveTab("form");
  };

  // Función para editar producto
  const handleEditProduct = (product) => {
    updateProduct(product);
    setActiveTab("form");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Header decorativo estilo verde */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white py-8 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white text-green-700 p-4 rounded-full shadow-lg">
              <span className="text-3xl">🥤</span>
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-wide drop-shadow-lg">
                Gestión de Productos Coca-Cola
              </h1>
              <p className="text-green-200 text-lg font-medium mt-1">
                Administra tu inventario de productos refrescantes
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 -mt-4">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-4 border-green-100">
          {/* Pestañas mejoradas estilo verde */}
          <div className="bg-gradient-to-r from-gray-50 to-green-50 border-b-2 border-green-200">
            <div className="flex">
              <button
                className={`flex-1 px-6 py-4 font-bold text-lg transition-all duration-300 relative ${
                  activeTab === "list"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105 z-10"
                    : "text-green-700 hover:bg-green-100 hover:text-green-800"
                }`}
                onClick={() => setActiveTab("list")}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">📦</span>
                  <span>Lista de Productos</span>
                </div>
                {activeTab === "list" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 rounded-t-full"></div>
                )}
              </button>
              
              <button
                className={`flex-1 px-6 py-4 font-bold text-lg transition-all duration-300 relative ${
                  activeTab === "form"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105 z-10"
                    : "text-green-700 hover:bg-green-100 hover:text-green-800"
                }`}
                onClick={handleNewProduct}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">{id ? '✏️' : '➕'}</span>
                  <span>{id ? 'Editar Producto' : 'Nuevo Producto'}</span>
                </div>
                {activeTab === "form" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 rounded-t-full"></div>
                )}
              </button>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-8">
            {activeTab === "list" && (
              <div className="animate-fadeIn">
                <ListProducts
                  products={products}
                  loading={loading}
                  deleteProduct={deleteProduct}
                  updateProduct={handleEditProduct}
                />
              </div>
            )}
            
            {activeTab === "form" && (
              <div className="animate-fadeIn">
                <RegisterProduct
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                  price={price}
                  setPrice={setPrice}
                  stock={stock}
                  setStock={setStock}
                  saveProduct={saveProduct}
                  id={id}
                  handleEdit={handleEdit}
                  onCancel={() => {
                    clearForm();
                    setActiveTab("list");
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Elementos decorativos de fondo estilo verde */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-300 rounded-full blur-2xl opacity-25 animate-pulse delay-500"></div>
      </div>

      {/* Toast container con colores verdes */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#16a34a',
            color: '#fff',
            border: '2px solid #fbbf24',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(22, 163, 74, 0.3)',
          },
          success: {
            style: {
              background: '#16a34a',
            },
          },
          error: {
            style: {
              background: '#dc2626',
            },
          },
        }}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Products;