import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link, Navigate, useNavigate } from "react-router-dom";
import StatusBadge from "../../components/common/StatusBadge";
import { useAuth } from "../../context";
import api from "../../utils/axios";

const RunnerTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/api/tasks/task", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTasks(res.data.tasks);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const acceptTask = async (taskId) => {
    try {
      await api.patch(
        `/api/tasks/task/${taskId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Task accepted!");

      const updatedUser = { ...user, status: "runner" };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      navigate("/runner/active"); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Cannot accept task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <div className="text-white p-10">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B1220] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-semibold text-white mb-3">
          No Tasks Available
        </h2>

        <p className="text-slate-400 max-w-md mb-8">
          There are no open tasks right now. Check back in a few minutes — new
          tasks appear as users post them.
        </p>

        <Link
          to="/"
          className="border border-[#1E2A45] px-6 py-3 rounded-xl text-slate-300 hover:text-white hover:border-blue-500 transition"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#0B1220] p-10 pt-40">
        <h1 className="text-3xl font-bold text-white mb-8">Open Tasks</h1>
        <Link
          to="/runner"
          className="inline-flex items-center text-slate-400 hover:text-white mb-4"
        >
          ← Back to Dashboard
        </Link>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-[#121A2B] border border-[#1E2A45] rounded-xl p-6"
            >
              <h3 className="text-xl text-white font-semibold">{task.title}</h3>
              <StatusBadge status={task.status} />

              <p className="text-slate-400 text-sm mt-2">
                {task.pickupLocation.masked} → {task.dropLocation.masked}
              </p>

              <div className="flex justify-between text-slate-300 mt-4">
                <span>₹ {task.price}</span>
                <span>{new Date(task.deadline).toLocaleString()}</span>
              </div>

              <button
                onClick={() => acceptTask(task._id)}
                className="mt-5 w-full cursor-pointer bg-blue-500 py-2 rounded-lg text-white hover:bg-blue-600"
              >
                Accept Task
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RunnerTasks;
