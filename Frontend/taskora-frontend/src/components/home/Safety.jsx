import React from 'react'

const Safety = () => {
  const features = [
    {
      title: "Verified Runners",
      desc: "Every runner on Taskora is identity-verified, so you know exactly who is handling your task.",
      icon: "🛡️",
    },
    {
      title: "Live Task Tracking",
      desc: "See who accepted your task, when they started, and when it is delivered — in real time.",
      icon: "📡",
    },
    {
      title: "Proof of Work",
      desc: "Runners upload photos and confirmations so you always have evidence that the task was completed.",
      icon: "📸",
    },
    {
      title: "Auto Completion System",
      desc: "Tasks are automatically closed after delivery, preventing endless waiting and follow-ups.",
      icon: "⚙️",
    },
  ];
  return (
    <section className="bg-[#0B1220] py-24 relative overflow-hidden">
      
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/5" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            Why People Trust{" "}
            <span className="text-blue-500">Taskora</span> for Real-World Tasks
          </h2>

          <p className="mt-4 text-slate-400 text-lg">
            When you ask a stranger or rely on informal help, there’s no tracking,
            no proof, and no accountability. Taskora replaces uncertainty with
            trust, visibility, and automation.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#1E2A45] bg-[#121A2B]/70 backdrop-blur-lg p-6 hover:border-blue-500 transition"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500/20 text-blue-400 text-2xl">
                {f.icon}
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                {f.title}
              </h3>

              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Safety