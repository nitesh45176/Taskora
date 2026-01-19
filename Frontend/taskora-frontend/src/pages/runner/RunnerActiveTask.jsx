import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/common/StatusBadge";
import api from "../../utils/axios";

const RunnerActiveTask = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      const res = await api.get(
        "/api/tasks/task/my-active",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTask(res.data.task);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load active task");
    } finally {
      setLoading(false);
    }
  };

  const startTask = async () => {
    try {
      await api.patch(
        `/api/tasks/task/${task._id}/start`
      );
      toast.success("Task started");
      fetchTask();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to start");
    }
  };

  const markDelivered = async () => {
    try {
      await api.patch(
        `/api/tasks/task/${task._id}/deliver`
      );
      toast.success("Task delivered");
      fetchTask();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to mark delivered");
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  if (loading) return <div className="text-white p-10">Loading...</div>;

 if (!task) {
  return (
    <div className=" bg-[#0B1220] pt-32 px-6 flex justify-center">
      <div className="w-full max-w-xl text-center bg-[#121A2B] border border-[#1E2A45] rounded-2xl shadow-xl p-10">


        <h2 className="text-3xl font-semibold text-white mb-4">
          Task Delivered 🎉
        </h2>

        <p className="text-slate-400 mb-8">
          You’ve successfully completed the task.  
          Great work — you can now accept new tasks.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/runner"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-white font-medium transition"
          >
            Back to Dashboard
          </Link>

          <Link
            to="/runner/tasks"
            className="border border-[#1E2A45] hover:border-blue-500 px-6 py-3 rounded-xl text-slate-300 hover:text-white transition"
          >
            View Open Tasks
          </Link>
        </div>

      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-[#0B1220] pt-32 px-6 flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="mb-8">
          <Link
            to="/runner"
            className="inline-flex items-center text-slate-400 hover:text-white mb-4"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="text-3xl font-bold text-white">My Active Task</h1>
          <p className="text-slate-400 mt-1">
            Complete this task to unlock new jobs
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#121A2B] border border-[#1E2A45] rounded-2xl shadow-xl p-8">
          {/* Title + Status */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {task.title}
              </h2>
              <p className="text-slate-400 mt-1 text-sm">
                {task.pickupLocation.masked} → {task.dropLocation.masked}
              </p>
            </div>

            <StatusBadge status={task.status} />
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-[#1E2A45]" />

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-slate-400">Pickup</p>
              <p className="text-white mt-1">{task.pickupLocation.masked}</p>
            </div>

            <div>
              <p className="text-slate-400">Drop</p>
              <p className="text-white mt-1">{task.dropLocation.masked}</p>
            </div>
          </div>

          {/* Open Task */}
          <Link
            to={`/runner/task/${task._id}`}
            className="inline-block mt-6 text-blue-400 hover:text-blue-300 text-sm"
          >
            View full task details →
          </Link>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            {task.status === "ACCEPTED" && (
              <button
                onClick={startTask}
                className="flex-1 bg-blue-500 hover:bg-blue-600 py-3 rounded-xl text-white font-medium transition"
              >
                🚀 Start Task
              </button>
            )}

            {task.status === "IN_PROGRESS" && (
              <button
                onClick={markDelivered}
                className="flex-1 bg-green-500 hover:bg-green-600 py-3 rounded-xl text-white font-medium transition"
              >
                📦 Mark as Delivered
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunnerActiveTask;
