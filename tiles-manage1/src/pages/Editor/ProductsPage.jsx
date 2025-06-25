import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import useCrudHandler from "../../hooks/useCrudHandler";
import FormWrapper from "../../components/FormWrapper";
import ListTable from "../../components/ListTable";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/ProductsApi";
import { getCategoryMasters } from "../../api/CategoryMasterApi";
import { getApplicationMasters } from "../../api/ApplicationMasterApi";

export default function ProductsPage() {
  const {
    formData,
    setFormData,
    listData: products,
    editing,
    message,
    isSuccess,
    handleSubmit,
    handleEdit,
    handleDelete,
  } = useCrudHandler({
    getList: getProducts,
    createItem: createProduct,
    updateItem: updateProduct,
    deleteItem: deleteProduct,
    getItemId: (item) => item.prodId,
    emptyForm: {
      prodId: null,
      prodName: "",
      sqCode: "",
      categoryId: "",
      applicationId: "",
      block: "0",
    },
    getPayload: (data) => {
      const payload = {
        prodName: data.prodName.trim(),
        sqCode: data.sqCode.trim(),
        categoryId: parseInt(data.categoryId),
        applicationId: parseInt(data.applicationId),
        block: data.block === "1", // convert string to boolean
      };

      if (data.prodId !== null) {
        payload.prodId = data.prodId;
      }

      return payload;
    },
  });

  const [categories, setCategories] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getCategoryMasters().then((res) => setCategories(res.data));
    getApplicationMasters().then((res) => setApplications(res.data));
  }, []);

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.categoryId === id);
    return cat ? cat.name : "N/A";
  };

  const getApplicationName = (id) => {
    const app = applications.find((a) => a.applicationId === id);
    return app ? app.name : "N/A";
  };

  return (
    <div className="space-y-8">
      {/* Product Form */}
      <FormWrapper
        onSubmit={handleSubmit}
        message={message}
        isSuccess={isSuccess}
        buttonText={editing ? "Update Product" : "Add Product"}
      >
        <input
          type="text"
          name="prodName"
          placeholder="Product Name"
          className="w-full bg-gray-800 text-white border border-purple-600 p-2 rounded"
          value={formData.prodName}
          onChange={(e) => setFormData({ ...formData, prodName: e.target.value })}
          required
        />
        <input
          type="text"
          name="sqCode"
          placeholder="SQ Code"
          className="w-full bg-gray-800 text-white border border-purple-600 p-2 rounded"
          value={formData.sqCode}
          onChange={(e) => setFormData({ ...formData, sqCode: e.target.value })}
          required
        />
        <select
          name="categoryId"
          value={formData.categoryId}
          className="w-full bg-gray-800 text-white border border-purple-600 p-2 rounded"
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories
            .filter((c) => !c.block)
            .map((c) => (
              <option key={c.categoryId} value={c.categoryId}>
                {c.name}
              </option>
            ))}
        </select>
        <select
          name="applicationId"
          value={formData.applicationId}
          className="w-full bg-gray-800 text-white border border-purple-600 p-2 rounded"
          onChange={(e) => setFormData({ ...formData, applicationId: e.target.value })}
          required
        >
          <option value="">Select Application</option>
          {applications
            .filter((a) => !a.block)
            .map((a) => (
              <option key={a.applicationId} value={a.applicationId}>
                {a.name}
              </option>
            ))}
        </select>
        <select
          name="block"
          value={formData.block}
          className="w-full bg-gray-800 text-white border border-purple-600 p-2 rounded"
          onChange={(e) => setFormData({ ...formData, block: e.target.value })}
        >
          <option value="0">Visible</option>
          <option value="1">Blocked</option>
        </select>
      </FormWrapper>

      {/* Product Table */}
      <ListTable
        columns={[
          { label: "Name" },
          { label: "SQ Code" },
          { label: "Category" },
          { label: "Application" },
          { label: "Status" },
          { label: "Actions", className: "text-right" },
        ]}
        data={products}
        renderRow={(prod) => (
          <div
            key={prod.prodId}
            className="grid grid-cols-6 items-center text-white bg-gray-800 px-4 py-2 rounded border border-purple-600"
          >
            <div>{prod.prodName}</div>
            <div>{prod.sqCode}</div>
            <div className="text-purple-400">{getCategoryName(prod.categoryId)}</div>
            <div className="text-blue-400">{getApplicationName(prod.applicationId)}</div>
            <div className={prod.block ? "text-red-400" : "text-green-400"}>
              {prod.block ? "Blocked" : "Visible"}
            </div>
            <div className="text-right space-x-4 text-xl">
              <button
                onClick={() => handleEdit(prod)}
                className="text-blue-400 hover:text-blue-600"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(prod.prodId)}
                className="text-red-400 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
