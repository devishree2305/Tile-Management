import { useState, useEffect } from "react";
import Swal from "sweetalert2";

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
      console.log("Payload being sent to create:", payload);

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
      console.log("Payload being sent to create:", payload);
      showMessage("❌ Failed to process request.", false);
      showMessage("Payload being sent to create:", payload);
      console.log("Payload being sent to create:", payload);
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
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to undo this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#9333ea", // Tailwind's purple-600
    cancelButtonColor: "#6b7280",  // Tailwind's gray-500
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    background: "#1f2937",         // Tailwind's gray-800
    color: "#fff",
  });

  if (result.isConfirmed) {
    try {
      await deleteItem(id);
      showMessage("✅ Deleted successfully!", true);
      fetchData();

      Swal.fire({
        title: "Deleted!",
        text: "The item has been removed.",
        icon: "success",
        confirmButtonColor: "#9333ea",
        background: "#1f2937",
        color: "#fff",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("❌ Delete failed:", err);
      showMessage("❌ Failed to delete.", false);

      Swal.fire({
        title: "Error!",
        text: "Failed to delete item.",
        icon: "error",
        confirmButtonColor: "#9333ea",
        background: "#1f2937",
        color: "#fff",
      });
    }
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