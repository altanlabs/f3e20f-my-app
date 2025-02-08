import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout'
import IndexPage from './pages'
import TagsPage from './pages/tags'
import ComponentsPage from './pages/components'
import NotFound from './pages/NotFound'
import { ThemeProvider } from '@/theme/theme-provider'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="tags" element={<TagsPage />} />
            <Route path="components" element={<ComponentsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App