import React from 'react'

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
  return (
    <section id='HowItWorks' className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading">
            How <span className="text-blue-500">Taskora</span> Works
          </h2>
          <p className="mt-4 text-slate-600">
            TASKORA follows real-world workflows — not just checklists.
            Tasks move forward automatically, even when people forget.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 text-2xl">
                {step.icon}
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>

              <div className="mt-4 h-1 w-12 rounded bg-blue-500 opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks