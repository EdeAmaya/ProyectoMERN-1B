import React from 'react';

const RegisterCategory = ({ 
  setNameCategory, 
  nameCategory, 
  setDescription, 
  description, 
  saveCategory, 
  id, 
  handleEdit, 
  setStatus, 
  status, 
  setImage, 
  image 
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header del formulario */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-lg">
            <span className="text-3xl">{id ? '✏️' : ''}</span>
          </div>
          <h2 className="text-3xl font-black text-red-800">
            {id ? 'Editar Categoría' : 'Nueva Categoría'}
          </h2>
        </div>
        <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 rounded-full max-w-xs mx-auto shadow-sm"></div>
      </div>

      <form className="bg-white shadow-2xl rounded-2xl overflow-hidden border-4 border-red-100">
        {/* Header decorativo del formulario */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-6">
          <h3 className="text-white text-xl font-bold text-center">
            Información de la Categoría
          </h3>
        </div>

        <div className="p-8 space-y-6 bg-gradient-to-b from-white to-red-50">
          {/* Campo Nombre */}
          <div className="group">
            <label className="flex items-center space-x-2 text-red-800 font-bold text-lg mb-3">
              <span className="bg-red-600 text-white p-1 rounded-full text-sm">🏷️</span>
              <span>Nombre de la Categoría</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={nameCategory}
                onChange={(e) => setNameCategory(e.target.value)}
                className="w-full px-4 py-4 border-3 border-red-200 rounded-xl text-gray-800 font-medium shadow-inner bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 text-lg"
                placeholder="Ej: Bebidas, Snacks, Dulces..."
                required
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <span className="text-red-400 text-xl">📝</span>
              </div>
            </div>
          </div>

          {/* Campo Descripción */}
          <div className="group">
            <label className="flex items-center space-x-2 text-red-800 font-bold text-lg mb-3">
              <span className="bg-red-600 text-white p-1 rounded-full text-sm">📄</span>
              <span>Descripción</span>
            </label>
            <div className="relative">
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full px-4 py-4 border-3 border-red-200 rounded-xl text-gray-800 font-medium shadow-inner bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 resize-none"
                placeholder="Describe esta categoría detalladamente..."
                required
              />
              <div className="absolute top-4 right-4 pointer-events-none">
                <span className="text-red-400 text-xl">💬</span>
              </div>
            </div>
          </div>

          {/* Campo Estado */}
          <div className="group">
            <label className="flex items-center space-x-2 text-red-800 font-bold text-lg mb-3">
              <span className="bg-red-600 text-white p-1 rounded-full text-sm">⚡</span>
              <span>Estado</span>
            </label>
            <div className="relative">
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-4 border-3 border-red-200 rounded-xl text-gray-800 font-medium shadow-inner bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 text-lg appearance-none cursor-pointer"
                required
              >
                <option value="">Selecciona un estado...</option>
                <option value="active">✅ Activo</option>
                <option value="inactive">❌ Inactivo</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <span className="text-red-400 text-xl">⚙️</span>
              </div>
            </div>
          </div>

          {/* Campo Imagen URL */}
          <div className="group">
            <label className="flex items-center space-x-2 text-red-800 font-bold text-lg mb-3">
              <span className="bg-red-600 text-white p-1 rounded-full text-sm">🖼️</span>
              <span>URL de la Imagen</span>
            </label>
            <div className="relative">
              <input
                type="url"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-4 border-3 border-red-200 rounded-xl text-gray-800 font-medium shadow-inner bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 text-lg"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <span className="text-red-400 text-xl">🔗</span>
              </div>
            </div>
            {image && (
              <div className="mt-3 p-3 bg-red-50 rounded-lg border-2 border-red-100">
                <p className="text-red-700 text-sm font-medium mb-2">Vista previa:</p>
                <img 
                  src={image} 
                  alt="Preview" 
                  className="w-24 h-24 object-cover rounded-lg border-2 border-red-200 shadow-md"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Botón de acción */}
          <div className="pt-6">
            {!id ? (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white py-4 px-6 rounded-xl font-black text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-4 border-red-500 flex items-center justify-center space-x-3"
                onClick={(e) => saveCategory(e)}
              >
                <span className="text-2xl">💾</span>
                <span>Guardar Categoría</span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-500 hover:from-yellow-600 hover:via-orange-500 hover:to-orange-600 text-red-900 py-4 px-6 rounded-xl font-black text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-4 border-yellow-400 flex items-center justify-center space-x-3"
                onClick={(e) => handleEdit(e)}
              >
                <span className="text-2xl">✏️</span>
                <span>Actualizar Categoría</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer decorativo del formulario */}
        <div className="h-3 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600"></div>
      </form>

      {/* Información adicional */}
      <div className="mt-8 bg-gradient-to-r from-red-100 to-yellow-100 p-6 rounded-xl border-2 border-red-200 shadow-lg">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="text-red-800 font-bold text-lg mb-2">Consejos para crear categorías:</h4>
            <ul className="text-red-700 space-y-1 text-sm font-medium">
              <li>• Usa nombres descriptivos y únicos</li>
              <li>• La descripción ayuda a otros usuarios a entender la categoría</li>
              <li>• Las imágenes mejoran la experiencia visual</li>
              <li>• Mantén el estado actualizado según la disponibilidad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCategory;  