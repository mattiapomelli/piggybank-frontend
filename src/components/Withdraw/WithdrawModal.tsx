import { PiggyBank } from '@abis/types'
import Button from '@components/UI/Button'
import InputField from '@components/UI/Input'
import Modal, { BaseModalProps } from '@components/UI/Modal'
import { usePiggyBankContractRead } from '@hooks/useContractRead'
import { usePiggyBankContractWrite } from '@hooks/useContractWriteAndWait'
import { toMillis } from '@utils/dates'
import { BigNumber, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface WithdrawInputs {
  amount: string
}

interface WithdrawModalProps extends BaseModalProps {
  deposit: PiggyBank.DepositStructOutput
  onWithdrawSuccess: () => void
}

const WithdrawModal = ({
  show,
  onClose,
  deposit,
  onWithdrawSuccess,
}: WithdrawModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<WithdrawInputs>()
  const [penalty, setPenalty] = useState<number | undefined>()

  const { data: penaltyFee } = usePiggyBankContractRead<number>({
    functionName: 'penaltyFee',
  })

  const { data: platformFee } = usePiggyBankContractRead<number>({
    functionName: 'platformFee',
  })

  useEffect(() => {
    const subscription = watch((value) => {
      if (!penaltyFee || !platformFee || !value.amount) return

      const fee = (penaltyFee + platformFee) / 100
      const penalty = (Number(value.amount) * fee) / 100

      setPenalty(penalty)
    })
    return () => subscription.unsubscribe()
  }, [watch, penaltyFee, platformFee])

  const isEarly = Date.now() < toMillis(deposit.withdrawalDate)

  const {
    write: withdraw,
    isLoading,
    error,
  } = usePiggyBankContractWrite({
    functionName: 'withdraw',
    onSuccess() {
      onWithdrawSuccess()
      onClose()
      reset()
    },
  })

  const onSubmit = handleSubmit((data) => {
    const withdrawAmount = ethers.utils.parseEther(data.amount)

    withdraw({
      args: [deposit.id, withdrawAmount],
    })
  })

  return (
    <Modal show={show} onClose={onClose}>
      <h4 className="font-bold text-xl text-center mb-6">Withdraw</h4>
      <p>
        <span className="font-bold">Deposit name: </span>
        {deposit.name}
      </p>
      <p>
        <span className="font-bold">Deposited amount: </span>
        {ethers.utils.formatEther(deposit.amount)}
      </p>

      <form className="mt-8 flex flex-col gap-4" onSubmit={onSubmit}>
        <InputField
          label="Amount"
          placeholder="Enter amount to withdraw"
          id="amount"
          type="number"
          fullWidth
          step="any"
          error={
            errors.amount?.type === 'max'
              ? 'Value should be lower than deposited amount'
              : errors.amount?.message
          }
          {...register('amount', {
            required: 'Amount is required',
            max: ethers.utils.formatEther(deposit.amount),
          })}
        />

        {isEarly ? (
          <>
            {penalty && (
              <p className="text-red-600">
                <span className="font-bold">Penalty: </span>
                {penalty}
              </p>
            )}
            <div className="bg-[#FDEDD4] rounded-xl p-6">
              <p>
                Warning! You're withdrawing your deposite before the date you
                committed to. You'll be charged a fee if you want to proceed.
              </p>
            </div>
          </>
        ) : (
          <div className="bg-green-200 rounded-xl p-6">
            <p>You successfully saved money as you committed toloca!</p>
          </div>
        )}
        <Button type="submit" loading={isLoading}>
          Withdraw
        </Button>
        {error && (
          <div className="bg-red-200 rounded-xl p-6 text-red-700">
            {error?.message || 'Something went wrong'}
          </div>
        )}
      </form>
    </Modal>
  )
}

export default WithdrawModal
