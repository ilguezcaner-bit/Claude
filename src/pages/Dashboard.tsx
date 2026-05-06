import { useNavigate } from 'react-router-dom'
import { Activity, Users, CheckSquare, TrendingUp, FileText, Zap } from 'lucide-react'
import { AGENTS } from '../types'

const stats = [
  { label: 'Aktive Clients', value: '4', icon: Users, color: '#22c55e' },
  { label: 'Offene Tasks', value: '—', icon: CheckSquare, color: '#3b82f6' },
  { label: 'Prospects Pipeline', value: '—', icon: TrendingUp, color: '#f97316' },
  { label: 'Deliverables', value: '—', icon: FileText, color: '#a855f7' },
]

const quickActions = [
  { label: 'Content-Ideen generieren', agent: 'quilly', emoji: '✍️' },
  { label: 'DM-Template erstellen', agent: 'larry', emoji: '💰' },
  { label: 'Markt-Trend analysieren', agent: 'ovi', emoji: '🔍' },
  { label: 'Client-Report erstellen', agent: 'cleo', emoji: '💎' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-[#1a2535] pb-4">
        <div className="flex items-center gap-2 text-[10px] text-[#3a5070] tracking-widest mb-1">
          <Activity size={10} />
          SYSTEM STATUS
        </div>
        <h1 className="text-2xl font-bold text-slate-100">
          War Room{' '}
          <span className="text-green-400 glow-green">Dashboard</span>
        </h1>
        <p className="text-sm text-[#6a8aaa] mt-1">
          CI Consulting — Hannover Operations Center
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-[#0d1520] border border-[#1a2535] rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <Icon size={16} style={{ color }} />
              <span className="text-[10px] text-[#3a5070] tracking-widest">LIVE</span>
            </div>
            <div className="text-2xl font-bold" style={{ color }}>
              {value}
            </div>
            <div className="text-[11px] text-[#6a8aaa] mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Agents */}
      <div>
        <div className="text-[10px] text-[#3a5070] tracking-widest mb-3 flex items-center gap-2">
          <Zap size={10} />
          AGENTEN STATUS
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {AGENTS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => navigate(`/chat/${agent.id}`)}
              className="bg-[#0d1520] border border-[#1a2535] rounded-lg p-4 text-left hover:border-[#2a3f5a] transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{agent.avatar_emoji}</span>
                <span
                  className="w-2 h-2 rounded-full pulse-dot"
                  style={{ backgroundColor: agent.color }}
                />
              </div>
              <div className="font-bold text-sm" style={{ color: agent.color }}>
                {agent.name}
              </div>
              <div className="text-[10px] text-[#4a6080] mt-0.5">{agent.role}</div>
              <div className="text-[10px] text-[#6a8aaa] mt-2 leading-relaxed line-clamp-2">
                {agent.description}
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {agent.skills.slice(0, 2).map((skill) => (
                  <span
                    key={skill}
                    className="text-[9px] px-1.5 py-0.5 rounded border"
                    style={{
                      borderColor: agent.color + '40',
                      color: agent.color + 'cc',
                      backgroundColor: agent.color + '10',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div
                className="mt-3 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: agent.color }}
              >
                → Chat öffnen
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="text-[10px] text-[#3a5070] tracking-widest mb-3 flex items-center gap-2">
          <Zap size={10} />
          QUICK ACTIONS
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map(({ label, agent, emoji }) => (
            <button
              key={label}
              onClick={() => navigate(`/chat/${agent}`)}
              className="bg-[#0d1520] border border-[#1a2535] rounded-lg p-3 text-left hover:border-green-400/30 hover:bg-green-400/5 transition-all"
            >
              <span className="text-xl">{emoji}</span>
              <div className="text-xs text-slate-300 mt-2">{label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Clients preview */}
      <div>
        <div className="text-[10px] text-[#3a5070] tracking-widest mb-3 flex items-center gap-2">
          <Users size={10} />
          AKTIVE CLIENTS
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { name: 'My Chicken', type: 'Restaurant', handle: '@mychicken_hannover', tier: 'STANDARD', color: '#22c55e' },
            { name: 'Babamia Hannover', type: 'Restaurant (Döner)', handle: '@babamia_hannover', tier: 'STANDARD', color: '#22c55e' },
            { name: 'Albina Neurografik', type: 'Coaching', handle: '@albina_neurografik', tier: 'STARTER', color: '#3b82f6' },
            { name: 'Koç Barbershop', type: 'Barbershop', handle: '@koc_barbershop', tier: 'STARTER', color: '#3b82f6' },
          ].map((client) => (
            <div
              key={client.name}
              className="bg-[#0d1520] border border-[#1a2535] rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded border font-bold"
                  style={{
                    borderColor: client.color + '40',
                    color: client.color,
                    backgroundColor: client.color + '15',
                  }}
                >
                  {client.tier}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
              </div>
              <div className="text-sm font-bold text-slate-200">{client.name}</div>
              <div className="text-[11px] text-[#6a8aaa] mt-0.5">{client.type}</div>
              <div className="text-[10px] text-[#4a6080] mt-1">{client.handle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
