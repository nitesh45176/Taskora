import React from 'react'
import { motion } from 'framer-motion'

const RunnerEarnings = () => {
    const steps = [
    {
      title: "Accept Tasks",
      desc: "Browse nearby requests and accept the tasks you want to complete.",
      icon: "📋",
    },
    {
      title: "Complete Errands",
      desc: "Pick up medicines, stand in lines, deliver parcels, or submit documents.",
      icon: "🏃",
    },
    {
      title: "Upload Proof",
      desc: "Upload photos or confirmations so the user knows the task is done.",
      icon: "📸",
    },
    {
      title: "Get Paid",
      desc: "Once verified, earnings are released directly to the runner.",
      icon: "💰",
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
     <section id='Earnings' className="bg-blue-50 py-24">
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
            How <span className="text-blue-500">Runners</span> Earn on Taskora
          </motion.h2>

          <motion.p 
            className="mt-4 text-slate-600 text-lg"
            variants={textVariants}
          >
            Taskora is not just for people who need help — it also creates income opportunities for those who want to earn.
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
              className="rounded-xl bg-white border border-blue-100 p-6 text-center hover:shadow-md transition"
            >
              <motion.div 
                className="flex items-center justify-center h-14 w-14 mx-auto rounded-full bg-blue-100 text-blue-600 text-2xl"
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
            </motion.div>
          ))}
        </motion.div>

        {/* Closing Sentence */}
        <motion.div 
          className="mt-20 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-lg font-medium text-slate-800">
            Anyone can turn their free time into income —{" "}
            <span className="text-blue-500">just by helping people nearby.</span>
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

export default RunnerEarnings