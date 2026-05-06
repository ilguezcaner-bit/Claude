import { useNavigate } from 'react-router-dom'
import { Users, Instagram, MessageSquare } from 'lucide-react'
import { TIER_COLORS } from '../types'

const CLIENTS = [
  {
    id: '1',
    name: 'My Chicken',
    business_type: 'Restaurant',
    instagram_handle: '@mychicken_hannover',
    brand_voice: 'Jung, frisch, Community-nah. Hannover-Slang okay. Emojis sparsam.',
    content_themes: ['Neue Gerichte', 'Behind-the-scenes', 'Community Events', 'Limited Offers'],
    tier: 'STANDARD',
    status: 'active',
    monthly_fee: 699,
  },
  {
    id: '2',
    name: 'Babamia Hannover',
    business_type: 'Restaurant (Döner)',
    instagram_handle: '@babamia_hannover',
    brand_voice: 'Authentisch, warm, familiengeführt. Fokus auf Qualität und Tradition.',
    content_themes: ['Frische Zutaten', 'Familienrezepte', 'Stammkunden', 'Mittagsangebote'],
    tier: 'STANDARD',
    status: 'active',
    monthly_fee: 699,
  },
  {
    id: '3',
    name: 'Albina Neurografik',
    business_type: 'Coaching / Kreativ',
    instagram_handle: '@albina_neurografik',
    brand_voice: 'Inspirierend, ruhig, kreativ. Neurografik als Selbstentdeckung.',
    content_themes: ['Neurografik-Basics', 'Workshopdates', 'Vorher/Nachher', 'Innere Reise'],
    tier: 'STARTER',
    status: 'active',
    monthly_fee: 399,
  },
  {
    id: '4',
    name: 'Koç Barbershop',
    business_type: 'Barbershop',
    instagram_handle: '@koc_barbershop',
    brand_voice: 'Maskulin, clean, Premium-Gefühl. Vorher/Nachher Content.',
    content_themes: ['Fade & Cut Results', 'Booking', 'Premium Produkte', 'Team'],
    tier: 'STARTER',
    status: 'active',
    monthly_fee: 399,
  },
]

export default function Clients() {
  const navigate = useNavigate()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-[#1a2535] pb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#3a5070] tracking-widest mb-1">
            <Users size={10} />
            CLIENT MANAGEMENT
          </div>
          <h1 className="text-2xl font-bold text-slate-100">
            Clients <span className="text-purple-400">Overview</span>
          </h1>
        </div>
        <div className="bg-[#0d1520] border border-[#1a2535] rounded-lg px-3 py-2 text-xs text-[#6a8aaa]">
          <span className="text-green-400 font-bold">{CLIENTS.length}</span> aktive Clients ·{' '}
          <span className="text-green-400 font-bold">
            €{CLIENTS.reduce((s, c) => s + c.monthly_fee, 0).toLocaleString('de-DE')}
          </span>{' '}
          MRR
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {CLIENTS.map((client) => {
          const tierColor = TIER_COLORS[client.tier] ?? '#6b7280'
          return (
            <div
              key={client.id}
              className="bg-[#0d1520] border border-[#1a2535] rounded-xl p-5 hover:border-[#2a3f5a] transition-all"
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-lg font-bold text-slate-100">{client.name}</div>
                  <div className="text-xs text-[#6a8aaa] mt-0.5">{client.business_type}</div>
                  {client.instagram_handle && (
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-[#4a6080]">
                      <Instagram size={10} />
                      {client.instagram_handle}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className="text-[10px] font-bold px-2 py-1 rounded border"
                    style={{
                      borderColor: tierColor + '40',
                      color: tierColor,
                      backgroundColor: tierColor + '15',
                    }}
                  >
                    {client.tier}
                  </span>
                  <span className="text-xs font-bold text-green-400">
                    €{client.monthly_fee.toLocaleString('de-DE')}/Mo
                  </span>
                </div>
              </div>

              {/* Brand Voice */}
              <div className="mb-4">
                <div className="text-[10px] text-[#3a5070] tracking-widest mb-1.5">BRAND VOICE</div>
                <div className="text-xs text-[#6a8aaa] leading-relaxed italic">
                  "{client.brand_voice}"
                </div>
              </div>

              {/* Themes */}
              <div className="mb-4">
                <div className="text-[10px] text-[#3a5070] tracking-widest mb-1.5">
                  CONTENT THEMEN
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {client.content_themes.map((theme) => (
                    <span
                      key={theme}
                      className="text-[10px] px-2 py-0.5 rounded border border-[#1a2535] text-[#4a6080] bg-[#0a0f18]"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-[#1a2535]">
                <button
                  onClick={() =>
                    navigate(
                      `/chat/quilly?prompt=Erstelle%20Content-Ideen%20für%20${encodeURIComponent(client.name)}`
                    )
                  }
                  className="flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded border border-orange-400/20 text-orange-400 bg-orange-400/5 hover:bg-orange-400/10 transition-all"
                >
                  ✍️ Content-Ideen
                </button>
                <button
                  onClick={() => navigate('/chat/cleo')}
                  className="flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded border border-purple-400/20 text-purple-400 bg-purple-400/5 hover:bg-purple-400/10 transition-all"
                >
                  <MessageSquare size={10} />
                  Report erstellen
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
