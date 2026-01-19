import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ActionCard = ({ title, desc, icon, link, color, variants }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-500/5",
      border: "border-blue-500/20",
      text: "text-blue-400",
      hover: "hover:bg-blue-500/10 hover:border-blue-500/50"
    },
    purple: {
      bg: "bg-purple-500/5",
      border: "border-purple-500/20",
      text: "text-purple-400",
      hover: "hover:bg-purple-500/10 hover:border-purple-500/50"
    },
    green: {
      bg: "bg-green-500/5",
      border: "border-green-500/20",
      text: "text-green-400",
      hover: "hover:bg-green-500/10 hover:border-green-500/50"
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <Link to={link}>
      <motion.div
        variants={variants}
        whileHover={{ y: -4, scale: 1.01 }}
        className={`group bg-[#121A2B] border ${colors.border} ${colors.bg} rounded-xl p-8 transition-all duration-300 cursor-pointer ${colors.hover} relative overflow-hidden`}
      >
        {/* Subtle background gradient effect */}
        <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        <div className="relative z-10">
          {/* Icon - static, no rotation */}
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${colors.bg} mb-6`}>
            <span className="text-3xl">{icon}</span>
          </div>

          {/* Content */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-between">
              {title}
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight className={`w-5 h-5 ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </motion.div>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {desc}
            </p>
          </div>

          {/* CTA Button */}
          <motion.button
            className={`mt-4 px-6 py-2.5 rounded-lg border ${colors.border} ${colors.text} text-sm font-medium transition-all ${colors.hover}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started →
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
};

export default ActionCard;