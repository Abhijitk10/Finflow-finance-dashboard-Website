import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'
import { MONTHLY_DATA } from '../../data/mockData'
import { formatCurrency } from '../../utils/helpers'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-bg-card border border-border rounded-xl p-3 shadow-card min-w-[180px]">
      <p className="text-xs font-medium text-text-secondary mb-2 uppercase tracking-wider">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-text-secondary capitalize">{entry.name}</span>
          </div>
          <span className="font-mono font-medium" style={{ color: entry.color }}>
            {formatCurrency(entry.value, true)}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function BalanceTrend() {
  return (
    <div className="card p-5 animate-slide-up animate-delay-3">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title">Balance Trend</h2>
          <p className="text-xs text-text-dim mt-0.5">6-month income vs expense overview</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-text-secondary">
            <span className="w-3 h-0.5 bg-accent rounded" />
            Income
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary">
            <span className="w-3 h-0.5 bg-danger rounded" />
            Expenses
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary">
            <span className="w-3 h-0.5 bg-info rounded" />
            Savings
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={MONTHLY_DATA} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3d" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'DM Sans' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${v / 1000}K`}
            width={52}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#f59e0b"
            strokeWidth={2}
            fill="url(#incomeGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#f59e0b' }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#expenseGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#ef4444' }}
          />
          <Area
            type="monotone"
            dataKey="savings"
            name="Savings"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#savingsGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#6366f1' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
