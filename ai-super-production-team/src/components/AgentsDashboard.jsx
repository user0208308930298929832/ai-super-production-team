import React from 'react'

export default function AgentsDashboard() {
  const agents = ['Nô', 'Vision', 'Lexa', 'Orion', 'Echo']

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {agents.map((agent) => (
        <div
          key={agent}
          className="p-6 rounded-2xl bg-gray-800 hover:bg-gray-700 transition text-center"
        >
          <h2 className="text-2xl font-semibold text-white mb-2">{agent}</h2>
          <p className="text-sm text-gray-400">Agente IA em operação</p>
        </div>
      ))}
    </div>
  )
}
