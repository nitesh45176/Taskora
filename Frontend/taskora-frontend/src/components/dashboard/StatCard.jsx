import { motion } from "framer-motion";

const StatCard = ({ label, value, icon, color, trend, loading, variants }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
      hover: "hover:border-blue-500/60"
    },
    orange: {
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
      text: "text-orange-400",
      hover: "hover:border-orange-500/60"
    },
    green: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      text: "text-green-400",
      hover: "hover:border-green-500/60"
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  if (loading) {
    return (
      <motion.div
        variants={variants}
        className="bg-[#121A2B] border border-[#1E2A45] rounded-xl p-6 animate-pulse"
      >
        <div className="h-4 bg-slate-700 rounded w-24 mb-4"></div>
        <div className="h-8 bg-slate-700 rounded w-16"></div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`bg-[#121A2B] border ${colors.border} rounded-xl p-6 transition-all duration-300 cursor-pointer ${colors.hover} group`}
      style={{
        boxShadow: color === 'blue' 
          ? '0 0 20px rgba(59, 130, 246, 0.15)' 
          : color === 'orange'
          ? '0 0 20px rgba(249, 115, 22, 0.15)'
          : '0 0 20px rgba(34, 197, 94, 0.12)'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h2 className="text-4xl font-bold text-white">
              {value}
            </h2>
            {trend && (
              <span className={`text-xs ${colors.text} font-medium`}>
                {trend}
              </span>
            )}
          </div>
        </div>
        
        <motion.div
          className={`text-3xl ${colors.bg} p-3 rounded-lg`}
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {icon}
        </motion.div>
      </div>

      {/* Progress bar (optional visual) */}
      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${colors.text.replace('text-', 'bg-')}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((value / 10) * 100, 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

export default StatCard;