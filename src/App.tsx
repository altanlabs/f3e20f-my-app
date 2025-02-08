import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout'
import IndexPage from './pages'
import TagsPage from './pages/tags'
import ComponentsPage from './pages/components'
import ReportsPage from './pages/reports'
import LoginPage from './pages/auth/login'
import UsersPage from './pages/settings/users'
import NotFound from './pages/NotFound'
import { ThemeProvider } from '@/theme/theme-provider'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<IndexPage />} />
            <Route path="tags" element={<TagsPage />} />
            <Route path="components" element={<ComponentsPage />} />
            <Route path="reports" element={
              <ProtectedRoute requiredRole="manager">
                <ReportsPage />
              </ProtectedRoute>
            } />
            <Route path="settings/users" element={
              <ProtectedRoute requiredRole="admin">
                <UsersPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App