import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from './layouts/AdminLayout'
import { RequireAuth } from './features/auth/RequireAuth'
import { LoginPage } from './features/auth/LoginPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { RegistrationsPage } from './features/registrations/RegistrationsPage'
import { CrmPage } from './features/crm/CrmPage'
import { ModulePlaceholderPage } from './features/modules/ModulePlaceholderPage'
import { CentresPage } from './features/centres/CentresPage'
import { LandingPage } from './features/landing/LandingPage'

function App() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/website" element={<LandingPage />} />
    {import.meta.env.DEV && <Route path="/preview" element={<AdminLayout preview />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="registrations" element={<RegistrationsPage />} />
      <Route path="crm" element={<CrmPage />} />
      <Route path="centres" element={<CentresPage />} />
      <Route path="attendance" element={<ModulePlaceholderPage title="Attendance" description="Preview of the attendance module." />} />
      <Route path="payments" element={<ModulePlaceholderPage title="Payments" description="Preview of the payments module." />} />
      <Route path="sports-camps" element={<ModulePlaceholderPage title="Sports Camps" description="Preview of the camps module." />} />
      <Route path="transport" element={<ModulePlaceholderPage title="Transport" description="Preview of the transport module." />} />
      <Route path="reports" element={<ModulePlaceholderPage title="Reports" description="Preview of the reports module." />} />
    </Route>}
    <Route element={<RequireAuth />}>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="registrations" element={<RegistrationsPage />} />
        <Route path="crm" element={<CrmPage />} />
        <Route path="centres" element={<CentresPage />} />
        <Route path="attendance" element={<ModulePlaceholderPage title="Attendance" description="Coach session marking and attendance operations will be connected in a later sprint." />} />
        <Route path="payments" element={<ModulePlaceholderPage title="Payments" description="Invoices, payments and receipts will be connected when the billing APIs are available." />} />
        <Route path="sports-camps" element={<ModulePlaceholderPage title="Sports Camps" description="Camp setup, bookings and group management are planned for a later phase." />} />
        <Route path="transport" element={<ModulePlaceholderPage title="Transport" description="Transport requests and approvals will be connected when the transport APIs are available." />} />
        <Route path="reports" element={<ModulePlaceholderPage title="Reports" description="Role-scoped reports and exports are planned for a later phase." />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
}

export default App
