import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const RunnerActionCard = ({ title, desc, icon, link, color, variants, isPrimary = false }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-500/5",
      border: "border-blue-500/20",
      text: "text-blue-400",
      hover: "hover:bg-blue-500/10 hover:border-blue-500/50",
      primaryBg: "bg-blue-500/10",
      primaryBorder: "border-blue-500/40"
    },
    purple: {
      bg: "bg-purple-500/5",
      border: "border-purple-500/20",
      text: "text-purple-400",
      hover: "hover:bg-purple-500/10 hover:border-purple-500/50",
      primaryBg: "bg-purple-500/10",
      primaryBorder: "border-purple-500/40"
    },
    green: {
      bg: "bg-green-500/5",
      border: "border-green-500/20",
      text: "text-green-400",
      hover: "hover:bg-green-500/10 hover:border-green-500/50",
      primaryBg: "bg-green-500/10",
      primaryBorder: "border-green-500/40"
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  // Primary card gets stronger styling
  const cardBg = isPrimary ? colors.primaryBg : colors.bg;
  const cardBorder = isPrimary ? colors.primaryBorder : colors.border;

  return (
    <Link to={link}>
      <motion.div
        variants={variants}
        whileHover={{ y: -4, scale: 1.01 }}
        className={`group ${cardBg} bg-[#121A2B] border ${cardBorder} rounded-xl p-8 transition-all duration-300 cursor-pointer ${colors.hover} relative overflow-hidden ${isPrimary ? 'ring-1 ring-blue-500/20' : ''}`}
      >
        {/* Subtle background gradient effect */}
        <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        <div className="relative z-10">
          {/* Icon - static, no rotation */}
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${colors.bg} mb-6 ${isPrimary ? 'ring-1 ring-blue-500/30' : ''}`}>
            <span className="text-3xl">{icon}</span>
          </div>

          {/* Content */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-between">
              {title}
              {isPrimary && (
                <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 font-medium">
                  Start Here
                </span>
              )}
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="ml-auto"
              >
                <ArrowRight className={`w-5 h-5 ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </motion.div>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {desc}
            </p>
          </div>

          {/* CTA Button - Primary is more prominent */}
          <motion.button
            className={`mt-4 px-6 py-2.5 rounded-lg border ${cardBorder} ${colors.text} text-sm font-medium transition-all ${colors.hover} ${isPrimary ? 'bg-blue-500/10' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPrimary ? 'Browse Now →' : 'View Now →'}
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
};

export default RunnerActionCard;