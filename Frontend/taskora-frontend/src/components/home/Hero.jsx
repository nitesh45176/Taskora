import React from 'react'
import heroBg from '../../assets/Hero-bg.png'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1220]">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="TASKORA background"
          className="h-full w-full object-cover opacity-40 bg-black/60"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/80 via-[#0B1220]/70 to-[#0B1220]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 text-center mt-30">

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight font-heading">
          Post Tasks. Get Them Done. <br/>
          <span className="text-blue-500">Track Everything.</span>
        </h1>

        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
          Taskora connects users who need help with trusted runners who get things done — fast, transparent, and tracked in real time.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/tasks/create" className="rounded-full bg-blue-500 px-8 py-3 text-white font-medium hover:bg-blue-600 transition">
            Post a Task
          </Link>

          <button className="rounded-full border border-[#1E2A45] px-8 py-3 text-slate-300 hover:text-white hover:border-blue-500 transition">
            Become a Runner
          </button>
        </div>

        {/* Stats
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            ["24h Auto Completion", "No manual closing"],
            ["State Based Tasks", "Real workflows"],
            ["Backend Automation", "No cron hacks"],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-[#1E2A45] bg-[#121A2B]/70 backdrop-blur-lg p-6"
            >
              <h3 className="text-white font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">{desc}</p>
            </div>
          ))}
        </div> */}

      </div>
    </section>
  )
}

export default Hero