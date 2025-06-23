import { useState, useEffect } from "react";

export default function useCrudHandler({
  getList,
  createItem,
  updateItem,
  deleteItem,
  getItemId,
  emptyForm,
  getPayload,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [listData, setListData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getList();
      setListData(res.data);
    } catch (err) {
      console.error("❌ Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = getPayload(formData);

      if (editing) {
        await updateItem(getItemId(formData), { ...payload });
        showMessage("✅ Updated successfully!", true);
      } else {
        await createItem(payload);
        showMessage("✅ Added successfully!", true);
      }

      resetForm();
      fetchData();
    } catch (err) {
      console.error("❌ Submit failed:", err);
      showMessage("❌ Failed to process request.", false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      ...emptyForm,
      ...item,
      block: item.block ? "1" : "0",
    });
    setEditing(true);
    showMessage(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteItem(id);
      showMessage("✅ Deleted successfully!", true);
      fetchData();
    } catch (err) {
      console.error("❌ Delete failed:", err);
      showMessage("❌ Failed to delete.", false);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditing(false);
  };

  const showMessage = (msg, success = true) => {
    setMessage(msg);
    setIsSuccess(success);
  };

  return {
    formData,
    setFormData,
    listData,
    setListData,
    editing,
    setEditing,
    message,
    isSuccess,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    showMessage,
  };
}