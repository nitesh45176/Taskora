import React from 'react'

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
  return (
     <section id='Earnings' className="bg-blue-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
            How <span className="text-blue-500">Runners</span> Earn on Taskora
          </h2>

          <p className="mt-4 text-slate-600 text-lg">
            Taskora is not just for people who need help — it also creates income opportunities for those who want to earn.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="rounded-xl bg-white border border-blue-100 p-6 text-center hover:shadow-md transition"
            >
              <div className="flex items-center justify-center h-14 w-14 mx-auto rounded-full bg-blue-100 text-blue-600 text-2xl">
                {step.icon}
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Sentence */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <p className="text-lg font-medium text-slate-800">
            Anyone can turn their free time into income —{" "}
            <span className="text-blue-500">just by helping people nearby.</span>
          </p>
        </div>

        {/* Visual Section Divider */}
        <div className="mt-16 flex justify-center">
          <div className="h-[2px] w-32 bg-blue-300 rounded-full"></div>
        </div>

      </div>
    </section>
  )
}

export default RunnerEarnings