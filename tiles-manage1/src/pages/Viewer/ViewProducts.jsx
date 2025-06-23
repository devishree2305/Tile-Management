import { useEffect, useState } from "react";
import { getProducts } from "../../api/ProductsApi";
import { getCategoryMasters } from "../../api/CategoryMasterApi";
import { getApplicationMasters } from "../../api/ApplicationMasterApi";
import { FaBoxes, FaCodeBranch, FaTags, FaCogs, FaEye } from "react-icons/fa";

export default function ViewerProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prodRes, catRes, appRes] = await Promise.all([
          getProducts(),
          getCategoryMasters(),
          getApplicationMasters(),
        ]);
        setProducts(prodRes.data.filter((p) => !p.block));
        setCategories(catRes.data);
        setApplications(appRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const getCategoryName = (id) =>
    categories.find((c) => c.categoryId === id)?.name || "N/A";

  const getApplicationName = (id) =>
    applications.find((a) => a.applicationId === id)?.name || "N/A";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-white text-lg animate-pulse">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 space-y-8">
      <h2 className="text-4xl font-extrabold text-purple-400 text-center drop-shadow-lg">
        <FaBoxes className="inline-block mr-2 mb-1 text-purple-500" />
        Available Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-300 text-center text-lg mt-6">
          No products available.
        </p>
      ) : (
        <div className="space-y-4">
          {/* Header */}
          <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-900 rounded-xl border border-purple-700 text-white font-semibold text-lg shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <FaBoxes className="text-purple-400" /> Name
            </div>
            <div className="flex items-center gap-2">
              <FaCodeBranch className="text-purple-400" /> SQ Code
            </div>
            <div className="flex items-center gap-2">
              <FaTags className="text-purple-400" /> Category
            </div>
            <div className="flex items-center gap-2">
              <FaCogs className="text-purple-400" /> Application
            </div>
            <div className="flex items-center gap-2">
              <FaEye className="text-purple-400" /> Status
            </div>
          </div>

          {/* Products */}
          {products.map((prod) => (
            <div
              key={prod.prodId}
              className="grid grid-cols-5 gap-4 items-center px-6 py-4 bg-gray-800 rounded-xl border border-gray-700 text-white shadow-md hover:shadow-purple-700 transition duration-300 transform hover:scale-[1.01]"
            >
              <div className="text-lg font-medium">{prod.prodName}</div>
              <div className="text-gray-300">{prod.sqCode}</div>
              <div className="text-purple-300">{getCategoryName(prod.categoryId)}</div>
              <div className="text-blue-300">{getApplicationName(prod.applicationId)}</div>
              <div className="text-green-400 font-semibold">Available</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
