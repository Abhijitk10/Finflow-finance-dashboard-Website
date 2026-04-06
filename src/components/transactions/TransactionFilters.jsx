import { useStore } from '../../context/store'
import { CATEGORIES } from '../../data/mockData'
import { Search, X, ChevronDown, Plus } from 'lucide-react'

export default function TransactionFilters() {
  const { filters, setFilter, resetFilters, role, openModal } = useStore()

  const hasActiveFilters =
    filters.search || filters.type !== 'all' || filters.category !== 'all' ||
    filters.dateFrom || filters.dateTo

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
          <input
            type="text"
            className="input pl-8 pr-3"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
          />
          {filters.search && (
            <button
              onClick={() => setFilter('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text-primary"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Type */}
        <div className="relative">
          <select
            className="input appearance-none pr-8 min-w-[120px]"
            value={filters.type}
            onChange={(e) => setFilter('type', e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
        </div>

        {/* Category */}
        <div className="relative">
          <select
            className="input appearance-none pr-8 min-w-[140px]"
            value={filters.category}
            onChange={(e) => setFilter('category', e.target.value)}
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORIES).map(([k, v]) => (
              <option key={k} value={k}>{v.icon} {v.label}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            className="input appearance-none pr-8 min-w-[130px]"
            value={`${filters.sortBy}:${filters.sortDir}`}
            onChange={(e) => {
              const [by, dir] = e.target.value.split(':')
              setFilter('sortBy', by)
              setFilter('sortDir', dir)
            }}
          >
            <option value="date:desc">Date ↓</option>
            <option value="date:asc">Date ↑</option>
            <option value="amount:desc">Amount ↓</option>
            <option value="amount:asc">Amount ↑</option>
            <option value="category:asc">Category A-Z</option>
          </select>
          <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
        </div>

        {/* Date range */}
        <input
          type="date"
          className="input min-w-[140px]"
          value={filters.dateFrom}
          onChange={(e) => setFilter('dateFrom', e.target.value)}
          title="From date"
        />
        <input
          type="date"
          className="input min-w-[140px]"
          value={filters.dateTo}
          onChange={(e) => setFilter('dateTo', e.target.value)}
          title="To date"
        />

        {hasActiveFilters && (
          <button onClick={resetFilters} className="btn-ghost flex items-center gap-1.5 text-danger border-danger/30 hover:bg-danger/10">
            <X size={13} />
            Clear
          </button>
        )}

        {role === 'admin' && (
          <button
            onClick={() => openModal('add')}
            className="btn-primary flex items-center gap-2 ml-auto"
          >
            <Plus size={14} />
            Add Transaction
          </button>
        )}
      </div>
    </div>
  )
}
