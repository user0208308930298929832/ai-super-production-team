import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const gradientBtn = "inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold text-white bg-gradient-to-r from-blue-400 to-cyan-500 shadow-sm hover:shadow transition shadow-cyan-200"
const card = "rounded-2xl bg-white shadow-[0_8px_24px_rgba(2,6,23,0.08)] border border-slate-200"
const badge = "text-xs font-semibold inline-flex items-center gap-1 rounded-full px-2 py-1 bg-slate-100 text-slate-700 border border-slate-200"

const agents = [
  { key: 'planner', name: 'Planner', color: 'bg-indigo-50', desc: 'Agenda + prioridades', cta: 'Gerar plano diário',
    message: 'Plano criado: 6 blocos focados hoje (09:00–17:30). Reunião às 15:00.' },
  { key: 'crm', name: 'CRM', color: 'bg-emerald-50', desc: 'Leads + follow-ups', cta: 'Importar novos leads',
    message: 'Foram importados 23 novos leads. 5 quentes, 8 mornos, 10 frios.' },
  { key: 'content', name: 'Content', color: 'bg-amber-50', desc: 'Posts + calendário', cta: 'Gerar 5 variações',
    message: 'Foram geradas 5 variações para o post de amanhã. Sugiro publicar às 18:00.' },
  { key: 'inbox', name: 'Inbox', color: 'bg-rose-50', desc: 'Respostas + tickets', cta: 'Resumo diário',
    message: 'Caixa de entrada: 12 não lidos. 3 urgentes. Resumo enviado ao Slack.' },
]

function AgentCard({ a, onAction }){
  return (
    <motion.div className={`${card} p-5 sm:p-6 flex flex-col gap-4`}
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-full ${a.color} border border-slate-200`} />
        <div>
          <div className="font-bold text-slate-900">{a.name}</div>
          <div className="text-sm text-slate-500">{a.desc}</div>
        </div>
      </div>
      <button onClick={()=>onAction(a)} className="h-10 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm font-semibold text-slate-800">
        {a.cta}
      </button>
    </motion.div>
  )
}

export default function AgentsDashboard({ tier='starter' }){
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Sou a Nô. O que queres fazer primeiro?', ts: Date.now() }
  ])

  const sendFromNo = (text) => {
    const id = Date.now()
    setMessages(prev => [...prev, { id, text, ts: id }].slice(-6))
  }

  const handleAction = (a) => {
    // No responde conforme o agente clicado
    if(tier === 'starter' && (a.key === 'crm' || a.key === 'inbox')){
      sendFromNo('Funcionalidade avançada disponível no plano Pro. Queres fazer upgrade?')
      return
    }
    sendFromNo(a.message)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* Search/CTA */}
      <div className={`${card} mb-8 flex items-center gap-3 px-4 py-3`}>
        <input className="flex-1 bg-transparent outline-none text-slate-800 placeholder:text-slate-400" placeholder="Pergunta algo aos teus agentes…" />
        <button className={gradientBtn}>Nova automação</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Left col */}
        <div className="grid gap-6">
          <AgentCard a={agents[0]} onAction={handleAction} />
          <AgentCard a={agents[1]} onAction={handleAction} />
        </div>

        {/* Center: Nô */}
        <motion.div className={`${card} p-6 sm:p-8 col-span-2`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col items-center text-center gap-1">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-sky-100 border border-sky-200 shadow-[0_0_0_8px_rgba(125,211,252,0.25)]" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-sky-600">Nô</div>
            <div className="text-sm text-slate-500 font-medium">AI Orquestradora</div>
          </div>

          {/* Chat bubble */}
          <div className="mt-6 space-y-3">
            <AnimatePresence initial={false}>
              {messages.map(m => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-800"
                >
                  {m.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button onClick={()=>sendFromNo('Posso criar um plano diário ou gerar conteúdo. Queres começar por onde?')} className={gradientBtn}>
              Falar com a Nô
            </button>
            <span className={badge}>Tier: {tier === 'pro' ? 'Pro' : 'Starter'}</span>
            {tier === 'starter' && (
              <span className="text-xs font-semibold text-amber-600 bg-amber-100 border border-amber-200 px-2 py-1 rounded-full">
                Recursos avançados na versão Pro
              </span>
            )}
          </div>
        </motion.div>

        {/* Right col */}
        <div className="grid gap-6">
          <AgentCard a={agents[2]} onAction={handleAction} />
          <AgentCard a={agents[3]} onAction={handleAction} />
        </div>
      </div>
    </main>
  )
}
