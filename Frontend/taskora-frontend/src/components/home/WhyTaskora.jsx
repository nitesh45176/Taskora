import React from 'react'
import { motion } from 'framer-motion'

const WhyTaskora = () => {

   const problems = [
    {
      title: "No Time for Small Errands",
      desc: "Office, studies, travel, or health leave no time to buy medicines, get groceries, or pick up parcels.",
      icon: "⏰",
    },
    {
      title: "Standing in Lines Wastes Hours",
      desc: "Banks, government offices, clinics, and bill payments take huge time for simple work.",
      icon: "🏦",
    },
    {
      title: "No Trusted Help Nearby",
      desc: "Friends are busy, neighbours unavailable, and local help is unorganized and unreliable.",
      icon: "🤝",
    },
    {
      title: "No Tracking or Assurance",
      desc: "Even when someone helps, there are no updates, no proof, and no accountability.",
      icon: "📍",
    },
  ];

  const headingContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id='why' className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={headingContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold text-slate-900"
            variants={headingVariants}
          >
            Everyday Tasks Are Simple —{" "}
            <span className="text-blue-500">But Hard to Get Done</span>
          </motion.h2>

          <motion.p 
            className="mt-4 text-slate-600 text-lg"
            variants={textVariants}
          >
            Daily errands take time and energy. When you're busy, sick, or stuck,
            even small tasks become stressful.
          </motion.p>
        </motion.div>

        {/* Problem Cards */}
        <motion.div 
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {problems.map((p, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition"
            >
              <motion.div 
                className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 text-2xl"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.2 + 0.3, duration: 0.4 }}
                viewport={{ once: true }}
              >
                {p.icon}
              </motion.div>

              <motion.h3 
                className="mt-6 text-lg font-semibold text-slate-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 + 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {p.title}
              </motion.h3>

              <motion.p 
                className="mt-3 text-sm text-slate-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 + 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {p.desc}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bridge Line */}
        <motion.div 
          className="mt-20 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-lg font-medium text-slate-900">
            Taskora connects you with{" "}
            <span className="text-blue-500">verified runners</span> who complete
            real-world tasks — with tracking, updates, and full transparency.
          </p>
        </motion.div>

        {/* Visual Section Divider */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="h-[2px] w-32 bg-blue-300 rounded-full"></div>
        </motion.div>

      </div>
    </section>
  )
}

export default WhyTaskora