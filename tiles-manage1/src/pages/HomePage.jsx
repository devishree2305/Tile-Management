import { useState } from "react";
import ProductsPage from "./Editor/ProductsPage";
import CategoryPage from "./Editor/CategoryPage";
import ApplicationPage from "./Editor/ApplicationPage";
import { FaBox, FaThLarge, FaCubes } from "react-icons/fa";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("products");

  const renderPage = () => {
    switch (currentPage) {
      case "products":
        return <ProductsPage />;
      case "category":
        return <CategoryPage />;
      case "application":
        return <ApplicationPage />;
      default:
        return null;
    }
  };

  const tabs = [
    { key: "products", label: "Products", icon: <FaBox /> },
    { key: "category", label: "Category", icon: <FaThLarge /> },
    { key: "application", label: "Application", icon: <FaCubes /> },
  ];

  return (
    <div className="flex min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-75 bg-gray-950 p-6 border-r border-gray-800 shadow-xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-1">Hello, Admin</h2>
          <p className="text-sm text-gray-400">Profile</p>
        </div>
        <nav className="space-y-4">
          {tabs.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setCurrentPage(key)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all font-medium text-left ${
                currentPage === key
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto bg-gray-950">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-400 tracking-wide drop-shadow-md text-center">
            Tile Management
          </h1>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl ring-1 ring-purple-500/30 transition-all duration-500 animate-fade-in">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
