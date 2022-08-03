import { useForm } from 'react-hook-form'
import Button from '../UI/Button'

import InputField from '../UI/Input'

interface DepositInputs {
  name: string
  amount: string
}

const DepositForm = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepositInputs>()

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
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
      <Button type="submit" className="mt-2">
        Deposit
      </Button>
    </form>
  )
}

export default DepositForm
