import React from 'react'

const CTA = () => {
  return (
    <section className="bg-[#0B1220] py-32 relative overflow-hidden">

      {/* Soft glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-blue-500/10" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
          Get Things Done —  
          <span className="text-blue-500"> Without Leaving Home</span>
        </h2>

        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
          Whether you need help or want to earn, Taskora connects real people to real-world tasks —
          with tracking, proof, and full transparency.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
          <button className="rounded-full bg-blue-500 px-10 py-4 text-white font-medium text-lg hover:bg-blue-600 transition">
            Post Your First Task
          </button>

          <button className="rounded-full border border-[#1E2A45] px-10 py-4 text-slate-300 text-lg hover:text-white hover:border-blue-500 transition">
            Become a Runner
          </button>
        </div>

      </div>
    </section>
  )
}

export default CTA