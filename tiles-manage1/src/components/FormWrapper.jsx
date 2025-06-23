// components/FormWrapper.jsx
export default function FormWrapper({ onSubmit, children, message, isSuccess, buttonText }) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 bg-gray-900 p-6 rounded-xl shadow-md ring-1 ring-purple-700/40"
    >
      {children}
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-all duration-200"
      >
        {buttonText}
      </button>
      {message && (
        <p className={`text-sm ${isSuccess ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
