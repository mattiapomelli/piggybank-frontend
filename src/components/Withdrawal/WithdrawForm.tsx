import { useForm } from 'react-hook-form'
import Button from '../UI/Button'

import InputField from '../UI/Input'

interface WithdrawInputs {
  amount: string
}


const WithdrawForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<WithdrawInputs>()
  return (
    <>
      <form className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Withdraw</h2>
        <InputField
          label="Amount"
          placeholder="Enter amount in USDC"
          id="amount"
          type="number"
          fullWidth
          error={errors.amount?.message}
          {...register('amount', { required: 'Amount is required' })}
        />
        <Button
          type="submit"
          className="mt-2"
        >
          Withdraw
        </Button>
      </form>
    </>
  )
}

export default WithdrawForm;
