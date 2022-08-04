import { PIGGY_BANK_ADDRESS } from '@constants/addresses'
import { CHAIN } from '@constants/chains'
import { useTokenContractRead } from '@hooks/useContractRead'
import {
  usePiggyBankContractWrite,
  useTokenContractWrite,
} from '@hooks/useContractWriteAndWait'
import { BigNumber, ethers } from 'ethers'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAccount } from 'wagmi'
import Button from '../UI/Button'

import InputField from '../UI/Input'

interface DepositInputs {
  name: string
  amount: string
  withdrawalDate: string
}

const DepositForm = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<DepositInputs>()
  const { address } = useAccount()
  const [needsApprove, setNeedsApprove] = useState(false)

  const { data: allowance, refetch } = useTokenContractRead<BigNumber>({
    functionName: 'allowance',
    args: [address, PIGGY_BANK_ADDRESS[CHAIN.id]],
  })

  const {
    write: approve,
    isLoading: loadingApprove,
    error: approveError,
  } = useTokenContractWrite({
    functionName: 'approve',
    onSuccess() {
      setNeedsApprove(false)
      refetch()
    },
  })

  const {
    write: deposit,
    isLoading: loadingDeposit,
    error: depositError,
  } = usePiggyBankContractWrite({
    functionName: 'deposit',
    onSuccess() {
      reset()
    },
  })

  const onApprove = () => {
    approve({
      args: [
        PIGGY_BANK_ADDRESS[CHAIN.id],
        ethers.utils.parseEther(getValues('amount')),
      ],
    })
  }

  const onSubmit = handleSubmit((data) => {
    const { name, amount, withdrawalDate } = data
    const depositAmount = ethers.utils.parseEther(amount)
    const formattedWithdrawalDate = new Date(withdrawalDate).getTime() / 1000

    if (allowance && allowance.lt(depositAmount)) {
      setNeedsApprove(true)
      return
    }

    deposit({
      args: [name, formattedWithdrawalDate, depositAmount],
    })
  })

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <h2 className="text-2xl font-bold">Deposit</h2>
        <InputField
          label="Name"
          placeholder="Your deposit name"
          id="name"
          fullWidth
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />
        <InputField
          label="Amount"
          placeholder="Enter amount"
          id="amount"
          type="number"
          fullWidth
          error={errors.amount?.message}
          {...register('amount', { required: 'Amount is required' })}
        />
        <InputField
          label="Withdrawal date"
          id="withdrawalDate"
          type="date"
          fullWidth
          error={errors.withdrawalDate?.message}
          {...register('withdrawalDate', {
            required: 'Withdrawal date is required',
            validate: (value) => {
              if (new Date(value).getTime() < Date.now())
                return 'Date should be in the future'
            },
          })}
        />
        <Button
          type="submit"
          className="mt-2"
          loading={loadingDeposit}
          disabled={needsApprove}
        >
          Deposit
        </Button>
      </form>
      {needsApprove && (
        <div className="bg-[#FDEDD4] rounded-xl mt-8 p-6">
          <p>
            Your allowance is insufficient. You first need to approve the
            spending of your tokens in order to deposit
          </p>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-2"
              onClick={onApprove}
              loading={loadingApprove}
            >
              Approve
            </Button>
          </div>
        </div>
      )}
      {(approveError || depositError) && (
        <div className="bg-red-200 rounded-xl mt-8 p-6 text-red-700">
          {approveError?.message ||
            depositError?.message ||
            'Something went wrong'}
        </div>
      )}
    </>
  )
}

export default DepositForm
