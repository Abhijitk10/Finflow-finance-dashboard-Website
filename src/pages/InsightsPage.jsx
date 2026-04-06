import { useStore } from '../context/store'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { getCategoryInfo, formatCurrency } from '../utils/helpers'
import { MONTHLY_DATA } from '../data/mockData'
import { TrendingUp, TrendingDown, Award, AlertTriangle, Flame, Target } from 'lucide-react'

const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-bg-card border border-border rounded-xl p-3 shadow-card">
      <p className="text-xs text-text-dim mb-2 uppercase tracking-wider">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex justify-between gap-4 text-sm">
          <span className="text-text-secondary capitalize">{p.name}</span>
          <span className="font-mono font-medium" style={{ color: p.color }}>
            {formatCurrency(p.value, true)}
          </span>
        </div>
      ))}
    </div>
  )
}

function MonthlyComparison() {
  const last = MONTHLY_DATA[MONTHLY_DATA.length - 2]
  const current = MONTHLY_DATA[MONTHLY_DATA.length - 1]
  const incomeDiff = current.income - last.income
  const expenseDiff = current.expenses - last.expenses
  const savingsDiff = current.savings - last.savings

  const metrics = [
    { label: 'Income', current: current.income, diff: incomeDiff, color: '#f59e0b' },
    { label: 'Expenses', current: current.expenses, diff: expenseDiff, color: '#ef4444', invert: true },
    { label: 'Savings', current: current.savings, diff: savingsDiff, color: '#6366f1' },
  ]

  return (
    <div className="card p-5 animate-slide-up animate-delay-1">
      <div className="mb-5">
        <h2 className="section-title">Monthly Comparison</h2>
        <p className="text-xs text-text-dim mt-0.5">
          {last.month} vs {current.month} — month-over-month change
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {metrics.map(({ label, current: val, diff, color, invert }) => {
          const positive = invert ? diff < 0 : diff > 0
          const Icon = positive ? TrendingUp : TrendingDown
          return (
            <div key={label} className="bg-bg-tertiary rounded-xl p-4 border border-border">
              <p className="text-xs text-text-dim uppercase tracking-wider mb-2">{label}</p>
              <p className="font-mono text-xl font-semibold" style={{ color }}>
                {formatCurrency(val, true)}
              </p>
              <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${positive ? 'text-success' : 'text-danger'}`}>
                <Icon size={11} />
                {Math.abs(diff).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                <span className="text-text-dim font-normal">vs last month</span>
              </div>
            </div>
          )
        })}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={MONTHLY_DATA} margin={{ top: 4, right: 0, left: 0, bottom: 0 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3d" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}K`} width={48} />
          <Tooltip content={<CustomBarTooltip />} />
          <Bar dataKey="income" name="Income" fill="#f59e0b" opacity={0.85} radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" name="Expenses" fill="#ef4444" opacity={0.75} radius={[4, 4, 0, 0]} />
          <Bar dataKey="savings" name="Savings" fill="#6366f1" opacity={0.8} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function SpendingInsightCards() {
  const { getSpendingByCategory, transactions, getCurrentMonthSummary } = useStore()
  const spending = getSpendingByCategory()
  const topCategory = spending[0]
  const topInfo = topCategory ? getCategoryInfo(topCategory.category) : null
  const totalExpenses = spending.reduce((s, c) => s + c.amount, 0)
  const currentMonth = getCurrentMonthSummary()
  const savingsRate = currentMonth.income > 0
    ? ((currentMonth.savings / currentMonth.income) * 100).toFixed(1)
    : '0'

  const txCount = transactions.length
  const avgTxAmount = txCount ? Math.round(totalExpenses / txCount) : 0

  const cards = [
    {
      icon: Flame,
      color: 'text-accent',
      bg: 'bg-accent/10',
      border: 'border-accent/20',
      label: 'Top Spending Category',
      value: topInfo ? `${topInfo.icon} ${topInfo.label}` : '—',
      sub: topCategory ? `${formatCurrency(topCategory.amount, true)} total spend` : 'No data',
    },
    {
      icon: Target,
      color: 'text-info',
      bg: 'bg-info/10',
      border: 'border-info/20',
      label: 'Savings Rate (This Month)',
      value: `${savingsRate}%`,
      sub: savingsRate >= 20 ? '✅ Above 20% target' : '⚠️ Below 20% target',
    },
    {
      icon: Award,
      color: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/20',
      label: 'Avg Transaction Value',
      value: formatCurrency(avgTxAmount, true),
      sub: `Across ${txCount} transactions`,
    },
    {
      icon: AlertTriangle,
      color: 'text-danger',
      bg: 'bg-danger/10',
      border: 'border-danger/20',
      label: 'Largest Expense Category',
      value: topInfo ? `${topInfo.icon} ${topInfo.label}` : '—',
      sub: topCategory
        ? `${((topCategory.amount / totalExpenses) * 100).toFixed(1)}% of total spending`
        : 'No data',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(({ icon: Icon, color, bg, border, label, value, sub }, i) => (
        <div
          key={label}
          className={`card-hover p-5 animate-slide-up animate-delay-${i + 2}`}
        >
          <div className={`w-9 h-9 rounded-lg ${bg} border ${border} flex items-center justify-center mb-3`}>
            <Icon size={16} className={color} />
          </div>
          <p className="text-xs text-text-dim uppercase tracking-wider mb-1">{label}</p>
          <p className="text-lg font-semibold text-text-primary leading-tight">{value}</p>
          <p className="text-xs text-text-secondary mt-1">{sub}</p>
        </div>
      ))}
    </div>
  )
}

function CategoryDeepDive() {
  const { getSpendingByCategory } = useStore()
  const data = getSpendingByCategory()
  const total = data.reduce((s, c) => s + c.amount, 0)

  return (
    <div className="card p-5 animate-slide-up animate-delay-3">
      <div className="mb-5">
        <h2 className="section-title">Category Deep Dive</h2>
        <p className="text-xs text-text-dim mt-0.5">Full breakdown of spending by category</p>
      </div>
      <div className="space-y-3">
        {data.map((item, i) => {
          const info = getCategoryInfo(item.category)
          const pct = ((item.amount / total) * 100).toFixed(1)
          return (
            <div
              key={item.category}
              className="flex items-center gap-3 animate-fade-in"
              style={{ animationDelay: `${i * 0.04}s`, animationFillMode: 'both' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                style={{ background: `${info.color}18`, border: `1px solid ${info.color}28` }}
              >
                {info.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text-primary">{info.label}</span>
                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    <span className="text-xs text-text-dim">{pct}%</span>
                    <span className="font-mono text-sm font-semibold text-text-primary">
                      {formatCurrency(item.amount, true)}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: info.color, transition: 'width 0.8s ease' }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <SpendingInsightCards />
      <MonthlyComparison />
      <CategoryDeepDive />
    </div>
  )
}
