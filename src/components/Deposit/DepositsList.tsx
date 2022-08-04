import { usePiggyBankContractRead } from '@hooks/useContractRead'
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

function DepositsList() {
  const { address } = useAccount()
  const { data: deposits } = usePiggyBankContractRead<
    PiggyBank.DepositStructOutput[]
  >({
    functionName: 'getUserDeposits',
    args: [address],
    enabled: address !== undefined,
  })

  return (
    <table
      role="table"
      className="mt-20 transaction-table w-full border-separate border-0"
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
