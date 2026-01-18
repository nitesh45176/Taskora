import {  useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const RunnerDashboard = () => {
  const [stats, setStats] = useState({
    open: 0,
    active: 0,
    completed: 0,
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const [openRes, myRes] = await Promise.all([
        axios.get("http://localhost:5000/api/tasks/task", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/tasks/task/my-accepted", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const openTasks = openRes.data.tasks;
      const myTasks = myRes.data.tasks;

      setStats({
        open: openTasks.length,
        active: myTasks.filter(t =>
          ["ACCEPTED", "IN_PROGRESS", "DELIVERED"].includes(t.status)
        ).length,
        completed: myTasks.filter(t => t.status === "COMPLETED").length,
      });
    } catch (err) {
      console.log(err)
      toast.error("Failed to load runner dashboard");
    }
  };


    fetchStats();


  return (
    <div className="min-h-screen bg-[#0B1220] pt-32 px-10 text-white">
      <h1 className="text-3xl font-bold mb-10">Runner Dashboard</h1>
      

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard label="Open Tasks" value={stats.open} />
        <StatCard label="Active Tasks" value={stats.active} />
        <StatCard label="Completed" value={stats.completed} />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActionCard
          title="Browse Open Tasks"
          desc="Find tasks you can accept"
          link="/runner/tasks"
        />

        <ActionCard
          title="My Active Task"
          desc="View your current task"
          link="/runner/active"
        />
      </div>
    </div>
  );
};

export default RunnerDashboard;


/* UI blocks */

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
