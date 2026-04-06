import SummaryCards from '../components/dashboard/SummaryCards'
import BalanceTrend from '../components/dashboard/BalanceTrend'
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import { useStore } from '../context/store'
import { formatCurrency } from '../utils/helpers'
import { Zap } from 'lucide-react'

function CurrentMonthBanner() {
  const { getCurrentMonthSummary } = useStore()
  const { income, expenses, savings } = getCurrentMonthSummary()
  const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(0) : 0
  const isGoodSavings = savingsRate >= 20

  return (
    <div className={`card p-4 border-l-4 ${isGoodSavings ? 'border-l-success' : 'border-l-amber-500'} animate-slide-up`}>
      <div className="flex items-center gap-2 flex-wrap">
        <Zap size={14} className={isGoodSavings ? 'text-success' : 'text-accent'} />
        <span className="text-sm font-medium text-text-primary">This Month Snapshot</span>
        <div className="flex items-center gap-4 ml-2 flex-wrap">
          <span className="text-sm text-text-secondary">
            Income: <span className="font-mono text-success font-medium">{formatCurrency(income, true)}</span>
          </span>
          <span className="text-sm text-text-secondary">
            Expenses: <span className="font-mono text-danger font-medium">{formatCurrency(expenses, true)}</span>
          </span>
          <span className="text-sm text-text-secondary">
            Savings: <span className={`font-mono font-medium ${savings >= 0 ? 'text-info' : 'text-danger'}`}>{formatCurrency(Math.abs(savings), true)}</span>
          </span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${isGoodSavings ? 'bg-success/15 text-success border-success/25' : 'bg-accent/15 text-accent border-accent/25'}`}>
            {savingsRate}% saved {isGoodSavings ? '🎯' : '⚡'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <CurrentMonthBanner />
      <SummaryCards />
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3">
          <BalanceTrend />
        </div>
        <div className="xl:col-span-2">
          <SpendingBreakdown />
        </div>
      </div>
      <RecentTransactions />
    </div>
  )
}
