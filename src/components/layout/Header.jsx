import { useStore } from '../../context/store'
import { Sun, Moon, Shield, Eye, Bell, Download } from 'lucide-react'
import { exportToCSV, exportToJSON } from '../../utils/helpers'
import { useState } from 'react'

const PAGE_TITLES = {
  dashboard: { title: 'Dashboard', sub: 'Financial overview & analytics' },
  transactions: { title: 'Transactions', sub: 'All your financial activity' },
  insights: { title: 'Insights', sub: 'Spending patterns & analysis' },
}

export default function Header() {
  const { activePage, role, setRole, darkMode, toggleDarkMode, transactions } = useStore()
  const { title, sub } = PAGE_TITLES[activePage] || PAGE_TITLES.dashboard
  const [exportOpen, setExportOpen] = useState(false)

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-bg-secondary min-h-[72px] gap-4">
      {/* Title */}
      <div>
        <h1 className="font-display text-xl font-semibold text-text-primary leading-none">{title}</h1>
        <p className="text-xs text-text-dim mt-1">{sub}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">

        {/* Role Switcher */}
        <div className="flex items-center bg-bg-tertiary border border-border rounded-lg p-1 gap-1">
          <button
            onClick={() => setRole('viewer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              role === 'viewer'
                ? 'bg-info/20 text-info border border-info/30'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Eye size={12} />
            Viewer
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              role === 'admin'
                ? 'bg-accent/20 text-accent border border-accent/30'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Shield size={12} />
            Admin
          </button>
        </div>

        {/* Export */}
        <div className="relative">
          <button
            onClick={() => setExportOpen(!exportOpen)}
            className="btn-ghost flex items-center gap-2"
            title="Export Data"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export</span>
          </button>
          {exportOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-bg-card border border-border rounded-xl shadow-card z-50 p-1 animate-slide-up">
              <button
                onClick={() => { exportToCSV(transactions); setExportOpen(false) }}
                className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-colors"
              >
                Export as CSV
              </button>
              <button
                onClick={() => { exportToJSON(transactions); setExportOpen(false) }}
                className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-colors"
              >
                Export as JSON
              </button>
            </div>
          )}
        </div>

        {/* Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:text-accent hover:border-accent/40 transition-all"
          title="Toggle dark mode"
        >
          {darkMode ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Bell */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-light transition-all relative">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-semibold text-sm">
          {role === 'admin' ? 'A' : 'V'}
        </div>
      </div>
    </header>
  )
}
