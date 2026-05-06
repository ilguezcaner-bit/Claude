import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  TrendingUp,
  FileText,
  Radio,
} from 'lucide-react'
import { AGENTS } from '../../types'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tasks', icon: CheckSquare, label: 'Operations' },
  { to: '/clients', icon: Users, label: 'Clients' },
  { to: '/pipeline', icon: TrendingUp, label: 'Pipeline' },
  { to: '/deliverables', icon: FileText, label: 'Deliverables' },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="flex flex-col w-56 bg-[#0d1520] border-r border-[#1a2535] h-screen sticky top-0">
      {/* Brand */}
      <div className="px-4 py-5 border-b border-[#1a2535]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎯</span>
          <div>
            <div className="text-green-400 font-bold text-sm tracking-widest glow-green">
              CI CONSULTING
            </div>
            <div className="text-[#4a6080] text-xs tracking-widest">WAR ROOM</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-3">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
          <span className="text-[10px] text-green-400 tracking-widest">SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5">
        <div className="text-[10px] text-[#3a5070] tracking-widest px-2 mb-2">NAVIGATION</div>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded text-xs transition-all ${
                isActive
                  ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                  : 'text-[#6a8aaa] hover:text-slate-200 hover:bg-[#1a2535]'
              }`
            }
          >
            <Icon size={14} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Agents */}
      <div className="px-2 py-4 border-t border-[#1a2535]">
        <div className="text-[10px] text-[#3a5070] tracking-widest px-2 mb-2">
          AGENTEN
        </div>
        <div className="space-y-0.5">
          {AGENTS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => navigate(`/chat/${agent.id}`)}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded text-xs text-[#6a8aaa] hover:text-slate-200 hover:bg-[#1a2535] transition-all"
            >
              <span className="text-sm">{agent.avatar_emoji}</span>
              <div className="text-left min-w-0">
                <div className="font-medium text-[11px]" style={{ color: agent.color }}>
                  {agent.name}
                </div>
                <div className="text-[9px] text-[#4a6080] truncate">{agent.role}</div>
              </div>
              <span
                className="ml-auto w-1 h-1 rounded-full flex-shrink-0 pulse-dot"
                style={{ backgroundColor: agent.color }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[#1a2535]">
        <div className="flex items-center gap-1.5">
          <Radio size={10} className="text-green-400" />
          <span className="text-[9px] text-[#3a5070] tracking-widest">
            {new Date().toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' })}
          </span>
        </div>
      </div>
    </aside>
  )
}
