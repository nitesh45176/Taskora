import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import StatCard from "../../components/dashboard/StatCard";
import ActionCard from "../../components/dashboard/ActionCard";
import RecentTasks from "../../components/dashboard/RecentTasks";
import { useAuth } from "../../context";
import api from "../../utils/axios";

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
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
      const res = await api.get(
        "/api/tasks/task/my-created",
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

      // Get 5 most recent tasks
      setRecentTasks(tasks.slice(0, 5));
    } catch (err) {
      console.log(err)
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] pt-32 px-6 md:px-10 text-white pb-20">
      {/* Welcome Section - Choose your style below */}
      
      {/* Option 1: Professional SaaS (No emoji) */}
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {user?.name || "User"}
        </h1>
        <p className="text-slate-400">
          Here's what's happening with your tasks today
        </p>
      </motion.div>

      {/* Option 2: Friendly Startup (With emoji) - Uncomment if you prefer this */}
      {/* 
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {user?.name || "User"}! 👋
        </h1>
        <p className="text-slate-400">
          Here's what's happening with your tasks today
        </p>
      </motion.div>
      */}

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <StatCard
          label="Total Tasks"
          value={stats.total}
          icon="📊"
          color="blue"
          trend="+1 today"
          loading={loading}
          variants={itemVariants}
        />
        <StatCard
          label="Active Tasks"
          value={stats.active}
          icon="⚡"
          color="orange"
          trend={stats.active > 0 ? "Urgent" : "All clear"}
          loading={loading}
          variants={itemVariants}
        />
        <StatCard
          label="Completed"
          value={stats.completed}
          icon="✅"
          color="green"
          trend="+2 this week"
          loading={loading}
          variants={itemVariants}
        />
      </motion.div>

      {/* Action Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ActionCard
          title="Post a New Task"
          desc="Create a new task and assign a runner"
          icon="➕"
          link="/user/create"
          color="blue"
          variants={itemVariants}
        />
        <ActionCard
          title="View My Tasks"
          desc="Track and manage your posted tasks"
          icon="👁️"
          link="/user/tasks"
          color="purple"
          variants={itemVariants}
        />
      </motion.div>

      {/* Recent Tasks Section */}
      {recentTasks.length > 0 && (
        <RecentTasks tasks={recentTasks} loading={loading} />
      )}

      {/* Empty State */}
      {!loading && stats.total === 0 && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-semibold mb-2">No tasks yet</h3>
          <p className="text-slate-400 mb-6">
            Create your first task and get started!
          </p>
          <Link
            to="/user/create"
            className="inline-block px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            Create First Task
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default UserDashboard;