import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/Editor/HomePage";
import ViewerProductsPage from "./pages/Viewer/ViewProducts";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/Navbar";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/home" element={
          <ProtectedRoute role="editor">
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/view-products" element={
          <ProtectedRoute role="viewer">
            <ViewerProductsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}
