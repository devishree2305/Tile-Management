// src/App.jsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/Editor/ProductsPage";
import CategoryPage from "./pages/Editor/CategoryPage";
import ApplicationPage from "./pages/Editor/ApplicationPage";
import ViewerProductsPage from "./pages/Viewer/ViewProducts";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";

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

        <Route path="/application" element={
          <ProtectedRoute role="editor">
            <ApplicationPage />
          </ProtectedRoute>
        } />

        <Route path="/category" element={
          <ProtectedRoute role="editor">
            <CategoryPage />
          </ProtectedRoute>
        } />

        <Route path="/products" element={
          <ProtectedRoute role="editor">
            <ProductsPage />
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
