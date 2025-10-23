import React from 'react'
import AgentsDashboard from './components/AgentsDashboard'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-white">
        AI Super Production Team 🚀
      </h1>
      <AgentsDashboard />
    </div>
  )
}
