import React from 'react'


interface Props {
    amount: string;
    depositDate: string;
    withdrawalDate: string;
    name: string;
  }

function Deposit(props: Props) {
  return (
    <div className='w-full py-5 shadow-sm my-4 bg-white items-center rounded-md flex justify-between px-5'>
      <div className='font-bold'>{props.name}</div>
      <div>{props.amount}</div>
      <div>{props.depositDate}</div>
      <div>{props.withdrawalDate}</div>
      <button className='buttonflex items-center rounded-lg border-2 border-dashed border-gray-500 bg-gray-100 px-6 text-sm uppercase tracking-wider text-gray-900 lg:h-12 3xl:h-13'>Withdraw Now</button>
    </div>
  )
}

export default Deposit;
