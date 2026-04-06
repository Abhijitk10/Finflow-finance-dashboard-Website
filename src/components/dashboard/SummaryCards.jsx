import { useStore } from '../../context/store'
import { formatCurrency } from '../../utils/helpers'
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react'
import { useEffect, useState } from 'react'

const CARDS = [
  {
    key: 'balance',
    label: 'Total Balance',
    icon: Wallet,
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    glow: 'shadow-glow',
    desc: 'All accounts combined',
  },
  {
    key: 'income',
    label: 'Total Income',
    icon: TrendingUp,
    color: 'text-success',
    bg: 'bg-success/10',
    border: 'border-success/20',
    glow: '',
    desc: 'All time earnings',
  },
  {
    key: 'expenses',
    label: 'Total Expenses',
    icon: TrendingDown,
    color: 'text-danger',
    bg: 'bg-danger/10',
    border: 'border-danger/20',
    glow: '',
    desc: 'All time spending',
  },
  {
    key: 'savings',
    label: 'Net Savings',
    icon: PiggyBank,
    color: 'text-info',
    bg: 'bg-info/10',
    border: 'border-info/20',
    glow: '',
    desc: 'Income minus expenses',
  },
]

function AnimatedNumber({ value }) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 800
    const step = 16
    const increment = value / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setDisplayed(value)
        clearInterval(timer)
      } else {
        setDisplayed(Math.floor(start))
      }
    }, step)
    return () => clearInterval(timer)
  }, [value])

  return <span>{formatCurrency(displayed)}</span>
}

export default function SummaryCards() {
  const { getSummary } = useStore()
  const summary = getSummary()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {CARDS.map(({ key, label, icon: Icon, color, bg, border, glow, desc }, i) => (
        <div
          key={key}
          className={`card-hover p-5 flex flex-col gap-3 animate-slide-up animate-delay-${i + 1} ${glow}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">{label}</p>
              <p className="text-xs text-text-dim mt-0.5">{desc}</p>
            </div>
            <div className={`w-9 h-9 rounded-lg ${bg} border ${border} flex items-center justify-center`}>
              <Icon size={16} className={color} />
            </div>
          </div>
          <div className={`font-mono text-2xl font-semibold ${color}`}>
            <AnimatedNumber value={summary[key]} />
          </div>
        </div>
      ))}
    </div>
  )
}
