import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser } from "../../api/AuthApi";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();

  // Already logged in? Redirect based on role
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "editor") navigate("/home");
      else if (user.role === "viewer") navigate("/view-products");
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(formData);
      const { token, user } = response.data;

      login(user, token); //Save user + token in context

      // ⏩ Redirect based on role
      if (user.role === "editor") navigate("/home");
      else if (user.role === "viewer") navigate("/view-products");
      else navigate("/login");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-gray-900 text-white font-sans overflow-hidden">
      {/* Background Blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-purple-700 rounded-full blur-3xl opacity-30 top-10 left-10"
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-20 bottom-10 right-10"
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gray-900 border border-purple-600 shadow-2xl p-8 rounded-3xl w-full max-w-md space-y-6 z-10"
      >
        <h2 className="text-4xl font-bold text-purple-400 text-center drop-shadow-md">Welcome Back</h2>
        <p className="text-center text-gray-400">Please login to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#a855f7" }}
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full p-3 rounded-xl bg-gray-800 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#a855f7" }}
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-3 rounded-xl bg-gray-800 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow-lg transition"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
