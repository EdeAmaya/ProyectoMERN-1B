import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { logout, authCokie } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!authCokie) return null;

  const navItems = [
    { to: "/products", label: "Productos", icon: "🛍️" },
    { to: "/categories", label: "Categorías", icon: "📂" },
    { to: "/employees", label: "Empleados", icon: "👥" },
    
    
  ];

  return (
    <nav className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-xl border-b-4 border-red-900">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-white text-red-700 p-2 rounded-full shadow-lg">
              <span className="text-2xl font-black">🥤</span>
            </div>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-2xl font-black tracking-wide transition-all duration-300 ${
                  isActive 
                    ? "text-yellow-300 drop-shadow-lg" 
                    : "text-white hover:text-yellow-200 hover:drop-shadow-md"
                }`
              }
            >
              CocaCola
              <span className="text-sm font-normal block -mt-1 text-red-200">
                
              </span>
            </NavLink>
          </div>

          {/* Botón hamburguesa */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-yellow-200 focus:outline-none transition-colors duration-300 p-2"
            >
              <div className="space-y-1">
                <div className={`w-6 h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-current transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
          </div>

          {/* Menú para pantallas grandes */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isActive 
                      ? "bg-white text-red-700 shadow-lg transform scale-105" 
                      : "text-white hover:bg-red-500 hover:bg-opacity-50 hover:shadow-md"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Botón de logout en pantallas grandes */}
          <div className="hidden lg:block">
            <button
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-red-800 px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-yellow-300"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-red-500 pt-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isActive 
                        ? "bg-white text-red-700 shadow-lg" 
                        : "text-white hover:bg-red-500 hover:bg-opacity-50"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
              <button
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-red-800 px-4 py-3 rounded-lg font-bold shadow-lg mt-4 border-2 border-yellow-300"
                onClick={handleLogout}
              >
                <span>🚪</span>
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;