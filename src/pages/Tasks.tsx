import { useState } from 'react'
import { Plus, CheckSquare } from 'lucide-react'
import { AGENT_MAP } from '../types'

type Status = 'backlog' | 'in_progress' | 'review' | 'completed'
type Priority = 'low' | 'medium' | 'high' | 'urgent'

interface LocalTask {
  id: string
  title: string
  status: Status
  priority: Priority
  assigned_agent: string | null
  category: string | null
}

const COLUMNS: { id: Status; label: string; color: string }[] = [
  { id: 'backlog', label: 'Backlog', color: '#6b7280' },
  { id: 'in_progress', label: 'In Arbeit', color: '#3b82f6' },
  { id: 'review', label: 'Review', color: '#f97316' },
  { id: 'completed', label: 'Fertig', color: '#22c55e' },
]

const PRIORITY_COLORS: Record<Priority, string> = {
  low: '#6b7280',
  medium: '#3b82f6',
  high: '#f97316',
  urgent: '#ef4444',
}

const SEED_TASKS: LocalTask[] = [
  { id: '1', title: 'My Chicken — Reels-Skript für Woche 20', status: 'in_progress', priority: 'high', assigned_agent: 'quilly', category: 'content' },
  { id: '2', title: 'Babamia — B-Roll Plan erstellen', status: 'backlog', priority: 'medium', assigned_agent: 'quilly', category: 'content' },
  { id: '3', title: 'Competitor Analysis: Döner-Markt Hannover', status: 'backlog', priority: 'medium', assigned_agent: 'ovi', category: 'research' },
  { id: '4', title: 'Weekly Report KW 19', status: 'review', priority: 'high', assigned_agent: 'ovi', category: 'research' },
  { id: '5', title: 'DM-Outreach: 20 Restaurants Hannover', status: 'backlog', priority: 'urgent', assigned_agent: 'larry', category: 'sales' },
  { id: '6', title: 'Koç Barbershop — Onboarding abschließen', status: 'completed', priority: 'high', assigned_agent: 'cleo', category: 'client' },
]

export default function Tasks() {
  const [tasks, setTasks] = useState<LocalTask[]>(SEED_TASKS)
  const [dragging, setDragging] = useState<string | null>(null)
  const [newTaskText, setNewTaskText] = useState('')
  const [addingTo, setAddingTo] = useState<Status | null>(null)

  function moveTask(id: string, newStatus: Status) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)))
  }

  function addTask(status: Status) {
    if (!newTaskText.trim()) return
    const task: LocalTask = {
      id: Date.now().toString(),
      title: newTaskText.trim(),
      status,
      priority: 'medium',
      assigned_agent: null,
      category: null,
    }
    setTasks((prev) => [...prev, task])
    setNewTaskText('')
    setAddingTo(null)
  }

  return (
    <div className="p-6 space-y-4 h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-[#1a2535] pb-4">
        <div className="flex items-center gap-2 text-[10px] text-[#3a5070] tracking-widest mb-1">
          <CheckSquare size={10} />
          OPERATIONS BOARD
        </div>
        <h1 className="text-2xl font-bold text-slate-100">
          Tasks <span className="text-blue-400">Board</span>
        </h1>
      </div>

      {/* Board */}
      <div className="flex gap-4 flex-1 overflow-x-auto pb-4">
        {COLUMNS.map(({ id, label, color }) => {
          const columnTasks = tasks.filter((t) => t.status === id)
          return (
            <div
              key={id}
              className="flex-shrink-0 w-72 flex flex-col"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dragging && moveTask(dragging, id)}
            >
              {/* Column header */}
              <div
                className="flex items-center justify-between px-3 py-2 rounded-t-lg border border-b-0"
                style={{ borderColor: color + '30', backgroundColor: color + '10' }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-xs font-bold" style={{ color }}>
                    {label}
                  </span>
                </div>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: color + '20', color }}
                >
                  {columnTasks.length}
                </span>
              </div>

              {/* Cards */}
              <div
                className="flex-1 border border-[#1a2535] rounded-b-lg bg-[#0a0f18] p-2 space-y-2 min-h-32"
                style={{ borderColor: color + '20' }}
              >
                {columnTasks.map((task) => {
                  const agent = task.assigned_agent ? AGENT_MAP[task.assigned_agent] : null
                  return (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => setDragging(task.id)}
                      onDragEnd={() => setDragging(null)}
                      className="bg-[#0d1520] border border-[#1a2535] rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-[#2a3f5a] transition-all"
                    >
                      <div className="text-xs text-slate-300 leading-snug mb-2">{task.title}</div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded border"
                          style={{
                            borderColor: PRIORITY_COLORS[task.priority] + '40',
                            color: PRIORITY_COLORS[task.priority],
                            backgroundColor: PRIORITY_COLORS[task.priority] + '10',
                          }}
                        >
                          {task.priority}
                        </span>
                        {task.category && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded border border-[#1a2535] text-[#4a6080]">
                            {task.category}
                          </span>
                        )}
                        {agent && (
                          <span className="ml-auto text-sm" title={agent.name}>
                            {agent.avatar_emoji}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}

                {/* Add task */}
                {addingTo === id ? (
                  <div className="space-y-1.5">
                    <input
                      autoFocus
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addTask(id)
                        if (e.key === 'Escape') setAddingTo(null)
                      }}
                      placeholder="Task-Titel…"
                      className="w-full bg-[#080d16] border border-[#1a2535] rounded px-2 py-1.5 text-xs text-slate-200 placeholder-[#3a5070] focus:outline-none focus:border-green-400/40"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={() => addTask(id)}
                        className="text-[10px] px-2 py-1 rounded bg-green-400/10 border border-green-400/20 text-green-400 hover:bg-green-400/20"
                      >
                        Hinzufügen
                      </button>
                      <button
                        onClick={() => setAddingTo(null)}
                        className="text-[10px] px-2 py-1 rounded border border-[#1a2535] text-[#4a6080] hover:text-slate-200"
                      >
                        Abbrechen
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingTo(id)}
                    className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded text-[10px] text-[#3a5070] hover:text-[#6a8aaa] hover:bg-[#1a2535] transition-all"
                  >
                    <Plus size={10} />
                    Task hinzufügen
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
