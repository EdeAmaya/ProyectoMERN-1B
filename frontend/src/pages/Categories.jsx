import React from "react";
import ListCategories from "../components/Categories/ListCategories";
import RegisterCategory from "../components/Categories/RegisterCategories";
import useDataCategories from "../components/Categories/hooks/useDataCategories";

const Categories = () => {
  const {
    activeTab,
    setActiveTab,
    id,
    nameCategory,
    setNameCategory,
    description,
    setDescription,
    categories,
    loading,
    saveCategory,
    deleteCategory,
    updateCategories,
    handleEdit,
    status,
    setStatus,
    image,
    setImage,
    clearForm
  } = useDataCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
      {/* Header decorativo */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-8 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white text-red-700 p-4 rounded-full shadow-lg">
              <span className="text-3xl">📂</span>
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-wide drop-shadow-lg">
                Gestión de Categorías
              </h1>
              <p className="text-red-200 text-lg font-medium mt-1">
                Administra y organiza tus categorías de productos
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 -mt-4">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-4 border-red-100">
          {/* Pestañas mejoradas */}
          <div className="bg-gradient-to-r from-gray-50 to-red-50 border-b-2 border-red-200">
            <div className="flex">
              <button
                className={`flex-1 px-6 py-4 font-bold text-lg transition-all duration-300 relative ${
                  activeTab === "list"
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform scale-105 z-10"
                    : "text-red-700 hover:bg-red-100 hover:text-red-800"
                }`}
                onClick={() => setActiveTab("list")}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">📋</span>
                  <span>Lista de Categorías</span>
                </div>
                {activeTab === "list" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 rounded-t-full"></div>
                )}
              </button>
              
              <button
                className={`flex-1 px-6 py-4 font-bold text-lg transition-all duration-300 relative ${
                  activeTab === "form"
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform scale-105 z-10"
                    : "text-red-700 hover:bg-red-100 hover:text-red-800"
                }`}
                onClick={() => setActiveTab("form")}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">✏️</span>
                  <span>Gestionar Categorías</span>
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
                <ListCategories
                  categories={categories}
                  loading={loading}
                  deleteCategory={deleteCategory}
                  updateCategories={updateCategories}
                />
              </div>
            )}
            
            {activeTab === "form" && (
              <div className="animate-fadeIn">
                <RegisterCategory
                  setNameCategory={setNameCategory}
                  setDescription={setDescription}
                  saveCategory={saveCategory}
                  nameCategory={nameCategory}
                  description={description}
                  id={id}
                  handleEdit={handleEdit}
                  status={status}
                  setStatus={setStatus}
                  image={image}
                  setImage={setImage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Elementos decorativos de fondo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-300 rounded-full blur-2xl opacity-25 animate-pulse delay-500"></div>
      </div>

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

export default Categories;