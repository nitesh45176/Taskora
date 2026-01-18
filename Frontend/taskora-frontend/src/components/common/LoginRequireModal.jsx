import { Link } from "react-router-dom";

const LoginRequiredModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#121A2B] border border-[#1E2A45] rounded-2xl p-8 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          Login Required
        </h2>

        <p className="text-slate-400 mb-6">
          You need to login to continue with this action.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-[#1E2A45] text-slate-300 hover:text-white"
          >
            Cancel
          </button>

          <Link
            to="/login"
            className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
