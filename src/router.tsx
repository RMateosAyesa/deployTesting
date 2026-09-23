import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import styled from 'styled-components'
import type { SidebarProps } from './ui/components/Organisms/Sidebar'
import { sidebarItems } from './ui/config/sidebar'

const OverviewPage = lazy(() => import('./ui/pages/OverviewPage'))
const LithiumSystemPage = lazy(() => import('./ui/pages/lithium-system'))
const AnomalyScenarioPage = lazy(() => import('./ui/pages/AnomalyScenarioPage'))
const SensorDataConfigPage = lazy(() => import('./ui/pages/sensor-data-config'))
const SensorConfigurationPage = lazy(() => import('./ui/pages/sensor-configuration'))
const LoginPage = lazy(() => import('./ui/pages/login'))

const LoadingFallback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

function useSidebar(): SidebarProps {
  const navigate = useNavigate()
  const location = useLocation()
  const activeId = location.pathname.replace('/', '').split('/')[0] || 'overview'

  return {
    items: sidebarItems,
    activeId,
    onSelect: (id) => {
      if (id === 'datalab') return
      navigate(`/${id}`)
    },
  }
}

function OverviewPageWrapper() {
  const sidebar = useSidebar()
  return <OverviewPage sidebar={sidebar} />
}

function LithiumSystemPageWrapper() {
  const sidebar = useSidebar()
  return <LithiumSystemPage sidebar={sidebar} />
}

function AnomalyScenarioPageWrapper() {
  const sidebar = useSidebar()
  return <AnomalyScenarioPage sidebar={sidebar} />
}

function SensorDataConfigPageWrapper() {
  const sidebar = useSidebar()
  const navigate = useNavigate()
  return (
    <SensorDataConfigPage
      sidebar={sidebar}
      onSensorSettingsOpen={(sensorTitle) =>
        navigate(`/sensor-configuration?sensorTitle=${encodeURIComponent(sensorTitle)}`)
      }
    />
  )
}

function SensorConfigurationPageWrapper() {
  const sidebar = useSidebar()
  const navigate = useNavigate()
  return (
    <SensorConfigurationPage
      sidebar={sidebar}
      onBack={() => navigate('/sensor-data-config')}
    />
  )
}

export function AppRoutes() {
  return (
    <Suspense
      fallback={
        <LoadingFallback>
          <Spin size="large" />
        </LoadingFallback>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<OverviewPageWrapper />} />
        <Route path="/lithium" element={<LithiumSystemPageWrapper />} />
        <Route path="/anomaly" element={<AnomalyScenarioPageWrapper />} />
        <Route path="/sensor-data-config" element={<SensorDataConfigPageWrapper />} />
        <Route path="/sensor-configuration" element={<SensorConfigurationPageWrapper />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Suspense>
  )
}
