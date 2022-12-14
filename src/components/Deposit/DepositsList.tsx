import React from 'react'
import { PiggyBank } from '@abis/types/'

import Deposit from './Deposit'
import DepositsListHeader from './DepositsListHeader'
import { useAccount } from 'wagmi'

interface DepositsListProps {
  deposits: PiggyBank.DepositStructOutput[]
  onWithdrawSuccess: () => void
  className?: string
}

function DepositsList({
  deposits,
  onWithdrawSuccess,
  className,
}: DepositsListProps) {
  const { address } = useAccount()

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">Your Deposits</h2>
      <div className="w-full overflow-y-auto">
        <table
          role="table"
          className="transaction-table w-full border-separate border-0"
          style={{ minWidth: '880px' }}
        >
          <DepositsListHeader />
          {address && (
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
          )}
        </table>
        {address && !deposits.length && (
          <div className="text-gray-700 text-center text-xl mt-6">
            You don't have any deposits
          </div>
        )}
        {!address && (
          <div className="text-gray-700 text-center text-xl mt-6">
            Connect your wallet to see your deposits
          </div>
        )}
      </div>
    </div>
  )
}

export default DepositsList
