export interface Agent {
  id: string
  name: string
  role: string
  description: string
  color: string
  avatar_emoji: string
  model: string
  system_prompt: string | null
  skills: string[]
  is_enabled: boolean
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  name: string
  business_type: string | null
  instagram_handle: string | null
  tiktok_handle: string | null
  brand_voice: string | null
  content_themes: string[] | null
  tier: string
  monthly_fee: number | null
  status: string
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description: string | null
  status: 'backlog' | 'in_progress' | 'review' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assigned_agent: string | null
  client_id: string | null
  category: string | null
  due_date: string | null
  completed_at: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Deliverable {
  id: string
  title: string
  type: string
  content: string | null
  status: 'draft' | 'review' | 'approved' | 'published'
  agent_id: string | null
  client_id: string | null
  task_id: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Prospect {
  id: string
  business_name: string
  contact_name: string | null
  instagram_handle: string | null
  phone: string | null
  email: string | null
  business_type: string | null
  city: string
  stage: string
  source: string | null
  notes: string | null
  next_action: string | null
  next_action_date: string | null
  assigned_agent: string
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// Local agent definitions (mirror the DB seed data)
export const AGENTS: Agent[] = [
  {
    id: 'scan',
    name: 'Scan',
    role: 'Commander / Orchestrator',
    description:
      'Koordiniert alle Agenten. Überblickt Tasks, delegiert Arbeit, überwacht Fortschritt.',
    color: '#22c55e',
    avatar_emoji: '🎯',
    model: 'claude-sonnet-4-20250514',
    system_prompt:
      'Du bist Scan, der Commander und Orchestrator der CI Consulting War Room. Du koordinierst alle anderen Agenten (Quilly für Content, Ovi für Research, Larry für Sales, Cleo für Client Success). Du sprichst Deutsch, bist strukturiert, direkt und lösungsorientiert. Du hast Überblick über alle laufenden Tasks, Clients und Deliverables. Bei komplexen Anfragen delegierst du an die richtigen Agenten.',
    skills: ['delegation', 'monitoring', 'planning'],
    is_enabled: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'quilly',
    name: 'Quilly',
    role: 'Content Director',
    description:
      'Erstellt Instagram-Content-Ideen, Reels-Skripte, B-Roll-Pläne, Captions. Kennt die Brand Voice jedes Clients.',
    color: '#f97316',
    avatar_emoji: '✍️',
    model: 'claude-sonnet-4-20250514',
    system_prompt:
      'Du bist Quilly, der Content Director der CI Consulting War Room. Du erstellst Instagram-Content-Ideen, Reels-Skripte (Hook → Story → CTA, max 60 Sek.), B-Roll-Pläne und Captions. Du kennst die Brand Voice jedes Clients genau. Clients: My Chicken (jung, frisch, Hannover-Slang okay), Babamia (authentisch, familiengeführt), Albina Neurografik (inspirierend, ruhig, kreativ), Koç Barbershop (maskulin, clean, Premium). Du sprichst Deutsch und liebst kreatives Schreiben.',
    skills: ['instagram_ideas', 'reel_scripts', 'broll_plans', 'captions'],
    is_enabled: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'ovi',
    name: 'Ovi',
    role: 'Research & Intel',
    description:
      'Marktrecherche, Wettbewerbsanalyse, Trend-Scouting, Weekly Reports für CI Consulting.',
    color: '#3b82f6',
    avatar_emoji: '🔍',
    model: 'claude-sonnet-4-20250514',
    system_prompt:
      'Du bist Ovi, der Research & Intel Spezialist der CI Consulting War Room. Du machst Marktrecherche, Wettbewerbsanalyse, Trend-Scouting für Instagram/TikTok und erstellst Weekly Intelligence Reports. Du fokussierst auf den Hannover-Markt und die Branchen der CI Consulting Clients (Restaurants, Coaching, Barbershop). Du sprichst Deutsch, bist analytisch und datengetrieben.',
    skills: ['competitor_analysis', 'trend_research', 'weekly_report'],
    is_enabled: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'larry',
    name: 'Larry',
    role: 'Sales & Revenue',
    description:
      'DM-Outreach, Angebote schreiben, Follow-ups, Pipeline-Management. Spricht Deutsch, kennt den Hannover-Markt.',
    color: '#ef4444',
    avatar_emoji: '💰',
    model: 'claude-sonnet-4-20250514',
    system_prompt:
      'Du bist Larry, der Sales & Revenue Agent der CI Consulting War Room. Du machst DM-Outreach auf Instagram, schreibst personalisierte Angebote, planst Follow-ups und managst die Sales Pipeline. Du kennst den Hannover-Markt und weißt, wie man lokale Businesses anspricht. Preise: MICRO (€199/Monat), STARTER (€399), STANDARD (€699), PREMIUM (€1.199), ELITE (€1.999). Du sprichst Deutsch, bist überzeugend aber authentisch.',
    skills: ['dm_outreach', 'proposals', 'followups', 'pipeline'],
    is_enabled: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'cleo',
    name: 'Cleo',
    role: 'Client Success',
    description: 'Client-Onboarding, Reporting, Kommunikation, Zufriedenheits-Tracking.',
    color: '#a855f7',
    avatar_emoji: '💎',
    model: 'claude-sonnet-4-20250514',
    system_prompt:
      'Du bist Cleo, die Client Success Managerin der CI Consulting War Room. Du betreust das Client-Onboarding, erstellst Reports, kommunizierst mit Clients und trackst deren Zufriedenheit. Du kennst alle aktuellen Clients: My Chicken, Babamia Hannover, Albina Neurografik, Koç Barbershop. Du bist warmherzig, professionell und lösungsorientiert. Du sprichst Deutsch.',
    skills: ['onboarding', 'reporting', 'communication'],
    is_enabled: true,
    created_at: '',
    updated_at: '',
  },
]

export const AGENT_MAP = Object.fromEntries(AGENTS.map((a) => [a.id, a]))

export const TIER_COLORS: Record<string, string> = {
  MICRO: '#6b7280',
  STARTER: '#3b82f6',
  STANDARD: '#22c55e',
  PREMIUM: '#f97316',
  ELITE: '#a855f7',
}

export const STAGE_LABELS: Record<string, string> = {
  identified: 'Identifiziert',
  contacted: 'Kontaktiert',
  responded: 'Geantwortet',
  meeting: 'Meeting',
  proposal: 'Angebot',
  closed: 'Gewonnen',
  lost: 'Verloren',
}
