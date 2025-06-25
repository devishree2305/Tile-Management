import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

const NavBar = () => {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/60 border-b border-purple-600 text-white shadow-md px-6 py-3 flex justify-between items-center"
    >
      <div className="text-2xl font-bold text-purple-400 drop-shadow-md">Tiles</div>

      <div className="flex gap-4 items-center text-sm font-medium">
        {isAuthenticated ? (
          <>
            <Link to="/home" className="hover:text-purple-400 transition">Home</Link>

            {role === "Admin" && (
              <>
                <Link to="/application" className="hover:text-purple-400 transition">Applications</Link>
                <Link to="/category" className="hover:text-purple-400 transition">Categories</Link>
                <Link to="/products" className="hover:text-purple-400 transition">Products</Link>
              </>
            )}

            {role === "Viewer" && (
              <Link to="/view-products" className="hover:text-purple-400 transition">Products</Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-xl shadow-sm transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-purple-400 transition">Login</Link>
            <Link to="/register" className="hover:text-purple-400 transition">Register</Link>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default NavBar;
