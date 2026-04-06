import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MOCK_TRANSACTIONS, INITIAL_BALANCE } from '../data/mockData'
import { format } from 'date-fns'

let nextId = 1000

export const useStore = create(
  persist(
    (set, get) => ({
      // Role
      role: 'admin', // 'admin' | 'viewer'
      setRole: (role) => set({ role }),

      // Dark mode
      darkMode: true,
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

      // Navigation
      activePage: 'dashboard',
      setActivePage: (page) => set({ activePage: page }),

      // Sidebar
      sidebarOpen: true,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      // Transactions
      transactions: MOCK_TRANSACTIONS,

      addTransaction: (tx) =>
        set((s) => ({
          transactions: [
            {
              ...tx,
              id: `t${++nextId}`,
              date: tx.date || format(new Date(), 'yyyy-MM-dd'),
            },
            ...s.transactions,
          ],
        })),

      updateTransaction: (id, updates) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      // Filters
      filters: {
        search: '',
        type: 'all',
        category: 'all',
        sortBy: 'date',
        sortDir: 'desc',
        dateFrom: '',
        dateTo: '',
      },
      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),
      resetFilters: () =>
        set({
          filters: {
            search: '',
            type: 'all',
            category: 'all',
            sortBy: 'date',
            sortDir: 'desc',
            dateFrom: '',
            dateTo: '',
          },
        }),

      // Modal
      modal: null, // null | 'add' | { type: 'edit', transaction }
      openModal: (modal) => set({ modal }),
      closeModal: () => set({ modal: null }),

      // Computed helpers (not reactive, call as functions)
      getFilteredTransactions: () => {
        const { transactions, filters } = get()
        let result = [...transactions]

        if (filters.search) {
          const q = filters.search.toLowerCase()
          result = result.filter(
            (t) =>
              t.description.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q) ||
              t.account?.toLowerCase().includes(q)
          )
        }

        if (filters.type !== 'all') {
          result = result.filter((t) => t.type === filters.type)
        }

        if (filters.category !== 'all') {
          result = result.filter((t) => t.category === filters.category)
        }

        if (filters.dateFrom) {
          result = result.filter((t) => t.date >= filters.dateFrom)
        }

        if (filters.dateTo) {
          result = result.filter((t) => t.date <= filters.dateTo)
        }

        result.sort((a, b) => {
          if (filters.sortBy === 'date') {
            return filters.sortDir === 'desc'
              ? b.date.localeCompare(a.date)
              : a.date.localeCompare(b.date)
          }
          if (filters.sortBy === 'amount') {
            return filters.sortDir === 'desc'
              ? b.amount - a.amount
              : a.amount - b.amount
          }
          if (filters.sortBy === 'category') {
            return filters.sortDir === 'desc'
              ? b.category.localeCompare(a.category)
              : a.category.localeCompare(b.category)
          }
          return 0
        })

        return result
      },

      getSummary: () => {
        const { transactions } = get()
        const income = transactions
          .filter((t) => t.type === 'income')
          .reduce((s, t) => s + t.amount, 0)
        const expenses = transactions
          .filter((t) => t.type === 'expense')
          .reduce((s, t) => s + t.amount, 0)
        return {
          income,
          expenses,
          balance: INITIAL_BALANCE + income - expenses,
          savings: income - expenses,
        }
      },

      getCurrentMonthSummary: () => {
        const { transactions } = get()
        const now = new Date()
        const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
        const current = transactions.filter((t) => t.date.startsWith(ym))
        const income = current.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
        const expenses = current.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
        return { income, expenses, savings: income - expenses }
      },

      getSpendingByCategory: () => {
        const { transactions } = get()
        const expenses = transactions.filter((t) => t.type === 'expense')
        const map = {}
        expenses.forEach((t) => {
          map[t.category] = (map[t.category] || 0) + t.amount
        })
        return Object.entries(map)
          .map(([category, amount]) => ({ category, amount }))
          .sort((a, b) => b.amount - a.amount)
      },
    }),
    {
      name: 'finflow-storage',
      partialState: (s) => ({
        transactions: s.transactions,
        role: s.role,
        darkMode: s.darkMode,
      }),
    }
  )
)
