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
    <div className="min-h-screen bg-[#0B1220] p-10 pt-40">
      <h1 className="text-3xl font-bold text-white mb-8">My Tasks</h1>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-[#121A2B] border border-[#1E2A45] rounded-xl p-6 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg text-white font-semibold">{task.title}</h3>
              <p className="text-slate-400 text-sm">
                {task.pickupLocation.masked} → {task.dropLocation.masked}
              </p>
            </div>

            <div className="text-right">
              <p className="text-slate-400 text-sm mt-1">₹ {task.price}</p>
              <StatusBadge status={task.status} />

              {task.status === "DELIVERED" && (
                <button
                  onClick={() => markCompleted(task._id)}
                  className="mt-2 bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-1 rounded-lg text-sm"
                >
                  Confirm Completion
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
