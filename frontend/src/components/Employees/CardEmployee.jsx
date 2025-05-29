import React from "react";
import Button from "../Button";

const CardEmployee = ({ employee, deleteEmployee, updateEmployee }) => {
  if (!employee) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <div className="group max-w-sm mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-100 hover:border-blue-300 transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
      {/* Header con avatar */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center relative">
          <div className="bg-white p-4 rounded-full shadow-lg">
            <span className="text-4xl text-blue-600">👤</span>
          </div>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Badge de verificación */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg border-2 ${
            employee.isVerified 
              ? 'bg-green-500 text-white border-green-400 shadow-green-200' 
              : 'bg-red-500 text-white border-red-400 shadow-red-200'
          }`}>
            {employee.isVerified ? '✅ Verificado' : '❌ Pendiente'}
          </span>
        </div>
      </div>
      
      <div className="px-6 py-6 bg-gradient-to-b from-white to-blue-50">
        {/* Header de la tarjeta */}
        <div className="mb-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
              <span className="text-sm font-bold">👥</span>
            </div>
            <h2 className="text-xl font-black text-blue-800 leading-tight">
              {employee.name} {employee.lastname || employee.lastName}
            </h2>
          </div>
          
          <div className="h-1 bg-gradient-to-r from-blue-600 via-yellow-400 to-blue-600 rounded-full shadow-sm"></div>
        </div>
        
        {/* Información del empleado */}
        <div className="space-y-3 mb-6">
          <div className="bg-white p-3 rounded-lg border-l-4 border-blue-500 shadow-inner">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">📧</span>
              <p className="text-gray-700 font-medium text-sm">
                <span className="font-semibold">Email:</span> {employee.email || 'No especificado'}
              </p>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg border-l-4 border-green-500 shadow-inner">
            <div className="flex items-center space-x-2">
              <span className="text-green-600">📞</span>
              <p className="text-gray-700 font-medium text-sm">
                <span className="font-semibold">Teléfono:</span> {employee.telephone || 'No especificado'}
              </p>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg border-l-4 border-purple-500 shadow-inner">
            <div className="flex items-center space-x-2">
              <span className="text-purple-600">🆔</span>
              <p className="text-gray-700 font-medium text-sm">
                <span className="font-semibold">DUI:</span> {employee.dui || 'No especificado'}
              </p>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg border-l-4 border-orange-500 shadow-inner">
            <div className="flex items-center space-x-2">
              <span className="text-orange-600">🏠</span>
              <p className="text-gray-700 font-medium text-sm">
                <span className="font-semibold">Dirección:</span> {employee.address || 'No especificada'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-2 rounded-lg border-l-4 border-pink-500 shadow-inner">
              <div className="flex items-center space-x-1">
                <span className="text-pink-600 text-sm">🎂</span>
                <p className="text-gray-700 font-medium text-xs">
                  <span className="font-semibold">Nacimiento:</span><br />
                  {formatDate(employee.birthday || employee.birthdate)}
                </p>
              </div>
            </div>
            
            <div className="bg-white p-2 rounded-lg border-l-4 border-teal-500 shadow-inner">
              <div className="flex items-center space-x-1">
                <span className="text-teal-600 text-sm">💼</span>
                <p className="text-gray-700 font-medium text-xs">
                  <span className="font-semibold">Contratación:</span><br />
                  {formatDate(employee.hireDate)}
                </p>
              </div>
            </div>
          </div>
          
          {employee.isssNumber && (
            <div className="bg-white p-3 rounded-lg border-l-4 border-indigo-500 shadow-inner">
              <div className="flex items-center space-x-2">
                <span className="text-indigo-600">🏥</span>
                <p className="text-gray-700 font-medium text-sm">
                  <span className="font-semibold">ISSS:</span> {employee.isssNumber}
                </p>
              </div>
            </div>
          )}
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
            actionButton={() => deleteEmployee(employee._id)}
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
            actionButton={() => updateEmployee(employee)}
            colorClass={"warning"}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-800 font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-yellow-300"
          />
        </div>
      </div>

      {/* Elemento decorativo inferior */}
      <div className="h-2 bg-gradient-to-r from-blue-600 via-yellow-400 to-blue-600"></div>
    </div>
  );
};

export default CardEmployee;