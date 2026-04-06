import { useStore } from '../../context/store'
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  ChevronLeft, ChevronRight, TrendingUp
} from 'lucide-react'
import { clsx } from '../../utils/helpers'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
]

export default function Sidebar() {
  const { activePage, setActivePage, sidebarOpen, toggleSidebar } = useStore()

  return (
    <aside
      className={clsx(
        'flex flex-col bg-bg-secondary border-r border-border transition-all duration-300 ease-in-out relative',
        sidebarOpen ? 'w-56' : 'w-16'
      )}
    >
      {/* Logo */}
      <div className={clsx(
        'flex items-center gap-3 px-4 py-5 border-b border-border min-h-[72px]',
        !sidebarOpen && 'justify-center px-2'
      )}>
        <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-glow-sm">
          <TrendingUp size={16} className="text-bg-primary" strokeWidth={2.5} />
        </div>
        {sidebarOpen && (
          <div>
            <div className="font-display text-base font-semibold text-text-primary leading-none">Finflow</div>
            <div className="text-xs text-text-dim mt-0.5">Finance Dashboard</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActivePage(id)}
            className={clsx(
              'nav-item w-full text-left',
              activePage === id && 'active',
              !sidebarOpen && 'justify-center px-2'
            )}
            title={!sidebarOpen ? label : undefined}
          >
            <Icon size={17} className="flex-shrink-0" />
            {sidebarOpen && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 z-10 w-6 h-6 bg-bg-card border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/50 transition-colors shadow-card"
      >
        {sidebarOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
      </button>

      {/* Bottom version */}
      <div className={clsx(
        'p-3 border-t border-border',
        !sidebarOpen && 'flex justify-center'
      )}>
        {sidebarOpen ? (
          <div className="text-xs text-text-dim">v1.0.0 · Finflow</div>
        ) : (
          <div className="w-2 h-2 rounded-full bg-success animate-pulse-slow" title="System Online" />
        )}
      </div>
    </aside>
  )
}
