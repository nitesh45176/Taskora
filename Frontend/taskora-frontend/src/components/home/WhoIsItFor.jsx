import React from 'react'

const WhoIsItFor = () => {
    const users = [
    {
      title: "Working Professionals",
      desc: "Professionals who can’t pause work to handle errands, deliveries, or queues.",
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
  return (
     <section id='for' className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
            Who Is <span className="text-blue-500">Taskora</span> For?
          </h2>

          <p className="mt-4 text-slate-600 text-lg">
            Taskora is built for everyday people who need real-world help — and for those who want to provide it.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {users.map((u, i) => (
            <div
              key={i}
              className="rounded-xl bg-white border border-slate-200 p-6 text-center hover:shadow-md transition"
            >
              <div className="flex items-center justify-center h-14 w-14 mx-auto rounded-full bg-blue-100 text-blue-600 text-2xl">
                {u.icon}
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                {u.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {u.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Line */}
        <div className="mt-20 text-center">
          <p className="text-lg font-medium text-slate-800">
            Whether you need help or want to earn —{" "}
            <span className="text-blue-500">Taskora brings everyone together.</span>
          </p>
        </div>

      </div>
    </section>
  )
}

export default WhoIsItFor