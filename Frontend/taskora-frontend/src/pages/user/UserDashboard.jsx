import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const UserDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks/task/my-created",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const tasks = res.data.tasks;

      setStats({
        total: tasks.length,
        active: tasks.filter(t =>
          ["OPEN", "ACCEPTED", "IN_PROGRESS", "DELIVERED"].includes(t.status)
        ).length,
        completed: tasks.filter(t => t.status === "COMPLETED").length,
      });
    } catch {
      toast.error("Failed to load dashboard");
    }
  };

  fetchStats();

  return (
    <div className="min-h-screen bg-[#0B1220] pt-42 px-10 text-white">
      <h1 className="text-3xl font-bold mb-10">User Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard label="Total Tasks" value={stats.total} />
        <StatCard label="Active Tasks" value={stats.active} />
        <StatCard label="Completed Tasks" value={stats.completed} />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActionCard
          title="Post a New Task"
          desc="Create a new task and assign a runner"
          link="/user/create"
        />

        <ActionCard
          title="View My Tasks"
          desc="Track and manage your posted tasks"
          link="/user/tasks"
        />
      </div>
    </div>
  );
};

export default UserDashboard;

/* UI Components */

const StatCard = ({ label, value }) => (
  <div className="bg-[#121A2B] border border-[#1E2A45] rounded-xl p-6">
    <p className="text-slate-400 text-sm">{label}</p>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
  </div>
);

const ActionCard = ({ title, desc, link }) => (
  <Link
    to={link}
    className="bg-[#121A2B] border border-[#1E2A45] rounded-xl p-8 hover:border-blue-500 transition"
  >
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-slate-400 mt-2">{desc}</p>
  </Link>
);
