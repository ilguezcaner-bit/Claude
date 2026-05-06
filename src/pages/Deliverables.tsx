import { useState } from 'react'
import { FileText, Filter } from 'lucide-react'
import { AGENT_MAP } from '../types'

type DeliverableStatus = 'draft' | 'review' | 'approved' | 'published'

interface LocalDeliverable {
  id: string
  title: string
  type: string
  status: DeliverableStatus
  agent_id: string
  client_name: string
  preview: string
  created_at: string
}

const STATUS_COLORS: Record<DeliverableStatus, string> = {
  draft: '#6b7280',
  review: '#f97316',
  approved: '#3b82f6',
  published: '#22c55e',
}

const STATUS_LABELS: Record<DeliverableStatus, string> = {
  draft: 'Entwurf',
  review: 'Review',
  approved: 'Freigegeben',
  published: 'Veröffentlicht',
}

const SEED: LocalDeliverable[] = [
  {
    id: '1',
    title: 'My Chicken — Grillsaison Reels-Skript',
    type: 'script',
    status: 'approved',
    agent_id: 'quilly',
    client_name: 'My Chicken',
    preview: 'Hook: "Die Grillsaison ist BACK — und wir haben die besten Wings der Stadt..." Story: Küchen-Behind-the-scenes, frische Zubereitung. CTA: "Link in Bio für Reservierung."',
    created_at: '2026-05-05',
  },
  {
    id: '2',
    title: 'Babamia — Familienrezept B-Roll Plan',
    type: 'broll_plan',
    status: 'draft',
    agent_id: 'quilly',
    client_name: 'Babamia Hannover',
    preview: '1. Teigzubereitung (Close-up Hände) 2. Fleischauswahl beim Metzger 3. Grillstation (Rauch, Flammen) 4. Finales Produkt mit Sauce',
    created_at: '2026-05-04',
  },
  {
    id: '3',
    title: 'Weekly Intel Report KW 18 — Hannover Food Scene',
    type: 'research',
    status: 'review',
    agent_id: 'ovi',
    client_name: 'CI Consulting',
    preview: 'Trend: Ethnic Fusion Restaurants wachsen +34% in Hannover. Konkurrenz: 3 neue Instagram-Agenturen aktiv. Empfehlung: Fokus auf Authentizität als USP.',
    created_at: '2026-05-03',
  },
  {
    id: '4',
    title: 'Koç Barbershop — Premium Onboarding Deck',
    type: 'strategy',
    status: 'published',
    agent_id: 'cleo',
    client_name: 'Koç Barbershop',
    preview: 'Willkommen bei CI Consulting! Hier ist euer 30-Tage-Plan: Woche 1: Basis-Setup & Brand Guide. Woche 2: Erste 3 Posts. Woche 3: Reels-Start. Woche 4: Analyse & Optimierung.',
    created_at: '2026-05-02',
  },
  {
    id: '5',
    title: 'FitCore Gym — DM-Outreach Template',
    type: 'copy',
    status: 'approved',
    agent_id: 'larry',
    client_name: 'Prospect',
    preview: '"Hey [Name], ich hab euren Account gecheckt — super Gym, aber euer Instagram könnte viel mehr Menschen erreichen. Wir machen genau das für Businesses in Hannover. Darf ich euch zeigen was möglich ist?"',
    created_at: '2026-05-01',
  },
]

const TYPE_LABELS: Record<string, string> = {
  script: '📝 Skript',
  broll_plan: '🎬 B-Roll Plan',
  research: '🔍 Research',
  strategy: '📊 Strategie',
  copy: '✉️ Copy',
  brand_docs: '🏷️ Brand Docs',
  email: '📧 E-Mail',
}

export default function Deliverables() {
  const [filter, setFilter] = useState<DeliverableStatus | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = SEED.filter((d) => filter === 'all' || d.status === filter)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-[#1a2535] pb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#3a5070] tracking-widest mb-1">
            <FileText size={10} />
            CONTENT LIBRARY
          </div>
          <h1 className="text-2xl font-bold text-slate-100">
            Deliverables <span className="text-blue-400">Library</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={12} className="text-[#4a6080]" />
          <div className="flex gap-1">
            {(['all', 'draft', 'review', 'approved', 'published'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`text-[10px] px-2.5 py-1 rounded border transition-all ${
                  filter === s
                    ? 'border-green-400/30 bg-green-400/10 text-green-400'
                    : 'border-[#1a2535] text-[#4a6080] hover:text-slate-200'
                }`}
              >
                {s === 'all' ? 'Alle' : STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((d) => {
          const agent = AGENT_MAP[d.agent_id]
          const statusColor = STATUS_COLORS[d.status]
          const isOpen = expanded === d.id
          return (
            <div
              key={d.id}
              className="bg-[#0d1520] border border-[#1a2535] rounded-xl overflow-hidden hover:border-[#2a3f5a] transition-all"
            >
              <button
                className="w-full flex items-start gap-4 p-4 text-left"
                onClick={() => setExpanded(isOpen ? null : d.id)}
              >
                <div className="text-2xl flex-shrink-0">{agent?.avatar_emoji ?? '📄'}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-bold text-slate-200">{d.title}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-[#4a6080]">
                      {TYPE_LABELS[d.type] ?? d.type}
                    </span>
                    <span className="text-[#3a5070]">·</span>
                    <span className="text-[10px] text-[#4a6080]">{d.client_name}</span>
                    <span className="text-[#3a5070]">·</span>
                    <span
                      className="text-[10px] font-bold"
                      style={{ color: agent?.color ?? '#6b7280' }}
                    >
                      {agent?.name ?? d.agent_id}
                    </span>
                    <span className="text-[#3a5070]">·</span>
                    <span className="text-[9px] text-[#3a5070]">{d.created_at}</span>
                  </div>
                </div>
                <span
                  className="flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded border"
                  style={{
                    borderColor: statusColor + '40',
                    color: statusColor,
                    backgroundColor: statusColor + '15',
                  }}
                >
                  {STATUS_LABELS[d.status]}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-0 border-t border-[#1a2535]">
                  <div className="text-[10px] text-[#3a5070] tracking-widest mb-2 mt-3">
                    INHALT
                  </div>
                  <div className="text-xs text-[#6a8aaa] leading-relaxed bg-[#080d16] rounded-lg p-3 border border-[#1a2535]">
                    {d.preview}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
