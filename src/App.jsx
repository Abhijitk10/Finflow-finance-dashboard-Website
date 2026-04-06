import { useEffect } from 'react'
import { useStore } from './context/store'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import InsightsPage from './pages/InsightsPage'

const PAGES = {
  dashboard: DashboardPage,
  transactions: TransactionsPage,
  insights: InsightsPage,
}

export default function App() {
  const { activePage, darkMode } = useStore()
  const Page = PAGES[activePage] || DashboardPage

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark' : ''}`}
         style={{ background: darkMode ? '#0a0a0f' : '#f4f4f8', color: darkMode ? '#f0f0f8' : '#111118' }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Page />
          </div>
        </main>
      </div>
    </div>
  )
}
