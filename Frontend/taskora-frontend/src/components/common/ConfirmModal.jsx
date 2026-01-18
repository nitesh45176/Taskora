const ConfirmModal = ({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  danger = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 mt-32 backdrop-blur-sm">
      <div className="bg-[#121A2B] border border-[#1E2A45] rounded-2xl p-6 w-full max-w-md shadow-xl animate-fadeIn">
        <h2 className="text-xl font-semibold text-white">{title}</h2>

        <p className="mt-3 text-slate-400 text-sm">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-[#1E2A45] text-slate-300 hover:text-white transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-5 py-2 rounded-lg font-medium text-white transition
              ${
                danger
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
