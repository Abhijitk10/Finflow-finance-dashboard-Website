import { useState } from 'react'
import { useStore } from '../../context/store'
import { formatCurrency, formatDate, getCategoryInfo } from '../../utils/helpers'
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE = 10

export default function TransactionList() {
  const { getFilteredTransactions, deleteTransaction, openModal, role } = useStore()
  const [page, setPage] = useState(1)

  const all = getFilteredTransactions()
  const total = all.length
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const paged = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) deleteTransaction(id)
  }

  if (total === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-text-secondary font-medium">No transactions found</p>
        <p className="text-text-dim text-sm mt-1">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      {/* Table header */}
      <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-border bg-bg-secondary">
        <span className="text-xs font-medium text-text-dim uppercase tracking-wider">Transaction</span>
        <span className="text-xs font-medium text-text-dim uppercase tracking-wider">Date</span>
        <span className="text-xs font-medium text-text-dim uppercase tracking-wider">Category</span>
        <span className="text-xs font-medium text-text-dim uppercase tracking-wider text-right">Amount</span>
        {role === 'admin' && <span className="text-xs font-medium text-text-dim uppercase tracking-wider">Actions</span>}
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {paged.map((tx, i) => {
          const info = getCategoryInfo(tx.category)
          const isIncome = tx.type === 'income'
          return (
            <div
              key={tx.id}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_auto] gap-2 md:gap-4 px-5 py-4 hover:bg-bg-hover transition-colors items-center animate-fade-in"
              style={{ animationDelay: `${i * 0.03}s`, animationFillMode: 'both' }}
            >
              {/* Description + account */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: `${info.color}18`, border: `1px solid ${info.color}25` }}
                >
                  {info.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{tx.description}</p>
                  <p className="text-xs text-text-dim truncate">{tx.account}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex md:block items-center gap-2">
                <span className="text-xs text-text-dim md:hidden">Date:</span>
                <span className="text-xs text-text-secondary font-mono">{formatDate(tx.date)}</span>
              </div>

              {/* Category */}
              <div className="flex items-center gap-1.5">
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: `${info.color}15`,
                    color: info.color,
                    border: `1px solid ${info.color}25`,
                  }}
                >
                  {info.label}
                </span>
              </div>

              {/* Amount */}
              <div className="text-right">
                <p className={`font-mono text-sm font-semibold ${isIncome ? 'text-success' : 'text-danger'}`}>
                  {isIncome ? '+' : '−'}{formatCurrency(tx.amount)}
                </p>
                <span className={isIncome ? 'badge-income' : 'badge-expense'}>{tx.type}</span>
              </div>

              {/* Actions (admin only) */}
              {role === 'admin' && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openModal({ type: 'edit', transaction: tx })}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-text-dim hover:text-accent hover:bg-accent/10 transition-all"
                    title="Edit"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(tx.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-text-dim hover:text-danger hover:bg-danger/10 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-bg-secondary">
          <p className="text-xs text-text-dim">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={13} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
                  p === page
                    ? 'bg-accent text-bg-primary'
                    : 'border border-border text-text-secondary hover:text-text-primary'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
