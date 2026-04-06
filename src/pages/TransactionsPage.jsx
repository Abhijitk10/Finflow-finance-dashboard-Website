import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionList from '../components/transactions/TransactionList'
import TransactionModal from '../components/transactions/TransactionModal'
import { useStore } from '../context/store'

export default function TransactionsPage() {
  const { modal } = useStore()

  return (
    <div className="space-y-4">
      <TransactionFilters />
      <TransactionList />
      {modal && <TransactionModal />}
    </div>
  )
}
