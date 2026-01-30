import { Routes, Route } from 'react-router-dom'
import ModernLanding from './pages/ModernLanding'
import ModernDashboard from './pages/ModernDashboard'
import DashboardExplore from './pages/DashboardExplore'
import ExploreLight from './pages/ExploreLight'
import CreateAgent from './pages/CreateAgent'
import CreateRestaurantOnboarding from './pages/CreateRestaurantOnboarding'
import CreateReceptionist from './pages/CreateReceptionist'
import CreateOutboundSales from './pages/CreateOutboundSales'
import CreateCustom from './pages/CreateCustom'
import QuickStartContactCenter from './pages/QuickStartContactCenter'
import QuickStartReceptionist from './pages/QuickStartReceptionist'
import QuickStartHealthcare from './pages/QuickStartHealthcare'
import MyAgents from './pages/MyAgents'
import CallHistory from './pages/CallHistory'
import Settings from './pages/Settings'
import Documentation from './pages/Documentation'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ModernLanding />} />
      <Route path="/dashboard" element={<ModernDashboard />} />
      <Route path="/dashboard/explore" element={<DashboardExplore />} />
      <Route path="/explore" element={<ExploreLight />} />
      <Route path="/create" element={<CreateAgent />} />
      <Route path="/create/restaurant" element={<CreateRestaurantOnboarding />} />
      <Route path="/create/receptionist" element={<CreateReceptionist />} />
      <Route path="/create/outbound-sales" element={<CreateOutboundSales />} />
      <Route path="/create/custom" element={<CreateCustom />} />
      <Route path="/quick-start/contact-center" element={<QuickStartContactCenter />} />
      <Route path="/quick-start/receptionist" element={<QuickStartReceptionist />} />
      <Route path="/quick-start/healthcare" element={<QuickStartHealthcare />} />
      <Route path="/dashboard/my-agents" element={<MyAgents />} />
      <Route path="/my-agents" element={<MyAgents />} />
      <Route path="/history" element={<CallHistory />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/docs" element={<Documentation />} />
      <Route path="/documentation" element={<Documentation />} />
    </Routes>
  )
}

export default App
