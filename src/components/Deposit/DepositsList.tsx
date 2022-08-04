import React from 'react'
import { useAccount } from 'wagmi'
import { PiggyBank } from '@abis/types/'

import Deposit from './Deposit'
import DepositsListHeader from './DepositsListHeader'
import { BigNumber, ethers } from 'ethers'

const formatDate = (date: BigNumber) => {
  const millis = Number(date.toString()) * 1000
  return new Date(millis).toLocaleDateString()
}

interface DepositsListProps {
  deposits: PiggyBank.DepositStructOutput[]
}

function DepositsList({ deposits }: DepositsListProps) {
  const { address } = useAccount()

  return (
    <table
      role="table"
      className="mt-20 transaction-table w-full border-separate border-0"
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
            amount={ethers.utils.formatEther(deposit.amount)}
            name={deposit.name}
            withdrawalDate={formatDate(deposit.withdrawalDate)}
            depositDate={formatDate(deposit.depositDate)}
          />
        ))}
      </tbody>
    </table>
  )
}

export default DepositsList
