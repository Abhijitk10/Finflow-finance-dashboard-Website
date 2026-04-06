import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { useStore } from '../../context/store'
import { getCategoryInfo, formatCurrency } from '../../utils/helpers'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0]
  const info = getCategoryInfo(d.payload.category)
  return (
    <div className="bg-bg-card border border-border rounded-xl p-3 shadow-card">
      <div className="flex items-center gap-2 mb-1">
        <span>{info.icon}</span>
        <span className="text-sm font-medium text-text-primary">{info.label}</span>
      </div>
      <p className="font-mono text-accent text-sm">{formatCurrency(d.value)}</p>
      <p className="text-xs text-text-dim">{d.payload.percent}% of expenses</p>
    </div>
  )
}

export default function SpendingBreakdown() {
  const { getSpendingByCategory } = useStore()
  const raw = getSpendingByCategory()
  const total = raw.reduce((s, c) => s + c.amount, 0)

  const data = raw.slice(0, 6).map((item) => ({
    ...item,
    color: getCategoryInfo(item.category).color,
    percent: ((item.amount / total) * 100).toFixed(1),
  }))

  return (
    <div className="card p-5 animate-slide-up animate-delay-4">
      <div className="mb-6">
        <h2 className="section-title">Spending Breakdown</h2>
        <p className="text-xs text-text-dim mt-0.5">Category distribution of all expenses</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={80}
                paddingAngle={3}
                dataKey="amount"
                stroke="none"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} opacity={0.9} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs text-text-dim">Total</p>
            <p className="font-mono text-sm font-semibold text-text-primary">
              {formatCurrency(total, true)}
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-2 w-full">
          {data.map((item) => {
            const info = getCategoryInfo(item.category)
            return (
              <div key={item.category} className="flex items-center gap-3">
                <span className="text-sm">{info.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-text-secondary truncate">{info.label}</span>
                    <span className="text-xs font-mono text-text-primary ml-2 flex-shrink-0">
                      {formatCurrency(item.amount, true)}
                    </span>
                  </div>
                  <div className="h-1 bg-bg-tertiary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${item.percent}%`, background: item.color }}
                    />
                  </div>
                </div>
                <span className="text-xs text-text-dim w-10 text-right flex-shrink-0">{item.percent}%</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
