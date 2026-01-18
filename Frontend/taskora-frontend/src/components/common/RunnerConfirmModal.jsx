

const RunnerConfirmModal = ({ onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 mt-72 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#121A2B] border border-[#1E2A45] rounded-2xl p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          Switch to Runner Mode?
        </h2>

        <p className="text-slate-400 mb-6">
          You won’t be able to post tasks while acting as a runner.  
          You can switch back later if you have no active tasks.
        </p>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer py-2 rounded-lg border border-[#1E2A45] text-slate-300 hover:bg-[#1E2A45]"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 cursor-pointer py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Become Runner
          </button>
        </div>
      </div>
    </div>
  );
};

export default RunnerConfirmModal;
