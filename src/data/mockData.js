import { subDays, subMonths, format } from 'date-fns'

const today = new Date()

export const CATEGORIES = {
  food: { label: 'Food & Dining', color: '#f59e0b', icon: '🍽️' },
  transport: { label: 'Transport', color: '#6366f1', icon: '🚗' },
  shopping: { label: 'Shopping', color: '#ec4899', icon: '🛍️' },
  utilities: { label: 'Utilities', color: '#14b8a6', icon: '⚡' },
  health: { label: 'Health', color: '#10b981', icon: '💊' },
  entertainment: { label: 'Entertainment', color: '#8b5cf6', icon: '🎬' },
  salary: { label: 'Salary', color: '#10b981', icon: '💼' },
  freelance: { label: 'Freelance', color: '#06b6d4', icon: '💻' },
  investment: { label: 'Investment', color: '#f97316', icon: '📈' },
  rent: { label: 'Rent', color: '#ef4444', icon: '🏠' },
  education: { label: 'Education', color: '#a78bfa', icon: '📚' },
  travel: { label: 'Travel', color: '#fcd34d', icon: '✈️' },
}

const raw = [
  // December
  { id: 't001', date: subMonths(today, 3), amount: 95000, category: 'salary', type: 'income', description: 'Monthly Salary - December', account: 'HDFC ****4521' },
  { id: 't002', date: subMonths(today, 3), amount: 18500, category: 'freelance', type: 'income', description: 'Client Project - Web Dev', account: 'PayPal' },
  { id: 't003', date: subMonths(today, 3), amount: 12000, category: 'rent', type: 'expense', description: 'Monthly Rent', account: 'HDFC ****4521' },
  { id: 't004', date: subMonths(today, 3), amount: 3200, category: 'food', type: 'expense', description: 'Groceries - BigBasket', account: 'HDFC ****4521' },
  { id: 't005', date: subMonths(today, 3), amount: 1800, category: 'transport', type: 'expense', description: 'Ola/Uber Monthly', account: 'HDFC ****4521' },
  { id: 't006', date: subMonths(today, 3), amount: 5500, category: 'shopping', type: 'expense', description: 'Amazon - Electronics', account: 'SBI ****8833' },
  { id: 't007', date: subMonths(today, 3), amount: 800, category: 'entertainment', type: 'expense', description: 'Netflix + Spotify', account: 'HDFC ****4521' },
  { id: 't008', date: subMonths(today, 3), amount: 2200, category: 'utilities', type: 'expense', description: 'Electricity & Internet', account: 'SBI ****8833' },

  // 2 months ago
  { id: 't009', date: subMonths(today, 2), amount: 95000, category: 'salary', type: 'income', description: 'Monthly Salary - January', account: 'HDFC ****4521' },
  { id: 't010', date: subMonths(today, 2), amount: 22000, category: 'freelance', type: 'income', description: 'UI/UX Consulting Project', account: 'PayPal' },
  { id: 't011', date: subMonths(today, 2), amount: 12000, category: 'rent', type: 'expense', description: 'Monthly Rent', account: 'HDFC ****4521' },
  { id: 't012', date: subMonths(today, 2), amount: 4100, category: 'food', type: 'expense', description: 'Dining + Delivery', account: 'SBI ****8833' },
  { id: 't013', date: subMonths(today, 2), amount: 15000, category: 'travel', type: 'expense', description: 'Goa Trip - Flight + Hotel', account: 'HDFC ****4521' },
  { id: 't014', date: subMonths(today, 2), amount: 3500, category: 'shopping', type: 'expense', description: 'Myntra - Clothes', account: 'SBI ****8833' },
  { id: 't015', date: subMonths(today, 2), amount: 1200, category: 'health', type: 'expense', description: 'Gym Membership', account: 'HDFC ****4521' },
  { id: 't016', date: subMonths(today, 2), amount: 800, category: 'entertainment', type: 'expense', description: 'Movie Tickets + OTT', account: 'SBI ****8833' },
  { id: 't017', date: subMonths(today, 2), amount: 2200, category: 'utilities', type: 'expense', description: 'Electricity & Internet', account: 'HDFC ****4521' },
  { id: 't018', date: subMonths(today, 2), amount: 10000, category: 'investment', type: 'income', description: 'Mutual Fund Returns', account: 'Zerodha' },

  // Last month
  { id: 't019', date: subMonths(today, 1), amount: 95000, category: 'salary', type: 'income', description: 'Monthly Salary - February', account: 'HDFC ****4521' },
  { id: 't020', date: subMonths(today, 1), amount: 30000, category: 'freelance', type: 'income', description: 'Mobile App Project - Milestone 1', account: 'PayPal' },
  { id: 't021', date: subMonths(today, 1), amount: 12000, category: 'rent', type: 'expense', description: 'Monthly Rent', account: 'HDFC ****4521' },
  { id: 't022', date: subMonths(today, 1), amount: 6500, category: 'food', type: 'expense', description: 'Groceries + Dining', account: 'SBI ****8833' },
  { id: 't023', date: subMonths(today, 1), amount: 2400, category: 'transport', type: 'expense', description: 'Fuel + Cab Rides', account: 'HDFC ****4521' },
  { id: 't024', date: subMonths(today, 1), amount: 8900, category: 'shopping', type: 'expense', description: 'iPhone Accessories + Decor', account: 'SBI ****8833' },
  { id: 't025', date: subMonths(today, 1), amount: 1200, category: 'health', type: 'expense', description: 'Doctor Visit + Medicines', account: 'HDFC ****4521' },
  { id: 't026', date: subMonths(today, 1), amount: 800, category: 'entertainment', type: 'expense', description: 'Streaming + Games', account: 'SBI ****8833' },
  { id: 't027', date: subMonths(today, 1), amount: 2200, category: 'utilities', type: 'expense', description: 'Electricity & Internet', account: 'HDFC ****4521' },
  { id: 't028', date: subMonths(today, 1), amount: 5000, category: 'education', type: 'expense', description: 'Udemy Courses + Books', account: 'HDFC ****4521' },
  { id: 't029', date: subMonths(today, 1), amount: 15000, category: 'investment', type: 'income', description: 'Stock Dividends', account: 'Zerodha' },

  // This month (current)
  { id: 't030', date: subDays(today, 28), amount: 95000, category: 'salary', type: 'income', description: 'Monthly Salary - March', account: 'HDFC ****4521' },
  { id: 't031', date: subDays(today, 26), amount: 12000, category: 'rent', type: 'expense', description: 'Monthly Rent', account: 'HDFC ****4521' },
  { id: 't032', date: subDays(today, 24), amount: 3800, category: 'food', type: 'expense', description: 'Swiggy + Zepto Orders', account: 'SBI ****8833' },
  { id: 't033', date: subDays(today, 22), amount: 25000, category: 'freelance', type: 'income', description: 'SaaS Dashboard Project', account: 'PayPal' },
  { id: 't034', date: subDays(today, 20), amount: 1500, category: 'transport', type: 'expense', description: 'Monthly Metro Pass', account: 'HDFC ****4521' },
  { id: 't035', date: subDays(today, 18), amount: 4200, category: 'shopping', type: 'expense', description: 'Flipkart Big Billion Days', account: 'SBI ****8833' },
  { id: 't036', date: subDays(today, 15), amount: 1200, category: 'health', type: 'expense', description: 'Gym Membership', account: 'HDFC ****4521' },
  { id: 't037', date: subDays(today, 13), amount: 2200, category: 'utilities', type: 'expense', description: 'Electricity & Internet', account: 'HDFC ****4521' },
  { id: 't038', date: subDays(today, 10), amount: 12000, category: 'investment', type: 'income', description: 'Mutual Fund SIP Returns', account: 'Zerodha' },
  { id: 't039', date: subDays(today, 8), amount: 1800, category: 'entertainment', type: 'expense', description: 'Concert Tickets', account: 'SBI ****8833' },
  { id: 't040', date: subDays(today, 5), amount: 3500, category: 'education', type: 'expense', description: 'Workshop + Certification', account: 'HDFC ****4521' },
  { id: 't041', date: subDays(today, 3), amount: 950, category: 'food', type: 'expense', description: 'Weekend Brunch', account: 'SBI ****8833' },
  { id: 't042', date: subDays(today, 1), amount: 6800, category: 'travel', type: 'expense', description: 'Weekend Getaway - Hotel', account: 'HDFC ****4521' },
]

export const MOCK_TRANSACTIONS = raw.map(t => ({
  ...t,
  date: format(t.date, 'yyyy-MM-dd'),
}))

export const MONTHLY_DATA = [
  { month: 'Oct', income: 98000, expenses: 42000, savings: 56000 },
  { month: 'Nov', income: 110000, expenses: 55000, savings: 55000 },
  { month: 'Dec', income: 113500, expenses: 45500, savings: 68000 },
  { month: 'Jan', income: 127000, expenses: 57800, savings: 69200 },
  { month: 'Feb', income: 140000, expenses: 59000, savings: 81000 },
  { month: 'Mar', income: 132000, expenses: 50200, savings: 81800 },
]

export const INITIAL_BALANCE = 285400
