import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/common/StatusBadge";

const RunnerActiveTask = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks/task/my-active",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTask(res.data.task);
    } catch (err) {
      console.error(err)
      toast.error("Failed to load active task");
    } finally {
      setLoading(false);
    }
  };

  const startTask = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tasks/task/${task._id}/start`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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
        `http://localhost:5000/api/tasks/task/${task._id}/deliver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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
    <div className="min-h-screen bg-[#0B1220] flex flex-col items-center justify-center text-center px-6">
      <h2 className="text-2xl font-semibold text-white mb-3">
        No Active Task
      </h2>

      <p className="text-slate-400 max-w-md mb-8">
        You don’t have any task in progress right now.  
        Head back to the marketplace to accept a new task.
      </p>

      <Link
        to="/runner/tasks"
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-white font-medium transition"
      >
        View Open Tasks
      </Link>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-[#0B1220] p-10 pt-40">
      <h1 className="text-3xl font-bold text-white mb-6">My Active Task</h1>

      <div className="bg-[#121A2B] border border-[#1E2A45] rounded-xl p-8 max-w-xl">
        <h2 className="text-2xl text-white font-semibold">
          {task.title}
        </h2>

        <p className="text-slate-400 mt-2">
          {task.pickupLocation.masked} → {task.dropLocation.masked}
        </p>

        <p className="text-slate-300 mt-4">
          Status:{" "}
          <StatusBadge status={task.status} />

        </p>

        <div className="mt-6 flex gap-4">
          {task.status === "ACCEPTED" && (
            <button
              onClick={startTask}
              className="bg-blue-500 px-6 py-2 rounded-lg text-white cursor-pointer hover:bg-blue-600"
            >
              Start Task
            </button>
          )}

          {task.status === "IN_PROGRESS" && (
            <button
              onClick={markDelivered}
              className="bg-green-500 hover:bg-green-600 cursor-pointer px-6 py-2 rounded-lg text-white"
            >
              Mark Delivered
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RunnerActiveTask;
