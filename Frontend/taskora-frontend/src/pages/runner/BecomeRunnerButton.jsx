import { useState } from "react";
import { useAuth } from "../../context/UseAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import RunnerConfirmModal from "../../components/common/RunnerConfirmModal";
import api from "../../utils/axios";

const BecomeRunnerButton = ({ className }) => {
  const [showModal, setShowModal] = useState(false);
  const { user ,setUser} = useAuth();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {

      if (!user.isRunner) {
        await api.post(
          "/api/user/apply-runner",
         
        );
      }

      await api.patch(
        "/api/user/switch-role"
      );

      const updatedUser = { ...user, status: "runner", isRunner: true };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      navigate("/runner/active");

      toast.success("You're now a Runner 🎉");
      navigate("/runner/tasks");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to switch role");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`rounded-full px-8 py-3 font-medium transition cursor-pointer ${
          className || "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Become a Runner
      </button>

      {showModal && (
        <RunnerConfirmModal
          onConfirm={handleConfirm}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default BecomeRunnerButton;
