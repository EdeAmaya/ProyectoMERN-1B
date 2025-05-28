import React, { useState, useEffect } from "react";
import RegisterEmployees from "../components/Employees/RegisterEmployees";
import ListEmployees from "../components/Employees/ListEmployees";
import {Toaster} from 'react-hot-toast';
import useDataEmployees from "../components/Employees/hooks/useDataEmployees";

const Employees = () => {
  /*Efecto para cambiar el título de la página
  cuando se carga la página*/
    useEffect(() => {
    document.title = 'Empleados';
  }, []);

  const {
    activeTab,
    setActiveTab,
    id,
    setId,
    name,
    setName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    telephone,
    setTelephone,
    dui,
    setDui,
    address,
    setAddress,
    birthdate,
    setBirthdate,
    hireDate,
    setHireDate,
    isssNumber,
    setIsssNumber,
    errorEmpleado,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    employees,
    setEmployees,
    cleanData,
    handleSubmit,
    fetchData,
    deleteEmployee,
    updateEmployee,
    handleUpdate,
  } = useDataEmployees();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header decorativo */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-8 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white text-blue-700 p-4 rounded-full shadow-lg">
              <span className="text-3xl">👥</span>
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-wide drop-shadow-lg">
                Gestión de Empleados
              </h1>
              <p className="text-blue-200 text-lg font-medium mt-1">
                Administra y organiza tu equipo de trabajo
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 -mt-4">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-100">
          {/* Pestañas mejoradas */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-blue-200">
            <div className="flex">
              <button
                className={`flex-1 px-6 py-4 font-bold text-lg transition-all duration-300 relative ${
                  activeTab === "list"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105 z-10"
                    : "text-blue-700 hover:bg-blue-100 hover:text-blue-800"
                }`}
                onClick={() => setActiveTab("list")}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">📋</span>
                  <span>Lista de Empleados</span>
                </div>
                {activeTab === "list" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 rounded-t-full"></div>
                )}
              </button>
              
              <button
                className={`flex-1 px-6 py-4 font-bold text-lg transition-all duration-300 relative ${
                  activeTab === "form"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105 z-10"
                    : "text-blue-700 hover:bg-blue-100 hover:text-blue-800"
                }`}
                onClick={() => {
                  setActiveTab("form");
                  cleanData();
                }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">✏️</span>
                  <span>Gestionar Empleados</span>
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
                <ListEmployees
                  setId={setId}
                  setActiveTab={setActiveTab}
                  updateEmployee={updateEmployee}
                  handleUpdate={handleUpdate}
                  deleteEmployee={deleteEmployee}
                  employees={employees}
                  loading={loading}
                />
              </div>
            )}
            {activeTab === "form" && (
              <div className="animate-fadeIn">
                <RegisterEmployees
                  id={id}
                  setId={setId}
                  name={name}
                  setName={setName}
                  lastName={lastName}
                  setLastName={setLastName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  telephone={telephone}
                  setTelephone={setTelephone}
                  dui={dui}
                  setDui={setDui}
                  address={address}
                  setAddress={setAddress}
                  birthdate={birthdate}
                  setBirthdate={setBirthdate}
                  hireDate={hireDate}
                  setHireDate={setHireDate}
                  isssNumber={isssNumber}
                  setIsssNumber={setIsssNumber}
                  errorEmpleado={errorEmpleado}
                  setError={setError}
                  success={success}
                  setSuccess={setSuccess}
                  loading={loading}
                  setLoading={setLoading}
                  employees={employees}
                  setEmployees={setEmployees}
                  cleanData={cleanData}
                  handleSubmit={handleSubmit}
                  handleUpdate={handleUpdate}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Elementos decorativos de fondo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-300 rounded-full blur-2xl opacity-25 animate-pulse delay-500"></div>
      </div>

      <Toaster
        toastOptions={{
          duration: 1000,
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

export default Employees;