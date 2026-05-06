import { useState } from 'react'
import { TrendingUp, Plus } from 'lucide-react'
import { STAGE_LABELS } from '../types'

type Stage = keyof typeof STAGE_LABELS

interface Prospect {
  id: string
  business_name: string
  business_type: string
  instagram_handle: string | null
  stage: Stage
  source: string
  city: string
  notes: string | null
}

const STAGE_ORDER: Stage[] = [
  'identified',
  'contacted',
  'responded',
  'meeting',
  'proposal',
  'closed',
  'lost',
]

const STAGE_COLORS: Record<Stage, string> = {
  identified: '#6b7280',
  contacted: '#3b82f6',
  responded: '#06b6d4',
  meeting: '#f97316',
  proposal: '#eab308',
  closed: '#22c55e',
  lost: '#ef4444',
}

const SEED_PROSPECTS: Prospect[] = [
  { id: '1', business_name: 'Bella Italia Hannover', business_type: 'Restaurant', instagram_handle: '@bellaitalia_hh', stage: 'identified', source: 'instagram_dm', city: 'Hannover', notes: 'Schlechter Social-Auftritt, viele Bewertungen' },
  { id: '2', business_name: 'FitCore Gym', business_type: 'Fitnessstudio', instagram_handle: '@fitcore_gym', stage: 'contacted', source: 'cold_outreach', city: 'Hannover', notes: 'DM gesendet am 05.05.' },
  { id: '3', business_name: 'Bloom Florist', business_type: 'Blumenladen', instagram_handle: '@bloom_hannover', stage: 'responded', source: 'instagram_dm', city: 'Hannover', notes: 'Interesse gezeigt, will mehr Infos' },
  { id: '4', business_name: 'Sushi Matsuri', business_type: 'Restaurant (Sushi)', instagram_handle: null, stage: 'meeting', source: 'referral', city: 'Hannover', notes: 'Meeting Mo. 10.05. um 15:00 Uhr' },
  { id: '5', business_name: 'PureHair Studio', business_type: 'Friseursalon', instagram_handle: '@purehair_hh', stage: 'proposal', source: 'cold_outreach', city: 'Hannover', notes: 'Angebot STARTER €399 gesendet' },
]

export default function Pipeline() {
  const [prospects, setProspects] = useState<Prospect[]>(SEED_PROSPECTS)
  const [dragging, setDragging] = useState<string | null>(null)

  function moveProspect(id: string, stage: Stage) {
    setProspects((prev) => prev.map((p) => (p.id === id ? { ...p, stage } : p)))
  }

  const activeStages = STAGE_ORDER.filter((s) => s !== 'lost')
  const closedCount = prospects.filter((p) => p.stage === 'closed').length
  const totalContacted = prospects.filter((p) => p.stage !== 'identified').length

  return (
    <div className="p-6 space-y-4 h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-[#1a2535] pb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#3a5070] tracking-widest mb-1">
            <TrendingUp size={10} />
            SALES PIPELINE
          </div>
          <h1 className="text-2xl font-bold text-slate-100">
            Pipeline <span className="text-red-400">Tracker</span>
          </h1>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="bg-[#0d1520] border border-[#1a2535] rounded-lg px-3 py-2">
            <span className="text-[#4a6080]">Prospects: </span>
            <span className="text-slate-200 font-bold">{prospects.length}</span>
          </div>
          <div className="bg-[#0d1520] border border-[#1a2535] rounded-lg px-3 py-2">
            <span className="text-[#4a6080]">Gewonnen: </span>
            <span className="text-green-400 font-bold">{closedCount}</span>
          </div>
          <div className="bg-[#0d1520] border border-[#1a2535] rounded-lg px-3 py-2">
            <span className="text-[#4a6080]">Conversion: </span>
            <span className="text-orange-400 font-bold">
              {totalContacted > 0 ? Math.round((closedCount / totalContacted) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Kanban */}
      <div className="flex gap-3 flex-1 overflow-x-auto pb-4">
        {activeStages.map((stage) => {
          const color = STAGE_COLORS[stage]
          const stageProspects = prospects.filter((p) => p.stage === stage)
          return (
            <div
              key={stage}
              className="flex-shrink-0 w-60 flex flex-col"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dragging && moveProspect(dragging, stage)}
            >
              <div
                className="flex items-center justify-between px-3 py-2 rounded-t-lg border border-b-0"
                style={{ borderColor: color + '30', backgroundColor: color + '10' }}
              >
                <span className="text-xs font-bold" style={{ color }}>
                  {STAGE_LABELS[stage]}
                </span>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: color + '20', color }}
                >
                  {stageProspects.length}
                </span>
              </div>
              <div
                className="flex-1 border border-[#1a2535] rounded-b-lg bg-[#0a0f18] p-2 space-y-2 min-h-24"
                style={{ borderColor: color + '20' }}
              >
                {stageProspects.map((prospect) => (
                  <div
                    key={prospect.id}
                    draggable
                    onDragStart={() => setDragging(prospect.id)}
                    onDragEnd={() => setDragging(null)}
                    className="bg-[#0d1520] border border-[#1a2535] rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-[#2a3f5a] transition-all"
                  >
                    <div className="text-xs font-bold text-slate-200">{prospect.business_name}</div>
                    <div className="text-[10px] text-[#4a6080] mt-0.5">{prospect.business_type}</div>
                    {prospect.instagram_handle && (
                      <div className="text-[9px] text-[#3a5070] mt-1">{prospect.instagram_handle}</div>
                    )}
                    {prospect.notes && (
                      <div className="text-[10px] text-[#6a8aaa] mt-2 leading-snug border-t border-[#1a2535] pt-2">
                        {prospect.notes}
                      </div>
                    )}
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-[9px] px-1.5 py-0.5 rounded border border-[#1a2535] text-[#4a6080]">
                        {prospect.source.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
                <button className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded text-[10px] text-[#3a5070] hover:text-[#6a8aaa] hover:bg-[#1a2535] transition-all">
                  <Plus size={10} />
                  Prospect hinzufügen
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
