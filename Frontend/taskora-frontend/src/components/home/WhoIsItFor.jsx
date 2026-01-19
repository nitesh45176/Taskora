import React from 'react'
import { motion } from 'framer-motion'

const WhoIsItFor = () => {
    const users = [
    {
      title: "Working Professionals",
      desc: "Professionals who can't pause work to handle errands, deliveries, or queues.",
      icon: "💼",
    },
    {
      title: "Seniors & Elderly",
      desc: "Those who need help with medicines, documents, or daily needs without stepping outside.",
      icon: "👴",
    },
    {
      title: "Students & Young Adults",
      desc: "From printing notes to picking up parcels, students get everyday help without stress.",
      icon: "🎓",
    },
    {
      title: "Runners Earning Money",
      desc: "Anyone can earn by completing real-world tasks for people nearby.",
      icon: "🏃",
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
     <section id='for' className="bg-slate-50 py-24">
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
            Who Is <span className="text-blue-500">Taskora</span> For?
          </motion.h2>

          <motion.p 
            className="mt-4 text-slate-600 text-lg"
            variants={textVariants}
          >
            Taskora is built for everyday people who need real-world help — and for those who want to provide it.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div 
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {users.map((u, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-xl bg-white border border-slate-200 p-6 text-center hover:shadow-md transition"
            >
              <motion.div 
                className="flex items-center justify-center h-14 w-14 mx-auto rounded-full bg-blue-100 text-blue-600 text-2xl"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.2 + 0.3, duration: 0.4 }}
                viewport={{ once: true }}
              >
                {u.icon}
              </motion.div>

              <motion.h3 
                className="mt-6 text-lg font-semibold text-slate-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 + 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {u.title}
              </motion.h3>

              <motion.p 
                className="mt-3 text-sm text-slate-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 + 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {u.desc}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing Line */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-lg font-medium text-slate-800">
            Whether you need help or want to earn —{" "}
            <span className="text-blue-500">Taskora brings everyone together.</span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}

export default WhoIsItFor