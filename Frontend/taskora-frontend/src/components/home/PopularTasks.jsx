import React from 'react'

const PopularTasks = () => {
    const tasks = [
    { title: "Buy Medicines", icon: "💊" },
    { title: "Grocery Pickup", icon: "🛒" },
    { title: "Standing in Lines", icon: "🏦" },
    { title: "Document Submission", icon: "📄" },
    { title: "Local Deliveries", icon: "📦" },
  ];
  return (
    <section  id='PopularTasks' className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
            Popular Tasks on <span className="text-blue-500">Taskora</span>
          </h2>

          <p className="mt-4 text-slate-600 text-lg">
            These are the everyday errands people use Taskora for — simple tasks that take up real time.
          </p>
        </div>

        {/* Task Grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {tasks.map((task, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition"
            >
              <div className="text-3xl mb-3">{task.icon}</div>
              <p className="text-sm font-medium text-slate-800 text-center">
                {task.title}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Line */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <p className="text-lg font-medium text-slate-800">
            If it’s something you don’t have time to do —{" "}
            <span className="text-blue-500">Taskora can handle it for you.</span>
          </p>
        </div>

      </div>
    </section>
  )
}

export default PopularTasks