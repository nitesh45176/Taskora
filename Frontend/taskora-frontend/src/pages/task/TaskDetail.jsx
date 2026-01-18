import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import StatusBadge from "../../components/common/StatusBadge";
import { useAuth } from "../../context";
import TaskProgress from "../../components/common/TaskProgress";
import ConfirmModal from "../../components/common/ConfirmModal";

const TaskDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setTask(res.data.task);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load task");
    } finally {
      setLoading(false);
    }
  };

  const startTask = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tasks/task/${id}/start`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      toast.success("Task started");
      fetchTask();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to start");
    }
  };

  const markDelivered = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tasks/task/${id}/deliver`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      toast.success("Marked as delivered");
      fetchTask();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to deliver");
    }
  };

  const confirmCompletion = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tasks/task/${id}/complete`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      toast.success("Task completed 🎉");
      fetchTask();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to complete");
    }
  };

  const cancelTaskByUser = async () => {
    if (!window.confirm("Cancel this task?")) return;

    try {
      await axios.patch(
        `http://localhost:5000/api/tasks/task/${id}/cancel/user`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Task cancelled");
      navigate("/user/tasks");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to cancel task");
    }
  };

  const cancelTaskByRunner = async () => {
    if (!window.confirm("Cancel this task and release it back to marketplace?"))
      return;

    try {
      await axios.patch(
        `http://localhost:5000/api/tasks/task/${id}/cancel/runner`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Task cancelled");
      navigate("/runner/tasks");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to cancel task");
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!task) return <div className="text-white p-10">Task not found</div>;

  return (
    <div className="min-h-screen bg-[#0B1220] p-10 pt-40 text-white">
      <div className="max-w-3xl mx-auto bg-[#121A2B] border border-[#1E2A45] rounded-xl p-8">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold">{task.title}</h1>
          <StatusBadge status={task.status} />
        </div>

        <p className="text-slate-400 mt-2">
          {task.pickupLocation.masked} → {task.dropLocation.masked}
        </p>

        <p className="mt-4 text-slate-300">{task.description}</p>

        <p className="mt-4 text-lg font-semibold">₹ {task.price}</p>

        <TaskProgress status={task.status} />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Runner actions */}
          {user?.status === "runner" && task.status === "ACCEPTED" && (
            <button
              onClick={startTask}
              className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl text-white font-medium transition"
            >
              🚀 Start Task
            </button>
          )}

          {user?.status === "runner" && task.status === "IN_PROGRESS" && (
            <button
              onClick={markDelivered}
              className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl text-white font-medium transition"
            >
              📦 Mark Delivered
            </button>
          )}

          {/* User action */}
          {user?.status === "user" && task.status === "DELIVERED" && (
            <button
              onClick={confirmCompletion}
              className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl text-white font-medium transition"
            >
              ✅ Confirm Completion
            </button>
          )}

          {/* USER CANCEL */}
          {user?.status === "user" &&
            ["OPEN", "ACCEPTED"].includes(task.status) && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="w-full border border-orange-500/60 text-orange-400 hover:bg-orange-500/10 py-3 rounded-xl"
              >
                ⚠ Cancel & Release Task
              </button>
            )}

          {/* RUNNER CANCEL */}
          {user?.status === "runner" && task.status === "ACCEPTED" && (
            <button
              onClick={cancelTaskByRunner}
              className="w-full border border-orange-500/60 text-orange-400 hover:bg-orange-500/10 py-3 rounded-xl font-medium transition"
            >
              ⚠ Cancel & Release Task
            </button>
          )}

          {task.status === "CANCELLED" && (
            <p className="text-red-400 mt-6 text-center text-sm">
              This task has been cancelled
            </p>
          )}

          <ConfirmModal
            open={showCancelModal}
            title="Cancel Task?"
            description="Do you want to delete the task?"
            confirmText="Yes, Cancel"
            danger
            onCancel={() => setShowCancelModal(false)}
            onConfirm={async () => {
              setShowCancelModal(false);
              await cancelTaskByUser();
            }}
          />
        </div>

        <Link
          to={user?.status === "runner" ? "/runner/active" : "/user/tasks"}
          className="inline-block mt-10 border border-[#1E2A45] px-6 py-3 rounded-xl text-slate-300 hover:text-white hover:border-blue-500 transition"
        >
          ← Go back
        </Link>
      </div>
    </div>
  );
};

export default TaskDetail;
