import React, { useEffect, useState } from "react";
import { TrendingUp, Users, Droplets, Globe, Package, Award } from "lucide-react";

const Dashboard = () => {
  const [data, setData] = useState({
    ventas: 8500000,
    empleados: 86200,
    productos: 500,
    paises: 200,
    plantas: 900,
    premios: 45
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ icon: Icon, title, value, subtitle, trend }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 border-l-4 border-red-600">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-red-50 rounded-lg">
          <Icon className="h-8 w-8 text-red-600" />
        </div>
        {trend && (
          <div className="flex items-center text-green-600 text-sm font-medium">
            <TrendingUp className="h-4 w-4 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-1">
        {loading ? "..." : value.toLocaleString()}
      </p>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                <Droplets className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Dashboard </h1>
                <p className="text-red-200">Panel de Control Ejecutivo</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">Reporte Global</p>
              <p className="text-red-200">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={TrendingUp}
            title="Ventas Anuales"
            value={data.ventas}
            subtitle="Millones de unidades vendidas"
            trend="+12.5%"
          />
          <StatCard
            icon={Users}
            title="Empleados Globales"
            value={data.empleados}
            subtitle="Fuerza laboral mundial"
            trend="+3.2%"
          />
          <StatCard
            icon={Package}
            title="Productos Activos"
            value={data.productos}
            subtitle="Bebidas y marcas diferentes"
            trend="+5.8%"
          />
          <StatCard
            icon={Globe}
            title="Países"
            value={data.paises}
            subtitle="Presencia mundial"
            trend="+2"
          />
          <StatCard
            icon={Droplets}
            title="Plantas de Producción"
            value={data.plantas}
            subtitle="Instalaciones operativas"
            trend="+8"
          />
          <StatCard
            icon={Award}
            title="Premios 2024"
            value={data.premios}
            subtitle="Reconocimientos obtenidos"
            trend="+15"
          />
        </div>

        {/* Brand Showcase */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Marcas Principales</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Coca-Cola Classic", color: "bg-red-600" },
              { name: "Coca-Cola Zero", color: "bg-black" },
              { name: "Sprite", color: "bg-green-500" },
              { name: "Fanta", color: "bg-orange-500" }
            ].map((brand, index) => (
              <div key={index} className="text-center p-4 rounded-lg hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 ${brand.color} rounded-full mx-auto mb-3 shadow-lg`}></div>
                <p className="font-semibold text-gray-700">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Rendimiento por Región</h3>
            <div className="space-y-4">
              {[
                { region: "América del Norte", percentage: 92, color: "bg-red-600" },
                { region: "Europa", percentage: 85, color: "bg-red-500" },
                { region: "Asia Pacífico", percentage: 78, color: "bg-red-400" },
                { region: "América Latina", percentage: 88, color: "bg-red-500" }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 font-medium">{item.region}</span>
                    <span className="text-gray-600">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Objetivos 2024</h3>
            <div className="space-y-4">
              {[
                { objetivo: "Sustentabilidad", progreso: 75, meta: "Reducir 25% emisiones" },
                { objetivo: "Innovación", progreso: 60, meta: "10 nuevos productos" },
                { objetivo: "Expansión", progreso: 90, meta: "5 nuevos mercados" },
                { objetivo: "Digital", progreso: 85, meta: "Transformación completa" }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-red-600 pl-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-800">{item.objetivo}</h4>
                    <span className="text-red-600 font-bold">{item.progreso}%</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{item.meta}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${item.progreso}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500">
          <p className="text-sm">© 2024 The Coca-Cola Company. Dashboard Ejecutivo</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;