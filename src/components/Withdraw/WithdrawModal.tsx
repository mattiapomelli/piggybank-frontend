import { PiggyBank } from '@abis/types'
import Button from '@components/UI/Button'
import InputField from '@components/UI/Input'
import Modal, { BaseModalProps } from '@components/UI/Modal'
import { usePiggyBankContractWrite } from '@hooks/useContractWriteAndWait'
import { toMillis } from '@utils/dates'
import { ethers } from 'ethers'
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
  } = useForm<WithdrawInputs>()

  const isEarly = Date.now() < toMillis(deposit.withdrawalDate)

  const {
    write: withdraw,
    isLoading,
    error,
  } = usePiggyBankContractWrite({
    functionName: 'withdraw',
    onSuccess() {
      onWithdrawSuccess()
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

        {isEarly && (
          <div className="bg-[#FDEDD4] rounded-xl p-6">
            <p>
              Warning! You're withdrawing your deposite before the date you
              committed to. You'll be charged a fee if you want to proceed.
            </p>
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
