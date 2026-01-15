import React from 'react'

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
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
            Everyday Tasks Are Simple —{" "}
            <span className="text-blue-500">But Hard to Get Done</span>
          </h2>

          <p className="mt-4 text-slate-600 text-lg">
            Daily errands take time and energy. When you’re busy, sick, or stuck,
            even small tasks become stressful.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((p, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 text-2xl">
                {p.icon}
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                {p.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bridge Line */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <p className="text-lg font-medium text-slate-900">
            Taskora connects you with{" "}
            <span className="text-blue-500">verified runners</span> who complete
            real-world tasks — with tracking, updates, and full transparency.
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

export default WhyTaskora