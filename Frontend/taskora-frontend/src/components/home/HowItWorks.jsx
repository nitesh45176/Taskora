import React from 'react'
import { motion } from 'framer-motion'

const HowItWorks = () => {

    const steps = [
    {
      title: "Post a Task",
      desc: "Create a task with description, deadline, and rules. TASKORA understands what needs to be done and how.",
      icon: "📝",
    },
    {
      title: "Runner Accepts",
      desc: "A verified runner or system agent picks up the task and moves it into the active workflow.",
      icon: "🏃",
    },
    {
      title: "Track Progress",
      desc: "Task moves from PENDING → DELIVERED → COMPLETED with real-time status updates.",
      icon: "📊",
    },
    {
      title: "Auto Completion",
      desc: "If no action is taken after delivery, TASKORA automatically marks it completed after 24 hours.",
      icon: "⚙️",
    },
  ]

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

  return (
    <section id='HowItWorks' className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          variants={headingContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 
            className="text-3xl font-heading md:text-4xl font-bold text-slate-900 font-heading"
            variants={headingVariants}
          >
            How <span className="text-blue-500">Taskora</span> Works
          </motion.h2>
          <motion.p 
            className="mt-4 font-body text-slate-600"
            variants={textVariants}
          >
            TASKORA follows real-world workflows — not just checklists.
            Tasks move forward automatically, even when people forget.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div 
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <motion.div 
                className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 text-2xl"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.2 + 0.3, duration: 0.4 }}
                viewport={{ once: true }}
              >
                {step.icon}
              </motion.div>

              <motion.h3 
                className="mt-6 text-lg font-semibold text-slate-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 + 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {step.title}
              </motion.h3>

              <motion.p 
                className="mt-3 text-sm text-slate-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 + 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {step.desc}
              </motion.p>

              <motion.div 
                className="mt-4 h-1 w-12 rounded bg-blue-500 opacity-0 group-hover:opacity-100 transition"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: i * 0.2 + 0.6, duration: 0.4 }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks