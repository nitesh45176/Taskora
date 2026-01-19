import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, CheckCircle, AlertCircle, Play, Package } from "lucide-react";

const RecentTasks = ({ tasks, loading }) => {
  const getStatusIcon = (status) => {
    const iconMap = {
      OPEN: <Clock className="w-5 h-5" />,
      ACCEPTED: <Play className="w-5 h-5" />,
      IN_PROGRESS: <Package className="w-5 h-5" />,
      DELIVERED: <AlertCircle className="w-5 h-5" />,
      COMPLETED: <CheckCircle className="w-5 h-5" />
    };
    return iconMap[status] || <Clock className="w-5 h-5" />;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      OPEN: "text-slate-400 bg-slate-500/10",
      ACCEPTED: "text-blue-400 bg-blue-500/10",
      IN_PROGRESS: "text-yellow-400 bg-yellow-500/10",
      DELIVERED: "text-orange-400 bg-orange-500/10",
      COMPLETED: "text-green-400 bg-green-500/10"
    };
    return colorMap[status] || "text-slate-400 bg-slate-500/10";
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-[#121A2B] border border-[#1E2A45] rounded-xl p-8">
        <div className="h-6 bg-slate-700 rounded w-48 mb-6 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-slate-700/50 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#121A2B] border border-[#1E2A45] rounded-xl p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          📋 Recent Tasks
        </h2>
        <Link
          to="/user/tasks"
          className="text-sm text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
        >
          View All
          <span>→</span>
        </Link>
      </div>

      {/* Tasks List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {tasks.map((task, index) => (
          <motion.div
            key={task._id || index}
            variants={itemVariants}
            whileHover={{ x: 4 }}
            className="group bg-[#0B1220] border border-[#1E2A45] rounded-lg p-4 hover:border-blue-500/40 transition-all cursor-pointer"
          >
            <Link to={`/user/task/${task._id}`} className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                {/* Status Icon - no hover animation */}
                <div className={`p-2 rounded-lg ${getStatusColor(task.status)}`}>
                  {getStatusIcon(task.status)}
                </div>

                {/* Task Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition">
                    {task.title || "Untitled Task"}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {task.description?.substring(0, 60)}
                    {task.description?.length > 60 ? "..." : ""}
                  </p>
                </div>

                {/* Status Badge */}
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {formatStatus(task.status)}
                </div>
              </div>

              {/* Arrow */}
              <div className="text-slate-400 group-hover:text-blue-400 ml-4 transition-colors">
                →
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">📭</div>
          <p className="text-slate-400">No recent tasks</p>
        </div>
      )}
    </motion.div>
  );
};

export default RecentTasks;