import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'http'

function warRoomApiPlugin() {
  return {
    name: 'war-room-api',
    configureServer(server: any) {
      server.middlewares.use(
        '/api/chat',
        async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
          if (req.method === 'OPTIONS') {
            res.writeHead(204)
            res.end()
            return
          }
          if (req.method !== 'POST') return next()

          let body = ''
          req.on('data', (chunk: Buffer) => (body += chunk.toString()))
          req.on('end', async () => {
            try {
              const { messages, systemPrompt } = JSON.parse(body)
              const apiKey = process.env.ANTHROPIC_API_KEY

              if (!apiKey) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured in .env' }))
                return
              }

              const { default: Anthropic } = await import('@anthropic-ai/sdk')
              const anthropic = new Anthropic({ apiKey })

              res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
              })

              const stream = anthropic.messages.stream({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 2048,
                system: systemPrompt,
                messages,
              })

              for await (const event of stream) {
                if (
                  event.type === 'content_block_delta' &&
                  event.delta.type === 'text_delta'
                ) {
                  res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
                }
              }

              res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
              res.end()
            } catch (err: any) {
              console.error('[war-room-api] error:', err.message)
              if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: err.message }))
              }
            }
          })
        }
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), warRoomApiPlugin()],
  server: {
    port: 5173,
  },
})
