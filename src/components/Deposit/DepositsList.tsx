import React from 'react'
import { PiggyBank } from '@abis/types/'

import Deposit from './Deposit'
import DepositsListHeader from './DepositsListHeader'

interface DepositsListProps {
  deposits: PiggyBank.DepositStructOutput[]
  onWithdrawSuccess: () => void
}

function DepositsList({ deposits, onWithdrawSuccess }: DepositsListProps) {
  return (
    <table
      role="table"
      className="transaction-table w-full border-separate border-0"
      style={{ minWidth: '880px' }}
    >
      <DepositsListHeader />
      <tbody
        role="rowgroup"
        className="text-xs font-medium text-gray-900 dark:text-white 3xl:text-sm"
      >
        {deposits?.map((deposit) => (
          <Deposit
            key={deposit.id.toString()}
            deposit={deposit}
            onWithdrawSuccess={onWithdrawSuccess}
          />
        ))}
      </tbody>
    </table>
  )
}

export default DepositsList