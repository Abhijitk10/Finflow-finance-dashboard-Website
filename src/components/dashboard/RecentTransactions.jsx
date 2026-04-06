import { useStore } from '../../context/store'
import { formatCurrency, formatDateShort, getCategoryInfo } from '../../utils/helpers'
import { ArrowRight } from 'lucide-react'

export default function RecentTransactions() {
  const { transactions, setActivePage } = useStore()

  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6)

  return (
    <div className="card p-5 animate-slide-up animate-delay-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="section-title">Recent Activity</h2>
          <p className="text-xs text-text-dim mt-0.5">Latest 6 transactions</p>
        </div>
        <button
          onClick={() => setActivePage('transactions')}
          className="flex items-center gap-1 text-xs text-accent hover:text-amber-400 transition-colors font-medium"
        >
          View all <ArrowRight size={12} />
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="text-center py-8 text-text-dim text-sm">No transactions found</div>
      ) : (
        <div className="space-y-1">
          {recent.map((tx, i) => {
            const info = getCategoryInfo(tx.category)
            const isIncome = tx.type === 'income'
            return (
              <div
                key={tx.id}
                className={`flex items-center gap-3 p-2.5 rounded-lg hover:bg-bg-hover transition-colors cursor-default animate-slide-up`}
                style={{ animationDelay: `${0.05 * i}s`, animationFillMode: 'both' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: `${info.color}18`, border: `1px solid ${info.color}30` }}
                >
                  {info.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{tx.description}</p>
                  <p className="text-xs text-text-dim">{info.label} · {formatDateShort(tx.date)}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`font-mono text-sm font-medium ${isIncome ? 'text-success' : 'text-danger'}`}>
                    {isIncome ? '+' : '−'}{formatCurrency(tx.amount, true)}
                  </p>
                  <span className={`text-xs ${isIncome ? 'badge-income' : 'badge-expense'}`}>
                    {tx.type}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
