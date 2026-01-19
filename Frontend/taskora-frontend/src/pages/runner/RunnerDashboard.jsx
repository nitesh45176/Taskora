import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import RunnerStatCard from "../../components/dashboard/RunnerStatCard";
import RunnerActionCard from "../../components/dashboard/RunnerActionCard";
import { useAuth } from "../../context";
import RunnerRecentTasks from "../../components/dashboard/RunnerRecentTasks";
import api from "../../utils/axios";

const RunnerDashboard = () => {
  const [earnings, setEarnings] = useState(0);

  const { user } = useAuth();
  const [stats, setStats] = useState({
    open: 0,
    active: 0,
    completed: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const [openRes, myRes] = await Promise.all([
        api.get("/api/tasks/task", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get("/api/tasks/task/my-accepted", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const openTasks = openRes.data.tasks;
      const myTasks = myRes.data.tasks;


      const completedTasks = myTasks.filter(
        (task) => task.status === "COMPLETED",
      );

      const totalEarnings = completedTasks.reduce(
        (sum, task) => sum + Number(task.price),
        0,
      );

      setEarnings(totalEarnings);

      setStats({
        open: openTasks.length,
        active: myTasks.filter((t) =>
          ["ACCEPTED", "IN_PROGRESS", "DELIVERED"].includes(t.status),
        ).length,
        completed: myTasks.filter((t) => t.status === "COMPLETED").length,
      });

      // Get 5 most recent tasks
      setRecentTasks(myTasks.slice(0, 5));
    } catch (err) {
      console.log(err);
      toast.error("Failed to load runner dashboard");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0B1220] pt-32 px-6 md:px-10 text-white pb-20">
      {/* Welcome Section - Professional (No emoji) */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2">
          Welcome, {user?.name || "Runner"}
        </h1>
        <p className="text-slate-400">
          Ready to earn? Check out available tasks and manage your active work
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <RunnerStatCard
          label="Open Tasks"
          value={stats.open}
          icon="📋"
          color="blue"
          trend="Available now"
          loading={loading}
          variants={itemVariants}
        />
        <RunnerStatCard
          label="Active Tasks"
          value={stats.active}
          icon="⚡"
          color="orange"
          trend={stats.active > 0 ? "In progress" : ""}
          loading={loading}
          variants={itemVariants}
        />
        <RunnerStatCard
          label="Completed"
          value={stats.completed}
          earnings={earnings}
          icon="✅"
          color="green"
          loading={loading}
          variants={itemVariants}
        />
      </motion.div>

      {/* Action Cards - Browse is PRIMARY */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <RunnerActionCard
          title="Browse Open Tasks"
          desc="Find tasks you can accept and start earning"
          icon="🔍"
          link="/runner/tasks"
          color="blue"
          variants={itemVariants}
          isPrimary={true} // THIS IS THE PRIMARY ACTION
        />
        <RunnerActionCard
          title="My Active Tasks"
          desc="View and manage your current tasks"
          icon="📦"
          link="/runner/active"
          color="purple"
          variants={itemVariants}
          isPrimary={false} // Secondary action
        />
      </motion.div>

      {/* Recent Tasks Section */}
      {recentTasks.length > 0 && (
        <RunnerRecentTasks tasks={recentTasks} loading={loading} />
      )}

      {/* Empty State */}
      {!loading && stats.active === 0 && stats.completed === 0 && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-2xl font-semibold mb-2">
            Ready to start earning?
          </h3>
          <p className="text-slate-400 mb-6">
            Browse available tasks and accept your first job
          </p>
          <Link
            to="/runner/tasks"
            className="inline-block px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            Browse Tasks
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default RunnerDashboard;
