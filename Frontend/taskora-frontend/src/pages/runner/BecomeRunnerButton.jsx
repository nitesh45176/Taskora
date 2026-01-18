import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/UseAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import RunnerConfirmModal from "../../components/common/RunnerConfirmModal";

const BecomeRunnerButton = ({ className }) => {
  const [showModal, setShowModal] = useState(false);
  const { user ,setUser} = useAuth();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!user.isRunner) {
        await axios.post(
          "http://localhost:5000/api/user/apply-runner",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      await axios.patch(
        "http://localhost:5000/api/user/switch-role",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
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
