export default function ListTable({ columns, data, renderRow }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md ring-1 ring-purple-700/40">
      <h2 className="text-white text-xl mb-4">Existing Items</h2>
      {data.length === 0 ? (
        <p className="text-gray-400">No items found.</p>
      ) : (
        <div className="space-y-2">
          <div
            className={`grid grid-cols-${columns.length} font-semibold text-white border-b border-purple-700 pb-2 mb-2`}
          >
            {columns.map((col, idx) => (
              <div key={idx} className={col.className || ""}>
                {col.label}
              </div>
            ))}
          </div>
          {data.map(renderRow)}
        </div>
      )}
    </div>
  );
}
