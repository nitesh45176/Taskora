import React from 'react'
import { motion } from 'framer-motion'

const PopularTasks = () => {
    const tasks = [
    { title: "Buy Medicines", icon: "💊" },
    { title: "Grocery Pickup", icon: "🛒" },
    { title: "Standing in Lines", icon: "🏦" },
    { title: "Document Submission", icon: "📄" },
    { title: "Local Deliveries", icon: "📦" },
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
        staggerChildren: 0.15
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
    <section  id='PopularTasks' className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          variants={headingContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold text-slate-900"
            variants={headingVariants}
          >
            Popular Tasks on <span className="text-blue-500">Taskora</span>
          </motion.h2>

          <motion.p 
            className="mt-4 text-slate-600 text-lg"
            variants={textVariants}
          >
            These are the everyday errands people use Taskora for — simple tasks that take up real time.
          </motion.p>
        </motion.div>

        {/* Task Grid */}
        <motion.div 
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {tasks.map((task, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition"
            >
              <motion.div 
                className="text-3xl mb-3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.4 }}
                viewport={{ once: true }}
              >
                {task.icon}
              </motion.div>
              <motion.p 
                className="text-sm font-medium text-slate-800 text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 + 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {task.title}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing Line */}
        <motion.div 
          className="mt-20 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-lg font-medium text-slate-800">
            If it's something you don't have time to do —{" "}
            <span className="text-blue-500">Taskora can handle it for you.</span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}

export default PopularTasks