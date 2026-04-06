import { useState, useEffect } from 'react'
import { useStore } from '../../context/store'
import { CATEGORIES } from '../../data/mockData'
import { X } from 'lucide-react'
import { format } from 'date-fns'

const ACCOUNTS = ['HDFC ****4521', 'SBI ****8833', 'PayPal', 'Zerodha', 'Cash']

export default function TransactionModal() {
  const { modal, closeModal, addTransaction, updateTransaction } = useStore()
  const isEdit = modal?.type === 'edit'
  const tx = isEdit ? modal.transaction : null

  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'food',
    date: format(new Date(), 'yyyy-MM-dd'),
    account: 'HDFC ****4521',
  })

  useEffect(() => {
    if (isEdit && tx) {
      setForm({
        description: tx.description,
        amount: String(tx.amount),
        type: tx.type,
        category: tx.category,
        date: tx.date,
        account: tx.account || 'HDFC ****4521',
      })
    }
  }, [isEdit, tx])

  const handleSubmit = () => {
    if (!form.description.trim() || !form.amount || isNaN(Number(form.amount))) return
    const data = { ...form, amount: Number(form.amount) }
    if (isEdit) {
      updateTransaction(tx.id, data)
    } else {
      addTransaction(data)
    }
    closeModal()
  }

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const expenseCategories = Object.entries(CATEGORIES).filter(
    ([k]) => !['salary', 'freelance', 'investment'].includes(k)
  )
  const incomeCategories = Object.entries(CATEGORIES).filter(
    ([k]) => ['salary', 'freelance', 'investment'].includes(k)
  )
  const categoryOptions = form.type === 'income' ? incomeCategories : expenseCategories

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
      <div className="relative bg-bg-card border border-border rounded-2xl shadow-card w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              {isEdit ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
            <p className="text-xs text-text-dim mt-0.5">
              {isEdit ? 'Update transaction details' : 'Record a new financial entry'}
            </p>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:text-danger hover:border-danger/40 transition-all"
          >
            <X size={15} />
          </button>
        </div>

        {/* Form */}
        <div className="p-5 space-y-4">
          {/* Type */}
          <div>
            <label className="label">Transaction Type</label>
            <div className="flex gap-2">
              {['expense', 'income'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    set('type', t)
                    set('category', t === 'income' ? 'salary' : 'food')
                  }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all capitalize ${
                    form.type === t
                      ? t === 'income'
                        ? 'bg-success/15 text-success border-success/30'
                        : 'bg-danger/15 text-danger border-danger/30'
                      : 'bg-bg-tertiary text-text-secondary border-border hover:border-border-light'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. Monthly Rent, Swiggy Order..."
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Amount (₹)</label>
              <input
                type="number"
                className="input"
                placeholder="0"
                min="0"
                value={form.amount}
                onChange={(e) => set('amount', e.target.value)}
              />
            </div>
            <div>
              <label className="label">Date</label>
              <input
                type="date"
                className="input"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="label">Category</label>
            <select
              className="input"
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
            >
              {categoryOptions.map(([k, v]) => (
                <option key={k} value={k}>
                  {v.icon} {v.label}
                </option>
              ))}
            </select>
          </div>

          {/* Account */}
          <div>
            <label className="label">Account</label>
            <select
              className="input"
              value={form.account}
              onChange={(e) => set('account', e.target.value)}
            >
              {ACCOUNTS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-border">
          <button onClick={closeModal} className="btn-ghost flex-1">Cancel</button>
          <button onClick={handleSubmit} className="btn-primary flex-1">
            {isEdit ? 'Update' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}
