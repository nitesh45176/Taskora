import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-[#1E2A45] bg-[#0B1220]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white">
              T
            </div>
            <span className="text-xl font-semibold text-white">TASKORA</span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">
            TASKORA is a workflow-driven task management system designed for real-world operations, not just to-do lists.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-white transition">Features</a></li>
            <li><a href="#" className="hover:text-white transition">Workflows</a></li>
            <li><a href="#" className="hover:text-white transition">Automations</a></li>
            <li><a href="#" className="hover:text-white transition">Roadmap</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-white transition">Documentation</a></li>
            <li><a href="#" className="hover:text-white transition">API</a></li>
            <li><a href="#" className="hover:text-white transition">Guides</a></li>
            <li><a href="#" className="hover:text-white transition">Changelog</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1E2A45] py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} TASKORA. Built for real workflows.
      </div>
    </footer>
  )
}

export default Footer