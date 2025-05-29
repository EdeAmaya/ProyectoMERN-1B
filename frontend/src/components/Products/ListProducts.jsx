import React from "react";
import ProductCard from "./ProductCard";

const ListProducts = ({ products, loading, deleteProduct, updateProduct }) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 rounded-full shadow-lg">
            <span className="text-2xl">🥤</span>
          </div>
          <h1 className="text-4xl font-black text-green-800 tracking-wide">
            Catálogo de Productos
          </h1>
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 rounded-full shadow-lg">
            <span className="text-2xl">🥤</span>
          </div>
        </div>
        
        {/* Línea decorativa */}
        <div className="flex items-center justify-center space-x-2">
          <div className="h-1 w-16 bg-gradient-to-r from-transparent to-green-600 rounded-full"></div>
          <div className="h-2 w-8 bg-gradient-to-r from-green-600 via-emerald-400 to-green-600 rounded-full shadow-md"></div>
          <div className="h-1 w-16 bg-gradient-to-r from-green-600 to-transparent rounded-full"></div>
        </div>

        {/* Contador de productos */}
        {!loading && products && (
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-green-200 px-4 py-2 rounded-full border-2 border-green-300 shadow-lg">
            <span className="text-green-700 font-bold">Total:</span>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full font-black text-sm shadow-inner">
              {products.length}
            </span>
            <span className="text-green-700 font-bold">
              {products.length === 1 ? 'Producto' : 'Productos'}
            </span>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-emerald-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <div className="text-center">
            <p className="text-green-700 font-bold text-lg">Cargando productos...</p>
            <p className="text-green-500 text-sm">Por favor espera un momento</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && (!products || products.length === 0) && (
        <div className="text-center py-16 space-y-6">
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-8 rounded-full w-32 h-32 mx-auto flex items-center justify-center shadow-2xl">
            <span className="text-6xl text-green-600">🥤</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-green-800">¡No hay productos disponibles!</h3>
            <p className="text-green-600 max-w-md mx-auto">
              Parece que aún no has agregado ningún producto refrescante a tu inventario. 
              ¡Comienza agregando tu primer producto!
            </p>
          </div>
          <div className="bg-gradient-to-r from-emerald-100 to-green-100 p-4 rounded-xl border-2 border-green-200 max-w-sm mx-auto">
            <p className="text-green-700 font-medium text-sm">
              💡 Tip: Usa la pestaña "Nuevo Producto" para agregar bebidas refrescantes a tu catálogo
            </p>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && products && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="animate-fadeInUp"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <ProductCard
                product={product}
                deleteProduct={deleteProduct}
                updateProduct={updateProduct}
              />
            </div>
          ))}
        </div>
      )}

      {/* Footer decorativo */}
      {!loading && products && products.length > 0 && (
        <div className="text-center pt-8 border-t-2 border-green-200">
          <div className="inline-flex items-center space-x-2 text-green-600">
            <span className="text-sm font-medium">🥤 Productos naturales y refrescantes 🥤</span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
};

export default ListProducts;