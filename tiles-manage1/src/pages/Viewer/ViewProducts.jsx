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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState("all");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prodRes, catRes, appRes] = await Promise.all([
          getProducts(),
          getCategoryMasters(),
          getApplicationMasters(),
        ]);
        const filteredProducts = prodRes.data.filter((p) => !p.block);
        setProducts(filteredProducts);
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

  // Filter dropdown options based on actual product data
  const usedCategoryIds = [...new Set(products.map((p) => p.categoryId))];
  const usedApplicationIds = [...new Set(products.map((p) => p.applicationId))];

  const filteredCategoryOptions = categories.filter((cat) =>
    usedCategoryIds.includes(cat.categoryId)
  );
  const filteredApplicationOptions = applications.filter((app) =>
    usedApplicationIds.includes(app.applicationId)
  );

  // Final product filter logic
  const filteredProducts = products.filter((p) => {
    const categoryMatch =
      selectedCategory === "all" || p.categoryId === Number(selectedCategory);
    const applicationMatch =
      selectedApplication === "all" ||
      p.applicationId === Number(selectedApplication);
    return categoryMatch && applicationMatch;
  });

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

      {/* Filters */}
      <div className="flex justify-center gap-6 mb-4">
        {/* Category Filter */}
        <select
          className="bg-gray-900 text-white border border-purple-700 px-4 py-2 rounded-xl"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {filteredCategoryOptions.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Application Filter */}
        <select
          className="bg-gray-900 text-white border border-purple-700 px-4 py-2 rounded-xl"
          value={selectedApplication}
          onChange={(e) => setSelectedApplication(e.target.value)}
        >
          <option value="all">All Applications</option>
          {filteredApplicationOptions.map((app) => (
            <option key={app.applicationId} value={app.applicationId}>
              {app.name}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-300 text-center text-lg mt-6">
          No products available.
        </p>
      ) : (
        <div className="space-y-4">
          {/* Table Header */}
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

          {/* Product Rows */}
          {filteredProducts.map((prod) => (
            <div
              key={prod.prodId}
              className="grid grid-cols-5 gap-4 items-center px-6 py-4 bg-gray-800 rounded-xl border border-gray-700 text-white shadow-md hover:shadow-purple-700 transition duration-300 transform hover:scale-[1.01]"
            >
              <div className="text-lg font-medium">{prod.prodName}</div>
              <div className="text-gray-300">{prod.sqCode}</div>
              <div className="text-purple-300">
                {getCategoryName(prod.categoryId)}
              </div>
              <div className="text-blue-300">
                {getApplicationName(prod.applicationId)}
              </div>
              <div className="text-green-400 font-semibold">Available</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
