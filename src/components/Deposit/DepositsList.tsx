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
        className="text-xs font-medium text-gray-900 3xl:text-sm"
      >
        <Deposit
          amount="250 USCD"
          name="Bicicletta"
          withdrawalDate="25/09/1999"
          depositDate="25/09/1999"
        />
        
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
