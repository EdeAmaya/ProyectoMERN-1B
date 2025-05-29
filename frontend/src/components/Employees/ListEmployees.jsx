import React from "react";
import CardEmployee from "../Employees/CardEmployee";

const ListEmployees = ({
  deleteEmployee,
  updateEmployee,
  loading,
  employees,
}) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-full shadow-lg">
            <span className="text-2xl">📋</span>
          </div>
          <h1 className="text-4xl font-black text-blue-800 tracking-wide">
            Listado de Empleados
          </h1>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-full shadow-lg">
            <span className="text-2xl">📋</span>
          </div>
        </div>
        
        {/* Línea decorativa */}
        <div className="flex items-center justify-center space-x-2">
          <div className="h-1 w-16 bg-gradient-to-r from-transparent to-blue-600 rounded-full"></div>
          <div className="h-2 w-8 bg-gradient-to-r from-blue-600 via-yellow-400 to-blue-600 rounded-full shadow-md"></div>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-transparent rounded-full"></div>
        </div>

        {/* Contador de empleados */}
        {!loading && employees && (
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-2 rounded-full border-2 border-blue-300 shadow-lg">
            <span className="text-blue-700 font-bold">Total:</span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-black text-sm shadow-inner">
              {employees.length}
            </span>
            <span className="text-blue-700 font-bold">
              {employees.length === 1 ? 'Empleado' : 'Empleados'}
            </span>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-yellow-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <div className="text-center">
            <p className="text-blue-700 font-bold text-lg">Cargando empleados...</p>
            <p className="text-blue-500 text-sm">Por favor espera un momento</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && (!employees || employees.length === 0) && (
        <div className="text-center py-16 space-y-6">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-full w-32 h-32 mx-auto flex items-center justify-center shadow-2xl">
            <span className="text-6xl text-blue-600">👥</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-blue-800">¡No hay empleados registrados!</h3>
            <p className="text-blue-600 max-w-md mx-auto">
              Parece que aún no has registrado ningún empleado. 
              ¡Comienza agregando tu primer empleado al equipo!
            </p>
          </div>
          <div className="bg-gradient-to-r from-yellow-100 to-blue-100 p-4 rounded-xl border-2 border-blue-200 max-w-sm mx-auto">
            <p className="text-blue-700 font-medium text-sm">
              💡 Tip: Ve a la pestaña "Gestionar Empleados" para registrar nuevos empleados
            </p>
          </div>
        </div>
      )}

      {/* Employees Grid */}
      {!loading && employees && employees.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
          {employees.map((employee, index) => (
            <div
              key={employee._id}
              className="animate-fadeInUp"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <CardEmployee
                employee={employee}
                deleteEmployee={deleteEmployee}
                updateEmployee={updateEmployee}
              />
            </div>
          ))}
        </div>
      )}

      {/* Footer decorativo */}
      {!loading && employees && employees.length > 0 && (
        <div className="text-center pt-8 border-t-2 border-blue-200">
          <div className="inline-flex items-center space-x-2 text-blue-600">
            <span className="text-sm font-medium">Gestión de empleados completada exitosamente</span>
            <span className="text-lg">✨</span>
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

export default ListEmployees;