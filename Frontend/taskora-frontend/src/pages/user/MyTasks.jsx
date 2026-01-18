import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/common/StatusBadge";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks/task/my-created",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load your tasks");
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (taskId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tasks/task/${taskId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Task marked as completed");
      fetchTasks(); // refresh UI
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to complete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B1220] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-semibold text-white mb-3">
          No Tasks Posted
        </h2>
        <p className="text-slate-400 mb-6">You haven’t posted any tasks yet.</p>
        <Link
          to="/tasks/create"
          className="bg-blue-500 px-6 py-3 rounded-xl text-white"
        >
          Post Your First Task
        </Link>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-[#0B1220] pt-32 px-6 flex justify-center">
    <div className="w-full max-w-6xl">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">My Tasks</h1>
        <p className="text-slate-400 mt-1">
          Track all tasks you’ve posted and their progress
        </p>
        
      </div>
      <Link
          to="/user"
          className="inline-flex items-center text-slate-400 hover:text-white mb-4"
        >
          ← Back to Dashboard
        </Link>

      <div className="space-y-5">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-[#121A2B] border border-[#1E2A45] rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between hover:border-blue-500/30 transition"
          >
            {/* Left */}
            <div>
              <h3 className="text-xl text-white font-semibold">
                {task.title}
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                {task.pickupLocation.masked} → {task.dropLocation.masked}
              </p>

              <div className="mt-3">
                <StatusBadge status={task.status} />
              </div>
            </div>

            {/* Right */}
            <div className="mt-6 md:mt-0 flex flex-col items-end gap-3 text-right">
              <p className="text-white font-semibold">
                ₹ {task.price}
              </p>

              <div className="flex items-center gap-4">
                <Link
                  to={`/user/task/${task._id}`}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View details →
                </Link>

                {task.status === "DELIVERED" && (
                  <button
                    onClick={() => markCompleted(task._id)}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl text-white text-sm font-medium transition"
                  >
                    Confirm Completion
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
);

};

export default MyTasks;
