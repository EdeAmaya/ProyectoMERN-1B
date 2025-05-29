import React from "react";
import Button from "../Button";

const CategoryCard = ({ category, deleteCategory, updateCategories }) => {
  return (
    <div className="group max-w-sm mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border-4 border-red-100 hover:border-red-300 transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
      {/* Imagen con overlay decorativo */}
      <div className="relative">
        {category.image ? (
          <div className="h-52 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center relative overflow-hidden">
            <img 
              src={category.image} 
              alt={category.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ) : (
          <div className="h-52 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center relative">
            <div className="text-white text-6xl opacity-80">📂</div>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          </div>
        )}
        
        {/* Badge de estado */}
        {category.status && (
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg border-2 ${
              category.status === 'active' 
                ? 'bg-green-500 text-white border-green-400 shadow-green-200' 
                : 'bg-red-500 text-white border-red-400 shadow-red-200'
            }`}>
              {category.status === 'active' ? '✅ Activo' : '❌ Inactivo'}
            </span>
          </div>
        )}
      </div>
      
      <div className="px-6 py-6 bg-gradient-to-b from-white to-red-50">
        {/* Header de la tarjeta */}
        <div className="mb-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-red-600 text-white p-2 rounded-full shadow-lg">
              <span className="text-sm font-bold">🏷️</span>
            </div>
            <h2 className="text-xl font-black text-red-800 leading-tight">
              {category.name}
            </h2>
          </div>
          
          <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 rounded-full shadow-sm"></div>
        </div>
        
        {/* Descripción */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium leading-relaxed bg-white p-3 rounded-lg border-l-4 border-red-500 shadow-inner">
            {category.description || "Sin descripción disponible"}
          </p>
        </div>
        
        {/* Botones de acción */}
        <div className="flex gap-3">
          <Button 
            label={
              <div className="flex items-center space-x-2">
                <span>🗑️</span>
                <span>Eliminar</span>
              </div>
            }
            actionButton={() => deleteCategory(category._id)}
            colorClass={"danger"}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-red-400"
          />
          <Button 
            label={
              <div className="flex items-center space-x-2">
                <span>✏️</span>
                <span>Editar</span>
              </div>
            }
            actionButton={() => updateCategories(category)}
            colorClass={"warning"}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-red-800 font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-yellow-300"
          />
        </div>
      </div>

      {/* Elemento decorativo inferior */}
      <div className="h-2 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600"></div>
    </div>
  );
};

export default CategoryCard;