-- ============================================================
-- CI CONSULTING WAR ROOM — Supabase Schema
-- ============================================================
-- Führe dieses SQL im Supabase Dashboard → SQL Editor aus.
-- ============================================================

-- 1. AGENTS — Die AI-Agenten und ihre Konfiguration
-- ============================================================
CREATE TABLE agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#22c55e',
  avatar_emoji TEXT DEFAULT '🤖',
  model TEXT DEFAULT 'claude-sonnet-4-20250514',
  system_prompt TEXT,
  skills TEXT[] DEFAULT '{}',
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Default Agenten für CI Consulting
INSERT INTO agents (id, name, role, description, color, avatar_emoji, skills) VALUES
  ('scan', 'Scan', 'Commander / Orchestrator',
   'Koordiniert alle Agenten. Überblickt Tasks, delegiert Arbeit, überwacht Fortschritt.',
   '#22c55e', '🎯', ARRAY['delegation', 'monitoring', 'planning']),
  ('quilly', 'Quilly', 'Content Director',
   'Erstellt Instagram-Content-Ideen, Reels-Skripte, B-Roll-Pläne, Captions. Kennt die Brand Voice jedes Clients.',
   '#f97316', '✍️', ARRAY['instagram_ideas', 'reel_scripts', 'broll_plans', 'captions']),
  ('ovi', 'Ovi', 'Research & Intel',
   'Marktrecherche, Wettbewerbsanalyse, Trend-Scouting, Weekly Reports für CI Consulting.',
   '#3b82f6', '🔍', ARRAY['competitor_analysis', 'trend_research', 'weekly_report']),
  ('larry', 'Larry', 'Sales & Revenue',
   'DM-Outreach, Angebote schreiben, Follow-ups, Pipeline-Management. Spricht Deutsch, kennt den Hannover-Markt.',
   '#ef4444', '💰', ARRAY['dm_outreach', 'proposals', 'followups', 'pipeline']),
  ('cleo', 'Cleo', 'Client Success',
   'Client-Onboarding, Reporting, Kommunikation, Zufriedenheits-Tracking.',
   '#a855f7', '💎', ARRAY['onboarding', 'reporting', 'communication']);

-- 2. CLIENTS — Deine Agentur-Kunden
-- ============================================================
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  business_type TEXT,
  instagram_handle TEXT,
  tiktok_handle TEXT,
  brand_voice TEXT,                -- Beschreibung der Brand Voice
  content_themes TEXT[],           -- Wiederkehrende Themen
  tier TEXT DEFAULT 'STANDARD',    -- MICRO, STARTER, STANDARD, PREMIUM, ELITE
  monthly_fee DECIMAL(10,2),
  status TEXT DEFAULT 'active',    -- active, paused, churned
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Deine aktuellen Clients
INSERT INTO clients (name, business_type, instagram_handle, brand_voice, tier, status) VALUES
  ('My Chicken', 'Restaurant', '@mychicken_hannover',
   'Jung, frisch, Community-nah. Hannover-Slang okay. Emojis sparsam.', 'STANDARD', 'active'),
  ('Babamia Hannover', 'Restaurant (Döner)', '@babamia_hannover',
   'Authentisch, warm, familiengeführt. Fokus auf Qualität und Tradition.', 'STANDARD', 'active'),
  ('Albina Neurografik', 'Coaching / Kreativ', '@albina_neurografik',
   'Inspirierend, ruhig, kreativ. Neurografik als Selbstentdeckung.', 'STARTER', 'active'),
  ('Koç Barbershop', 'Barbershop', '@koc_barbershop',
   'Maskulin, clean, Premium-Gefühl. Vorher/Nachher Content.', 'STARTER', 'active');

-- 3. TASKS — Aufgaben im Operations Board
-- ============================================================
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'backlog',   -- backlog, in_progress, review, completed
  priority TEXT DEFAULT 'medium',  -- low, medium, high, urgent
  assigned_agent TEXT REFERENCES agents(id),
  client_id UUID REFERENCES clients(id),
  category TEXT,                   -- content, research, sales, ops, client
  due_date DATE,
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',     -- Flexible Daten je nach Task-Typ
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. DELIVERABLES — Alle Agent-Outputs
-- ============================================================
CREATE TABLE deliverables (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,               -- script, research, copy, strategy, brand_docs, email
  content TEXT,                     -- Der eigentliche Output
  status TEXT DEFAULT 'draft',      -- draft, review, approved, published
  agent_id TEXT REFERENCES agents(id),
  client_id UUID REFERENCES clients(id),
  task_id UUID REFERENCES tasks(id),
  metadata JSONB DEFAULT '{}',      -- Z.B. { hook: "...", cta: "..." } für Scripts
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. CONVERSATIONS — Chat-Verläufe mit Agenten
-- ============================================================
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id TEXT REFERENCES agents(id) NOT NULL,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL,               -- user, assistant
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. PIPELINE — Sales / Prospect Tracking
-- ============================================================
CREATE TABLE prospects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  contact_name TEXT,
  instagram_handle TEXT,
  phone TEXT,
  email TEXT,
  business_type TEXT,
  city TEXT DEFAULT 'Hannover',
  stage TEXT DEFAULT 'identified',  -- identified, contacted, responded, meeting, proposal, closed, lost
  source TEXT,                      -- instagram_dm, cold_outreach, referral, inbound
  notes TEXT,
  next_action TEXT,
  next_action_date DATE,
  assigned_agent TEXT DEFAULT 'larry' REFERENCES agents(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. WEEKLY REPORTS — Intelligence Reports von Ovi
-- ============================================================
CREATE TABLE weekly_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  report_date DATE DEFAULT CURRENT_DATE,
  competitor_insights JSONB DEFAULT '[]',
  market_signals JSONB DEFAULT '[]',
  recommendations TEXT,
  urgency_score DECIMAL(3,1) DEFAULT 3.0,
  agent_id TEXT DEFAULT 'ovi' REFERENCES agents(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. SOPS — Standard Operating Procedures
-- ============================================================
CREATE TABLE sops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,                    -- sales, content, infrastructure, client
  description TEXT,
  steps JSONB NOT NULL DEFAULT '[]', -- Array von { step: 1, title: "...", detail: "..." }
  owner_agent TEXT REFERENCES agents(id),
  is_active BOOLEAN DEFAULT true,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Default SOPs
INSERT INTO sops (title, category, description, owner_agent, steps) VALUES
  ('Content-Produktion für Client', 'content',
   'Kompletter Workflow: Idee → Skript → B-Roll Plan → Review → Publish', 'quilly',
   '[
     {"step": 1, "title": "Client-Briefing prüfen", "detail": "Brand Voice, aktuelle Themen, letzte Posts checken"},
     {"step": 2, "title": "5 Content-Ideen generieren", "detail": "Quilly erstellt 5 Ideen basierend auf Client-Daten und Trends"},
     {"step": 3, "title": "Skript schreiben", "detail": "Hook → Story → CTA Format, max 60 Sekunden"},
     {"step": 4, "title": "B-Roll Plan erstellen", "detail": "Shot-Liste mit Timing, Locations, Requisiten"},
     {"step": 5, "title": "Review & Freigabe", "detail": "Caner prüft, gibt Feedback oder approved"},
     {"step": 6, "title": "In Deliverables speichern", "detail": "Finales Skript + Plan als Deliverable ablegen"}
   ]'::jsonb),
  ('Neukunden-Onboarding', 'client',
   'Vom Vertragsabschluss bis zum ersten Content-Piece', 'cleo',
   '[
     {"step": 1, "title": "Willkommens-Nachricht senden", "detail": "Persönliche DM/WhatsApp mit nächsten Schritten"},
     {"step": 2, "title": "Brand-Daten sammeln", "detail": "Logo, Farben, Brand Voice, Zielgruppe, Wettbewerber"},
     {"step": 3, "title": "Client-Profil anlegen", "detail": "In Supabase clients-Tabelle eintragen"},
     {"step": 4, "title": "Erster Content-Plan", "detail": "Quilly erstellt 2-Wochen Content-Plan"},
     {"step": 5, "title": "Erstes kostenloses Video", "detail": "Gratis-Video als Einstieg produzieren"},
     {"step": 6, "title": "Feedback-Call planen", "detail": "Nach 1 Woche: Wie läufts? Anpassungen?"}
   ]'::jsonb),
  ('DM-Outreach Workflow', 'sales',
   'Kalter Instagram-DM-Outreach für Neukunden-Akquise in Hannover', 'larry',
   '[
     {"step": 1, "title": "Prospect identifizieren", "detail": "Lokale Businesses in Hannover ohne guten Social Media Auftritt"},
     {"step": 2, "title": "Profil analysieren", "detail": "Follower, Posting-Frequenz, Content-Qualität bewerten"},
     {"step": 3, "title": "Personalisierte DM schreiben", "detail": "Bezug auf spezifischen Post/Story, kein Copy-Paste"},
     {"step": 4, "title": "Follow-up planen", "detail": "Nach 3 Tagen Follow-up wenn keine Antwort"},
     {"step": 5, "title": "In Pipeline eintragen", "detail": "Prospect in Supabase mit Status tracken"},
     {"step": 6, "title": "Bei Interesse: Angebot senden", "detail": "Passenden Tier vorschlagen, kostenloses Video anbieten"}
   ]'::jsonb);

-- 9. AGENT ACTIVITY LOG — Was machen die Agenten?
-- ============================================================
CREATE TABLE agent_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id TEXT REFERENCES agents(id) NOT NULL,
  action TEXT NOT NULL,             -- task_started, task_completed, message_sent, deliverable_created
  description TEXT,
  task_id UUID REFERENCES tasks(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. INDEXES für Performance
-- ============================================================
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_agent ON tasks(assigned_agent);
CREATE INDEX idx_tasks_client ON tasks(client_id);
CREATE INDEX idx_deliverables_status ON deliverables(status);
CREATE INDEX idx_deliverables_agent ON deliverables(agent_id);
CREATE INDEX idx_deliverables_client ON deliverables(client_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_prospects_stage ON prospects(stage);
CREATE INDEX idx_agent_activity_agent ON agent_activity(agent_id);
CREATE INDEX idx_agent_activity_created ON agent_activity(created_at DESC);

-- 11. UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_deliverables_updated_at BEFORE UPDATE ON deliverables
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_prospects_updated_at BEFORE UPDATE ON prospects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_sops_updated_at BEFORE UPDATE ON sops
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- FERTIG! Deine War Room Datenbank ist ready.
-- ============================================================
