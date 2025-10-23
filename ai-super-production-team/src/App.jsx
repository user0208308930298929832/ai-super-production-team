import React, { useState } from 'react'
import AgentsDashboard from './components/AgentsDashboard'

export default function App(){
  const [tier, setTier] = useState('starter')
  return (
    <div className="min-h-screen">
      <header className="max-w-6xl mx-auto px-4 pt-8 pb-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Super Production Team <span className="text-sky-600">— Nô & Agentes</span>
          </h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Plano:</span>
            <select value={tier} onChange={e=>setTier(e.target.value)} className="border border-slate-300 rounded-lg px-2 py-1 bg-white">
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
            </select>
          </div>
        </div>
        <p className="text-slate-500 mt-1">Fala com a Nô no centro e usa os agentes laterais para ações rápidas.</p>
      </header>

      <AgentsDashboard tier={tier} />
      <footer className="text-center text-xs text-slate-400 py-8">Mockup interativo • React + Tailwind + Framer Motion</footer>
    </div>
  )
}
