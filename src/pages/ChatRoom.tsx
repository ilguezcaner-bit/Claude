import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Send, ChevronDown } from 'lucide-react'
import { AGENTS, AGENT_MAP, type ChatMessage } from '../types'

export default function ChatRoom() {
  const { agentId } = useParams<{ agentId?: string }>()
  const navigate = useNavigate()
  const [selectedAgentId, setSelectedAgentId] = useState(agentId ?? 'scan')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [showAgentPicker, setShowAgentPicker] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const agent = AGENT_MAP[selectedAgentId] ?? AGENT_MAP['scan']

  useEffect(() => {
    if (agentId && AGENT_MAP[agentId]) {
      setSelectedAgentId(agentId)
      setMessages([])
    }
  }, [agentId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    const text = input.trim()
    if (!text || streaming) return
    setInput('')

    const userMessage: ChatMessage = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setStreaming(true)

    const assistantMsg: ChatMessage = { role: 'assistant', content: '' }
    setMessages([...newMessages, assistantMsg])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          systemPrompt: agent.system_prompt,
          agentId: agent.id,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'API-Fehler' }))
        throw new Error(err.error ?? `HTTP ${res.status}`)
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const json = JSON.parse(line.slice(6))
          if (json.done) break
          if (json.text) {
            accumulated += json.text
            setMessages((prev) => {
              const updated = [...prev]
              updated[updated.length - 1] = { role: 'assistant', content: accumulated }
              return updated
            })
          }
        }
      }
    } catch (err: any) {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: `⚠️ Fehler: ${err.message}\n\nStelle sicher dass ANTHROPIC_API_KEY in .env gesetzt ist.`,
        }
        return updated
      })
    } finally {
      setStreaming(false)
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b border-[#1a2535] bg-[#0d1520] px-6 py-3 flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowAgentPicker(!showAgentPicker)}
            className="flex items-center gap-2.5 px-3 py-2 rounded border border-[#1a2535] hover:border-[#2a3f5a] transition-all"
          >
            <span className="text-xl">{agent.avatar_emoji}</span>
            <div className="text-left">
              <div className="text-sm font-bold" style={{ color: agent.color }}>
                {agent.name}
              </div>
              <div className="text-[10px] text-[#4a6080]">{agent.role}</div>
            </div>
            <ChevronDown size={12} className="text-[#4a6080] ml-1" />
          </button>

          {showAgentPicker && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-[#0d1520] border border-[#1a2535] rounded-lg shadow-xl z-10">
              {AGENTS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setShowAgentPicker(false)
                    setMessages([])
                    navigate(`/chat/${a.id}`)
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-[#1a2535] transition-all first:rounded-t-lg last:rounded-b-lg"
                >
                  <span className="text-lg">{a.avatar_emoji}</span>
                  <div className="text-left">
                    <div className="text-xs font-bold" style={{ color: a.color }}>
                      {a.name}
                    </div>
                    <div className="text-[10px] text-[#4a6080]">{a.role}</div>
                  </div>
                  {a.id === selectedAgentId && (
                    <span className="ml-auto text-green-400 text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full pulse-dot"
            style={{ backgroundColor: agent.color }}
          />
          <span className="text-[10px] text-[#4a6080] tracking-widest">BEREIT</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <span className="text-5xl mb-4">{agent.avatar_emoji}</span>
            <div className="text-lg font-bold" style={{ color: agent.color }}>
              {agent.name}
            </div>
            <div className="text-sm text-[#4a6080] mt-1">{agent.role}</div>
            <div className="text-xs text-[#3a5070] mt-4 max-w-sm leading-relaxed">
              {agent.description}
            </div>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {agent.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] px-2 py-1 rounded border"
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
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5"
                style={{ backgroundColor: agent.color + '20' }}
              >
                {agent.avatar_emoji}
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-lg px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-green-400/10 border border-green-400/20 text-slate-200'
                  : 'bg-[#0d1520] border border-[#1a2535] text-slate-300'
              } ${msg.role === 'assistant' && streaming && i === messages.length - 1 && msg.content === '' ? 'cursor-blink' : ''}`}
            >
              {msg.content ||
                (msg.role === 'assistant' && streaming && i === messages.length - 1 ? '' : '…')}
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-[#1a2535] flex items-center justify-center text-xs flex-shrink-0 mt-0.5 text-[#6a8aaa]">
                Du
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[#1a2535] bg-[#0d1520] px-6 py-4">
        <div className="flex gap-3 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={`Nachricht an ${agent.name}… (Enter = senden, Shift+Enter = Umbruch)`}
            rows={1}
            className="flex-1 bg-[#080d16] border border-[#1a2535] rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-[#3a5070] resize-none focus:outline-none focus:border-green-400/40 transition-colors"
            style={{ minHeight: '48px', maxHeight: '160px' }}
            onInput={(e) => {
              const t = e.currentTarget
              t.style.height = 'auto'
              t.style.height = Math.min(t.scrollHeight, 160) + 'px'
            }}
            disabled={streaming}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || streaming}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
            style={{
              backgroundColor: agent.color + '20',
              color: agent.color,
              border: `1px solid ${agent.color}40`,
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
