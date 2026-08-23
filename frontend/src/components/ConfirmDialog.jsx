const ConfirmDialog = ({ onConfirm, onCancel, loading }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-8 w-[400px]">
        <h2 className="text-2xl font-semibold mb-4">Delete Book?</h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this book?
        </p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="w-full p-2 border rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={`w-full p-2 text-white rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Deleting" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
