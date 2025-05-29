import React from "react";
import Button from "../Button";

const ProductCard = ({ product, deleteProduct, updateProduct }) => {
  
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      deleteProduct(product._id);
    }
  };

  const handleEdit = () => {
    updateProduct(product);
  };

  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  // Determinar el estado del stock
  const getStockStatus = (stock) => {
    if (stock > 20) return { color: 'green', text: 'En Stock', icon: '✅' };
    if (stock > 0) return { color: 'yellow', text: 'Poco Stock', icon: '⚠️' };
    return { color: 'red', text: 'Sin Stock', icon: '❌' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="group max-w-sm mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border-4 border-green-100 hover:border-green-300 transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
      {/* Imagen del producto */}
      <div className="relative">
        <div className="h-52 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative overflow-hidden">
          <div className="text-green-600 text-6xl opacity-80">🥤</div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Badge de stock */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg border-2 ${
            stockStatus.color === 'green' 
              ? 'bg-green-500 text-white border-green-400 shadow-green-200' 
              : stockStatus.color === 'yellow'
              ? 'bg-yellow-500 text-white border-yellow-400 shadow-yellow-200'
              : 'bg-red-500 text-white border-red-400 shadow-red-200'
          }`}>
            {stockStatus.icon} {stockStatus.text}
          </span>
        </div>

        {/* Badge de precio destacado */}
        <div className="absolute top-4 left-4">
          <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-green-800 px-3 py-1 rounded-full font-black text-sm shadow-lg border-2 border-emerald-300">
            {formatPrice(product.price)}
          </div>
        </div>
      </div>
      
      <div className="px-6 py-6 bg-gradient-to-b from-white to-green-50">
        {/* Header de la tarjeta */}
        <div className="mb-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-green-600 text-white p-2 rounded-full shadow-lg">
              <span className="text-sm font-bold">🥤</span>
            </div>
            <h2 className="text-xl font-black text-green-800 leading-tight line-clamp-2">
              {product.name}
            </h2>
          </div>
          
          <div className="h-1 bg-gradient-to-r from-green-600 via-emerald-400 to-green-600 rounded-full shadow-sm"></div>
        </div>
        
        {/* Descripción */}
        <div className="mb-4">
          <p className="text-gray-700 font-medium leading-relaxed bg-white p-3 rounded-lg border-l-4 border-green-500 shadow-inner text-sm line-clamp-3">
            {product.description || "Bebida refrescante de la más alta calidad"}
          </p>
        </div>

        {/* Información de stock y precio */}
        <div className="mb-6 space-y-3">
          {/* Precio destacado */}
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-3 rounded-lg border-2 border-green-300 text-center">
            <div className="text-green-800 font-bold text-sm mb-1">💰 Precio</div>
            <div className="text-2xl font-black text-green-700">
              {formatPrice(product.price)}
            </div>
          </div>

          {/* Stock */}
          <div className="bg-gradient-to-r from-emerald-100 to-emerald-200 p-3 rounded-lg border-2 border-emerald-300 text-center">
            <div className="text-emerald-800 font-bold text-sm mb-1">📦 Inventario</div>
            <div className="flex items-center justify-center space-x-2">
              <span className={`inline-block w-3 h-3 rounded-full ${
                stockStatus.color === 'green' ? 'bg-green-500' : 
                stockStatus.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></span>
              <span className="font-bold text-emerald-700">
                {product.stock} unidades
              </span>
            </div>
          </div>
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
            actionButton={handleDelete}
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
            actionButton={handleEdit}
            colorClass={"warning"}
            className="flex-1 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-green-800 font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-emerald-300"
          />
        </div>
      </div>

      {/* Elemento decorativo inferior */}
      <div className="h-2 bg-gradient-to-r from-green-600 via-emerald-400 to-green-600"></div>
    </div>
  );
};

export default ProductCard;