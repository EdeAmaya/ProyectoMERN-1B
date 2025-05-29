import React from 'react';

const RegisterProduct = ({
  name, setName,
  description, setDescription,
  price, setPrice,
  stock, setStock,
  saveProduct,
  id,
  handleEdit,
  onCancel
}) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      handleEdit(e);
    } else {
      saveProduct(e);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header del formulario */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-full shadow-lg">
            <span className="text-3xl">{id ? '✏️' : '📦'}</span>
          </div>
          <h2 className="text-3xl font-black text-green-800">
            {id ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
        </div>
        <div className="h-1 bg-gradient-to-r from-green-600 via-emerald-400 to-green-600 rounded-full max-w-xs mx-auto shadow-sm"></div>
      </div>

      <form className="bg-white shadow-2xl rounded-2xl overflow-hidden border-4 border-green-100" onSubmit={handleSubmit}>
        {/* Header decorativo del formulario */}
        <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 p-6">
          <h3 className="text-white text-xl font-bold text-center">
            Información del Producto
          </h3>
        </div>

        <div className="p-8 space-y-6 bg-gradient-to-b from-white to-green-50">
          {/* Campo Nombre */}
          <div className="group">
            <label className="flex items-center space-x-2 text-green-800 font-bold text-lg mb-3">
              <span className="bg-green-600 text-white p-1 rounded-full text-sm">🏷️</span>
              <span>Nombre del Producto</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={name || ''}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-4 border-3 border-green-200 rounded-xl text-gray-800 font-medium shadow-inner bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-lg"
                placeholder="Ej: Coca Cola, Papas Lays, Chocolate..."
                required
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <span className="text-green-400 text-xl">📝</span>
              </div>
            </div>
          </div>

          {/* Campo Precio */}
          <div className="group">
            <label className="flex items-center space-x-2 text-green-800 font-bold text-lg mb-3">
              <span className="bg-green-600 text-white p-1 rounded-full text-sm">💰</span>
              <span>Precio</span>
            </label>
            <div className="relative">
              <input
                type="number"
                name="price"
                value={price || ''}
                min="0"
                step="0.01"
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-4 border-3 border-green-200 rounded-xl text-gray-800 font-medium shadow-inner bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-lg"
                placeholder="0.00"
                required
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <span className="text-green-400 text-xl">💵</span>
              </div>
            </div>
          </div>

          {/* Campo Stock */}
          <div className="group">
            <label className="flex items-center space-x-2 text-green-800 font-bold text-lg mb-3">
              <span className="bg-green-600 text-white p-1 rounded-full text-sm">📊</span>
              <span>Stock Disponible</span>
            </label>
            <div className="relative">
              <input
                type="number"
                name="stock"
                value={stock || ''}
                min="0"
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-4 border-3 border-green-200 rounded-xl text-gray-800 font-medium shadow-inner bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-lg"
                placeholder="Cantidad disponible"
                required
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <span className="text-green-400 text-xl">📦</span>
              </div>
            </div>
          </div>

          {/* Campo Descripción */}
          <div className="group">
            <label className="flex items-center space-x-2 text-green-800 font-bold text-lg mb-3">
              <span className="bg-green-600 text-white p-1 rounded-full text-sm">📄</span>
              <span>Descripción</span>
            </label>
            <div className="relative">
              <textarea
                name="description"
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full px-4 py-4 border-3 border-green-200 rounded-xl text-gray-800 font-medium shadow-inner bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 resize-none"
                placeholder="Describe este producto detalladamente..."
              />
              <div className="absolute top-4 right-4 pointer-events-none">
                <span className="text-green-400 text-xl">💬</span>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="pt-6 space-y-4">
            {!id ? (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 text-white py-4 px-6 rounded-xl font-black text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-4 border-green-500 flex items-center justify-center space-x-3"
              >
                <span className="text-2xl">💾</span>
                <span>Guardar Producto</span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-500 hover:from-emerald-600 hover:via-green-500 hover:to-green-600 text-green-900 py-4 px-6 rounded-xl font-black text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-4 border-emerald-400 flex items-center justify-center space-x-3"
              >
                <span className="text-2xl">✏️</span>
                <span>Actualizar Producto</span>
              </button>
            )}

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-full bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 text-white py-3 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-400 flex items-center justify-center space-x-3"
              >
                <span className="text-xl">↩️</span>
                <span>Cancelar</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer decorativo del formulario */}
        <div className="h-3 bg-gradient-to-r from-green-600 via-emerald-400 to-green-600"></div>
      </form>

      {/* Información adicional */}
      <div className="mt-8 bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-200 shadow-lg">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="text-green-800 font-bold text-lg mb-2">Consejos para registrar productos:</h4>
            <ul className="text-green-700 space-y-1 text-sm font-medium">
              <li>• Usa nombres claros y descriptivos</li>
              <li>• Establece precios competitivos en el mercado</li>
              <li>• Mantén el stock actualizado regularmente</li>
              <li>• Una buena descripción ayuda a las ventas</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Nota sobre campos obligatorios */}
      <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
        <p className="text-green-700 text-sm font-medium">
          <span className="font-bold">*</span> Los campos marcados son obligatorios
        </p>
      </div>
    </div>
  );
};

export default RegisterProduct;