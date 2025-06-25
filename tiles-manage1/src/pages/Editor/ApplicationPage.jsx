import { Pencil, Trash2 } from "lucide-react";
import useCrudHandler from "../../hooks/useCrudHandler";
import FormWrapper from "../../components/FormWrapper";
import ListTable from "../../components/ListTable";
import {
  getApplicationMasters,
  createApplicationMaster,
  updateApplicationMaster,
  deleteApplicationMaster,
} from "../../api/ApplicationMasterApi";

export default function ApplicationPage() {
  const {
    formData,
    setFormData,
    listData: applications,
    editing,
    message,
    isSuccess,
    handleSubmit,
    handleEdit,
    handleDelete,
  } = useCrudHandler({
    getList: getApplicationMasters,
    createItem: createApplicationMaster,
    updateItem: updateApplicationMaster,
    deleteItem: deleteApplicationMaster,
    getItemId: (item) => item.applicationId,
    emptyForm: {
      applicationId: null,
      name: "",
      block: "0", // default is visible (0)
    },
    getPayload: (data) => {
      const payload = {
        name: data.name.trim(),
        block: data.block === "1", // convert "1"/"0" to true/false
      };

      if (data.applicationId !== null) {
        payload.applicationId = data.applicationId; // only send during update
      }

      return payload;
    },
  });

  return (
    <div className="space-y-8">
      {/* Form */}
      <FormWrapper
        onSubmit={handleSubmit}
        message={message}
        isSuccess={isSuccess}
        buttonText={editing ? "Update Application" : "Add Application"}
      >
        <input
          type="text"
          name="name"
          placeholder="Application Name"
          value={formData.name}
          required
          className="w-full bg-gray-800 text-white border border-purple-600 p-2 rounded"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
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

      {/* Table */}
      <ListTable
        columns={[
          { label: "Name" },
          { label: "Status" },
          { label: "Actions", className: "text-right" },
        ]}
        data={applications}
        renderRow={(app) => (
          <div
            key={app.applicationId}
            className="grid grid-cols-3 items-center text-white bg-gray-800 px-4 py-2 rounded border border-purple-600"
          >
            <div>{app.name}</div>
            <div className={app.block ? "text-red-400" : "text-green-400"}>
              {app.block ? "Blocked" : "Visible"}
            </div>
            <div className="text-right space-x-4">
              <button
                onClick={() => handleEdit(app)}
                className="text-blue-400 hover:text-blue-600"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(app.applicationId)}
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
