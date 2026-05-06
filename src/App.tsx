import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import ChatRoom from './pages/ChatRoom'
import Tasks from './pages/Tasks'
import Clients from './pages/Clients'
import Pipeline from './pages/Pipeline'
import Deliverables from './pages/Deliverables'

export default function App() {
  return (
    <div className="scanlines">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/chat/:agentId" element={<ChatRoom />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/deliverables" element={<Deliverables />} />
        </Route>
      </Routes>
    </div>
  )
}
