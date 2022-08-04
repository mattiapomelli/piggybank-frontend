import React, { useState } from "react"
import WithdrawModal from "../Withdrawal/WithdrawModal"
interface Props {
  amount: string
  depositDate: string
  withdrawalDate: string
  name: string
}


function Deposit(props: Props) {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  return (
    <>
      <tr
        role="row"
        className="shadow-sm mb-3 items-center rounded-lg bg-white uppercase shadow-card last:mb-0 dark:bg-light-dark"
        style={{ display: 'flex', flex: '1 0 auto', minWidth: '880px' }}
      >
        <td
          role="cell"
          className="px-2 py-4 tracking-[1px] ltr:first:pl-4 ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5"
          style={{
            boxSizing: 'border-box',
            flex: '180 0 auto',
            minWidth: '180px',
            width: '180px',
          }}
        >
          {props.name}
        </td>

        <td
          role="cell"
          className="px-2 py-4 tracking-[1px] ltr:first:pl-4 ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5"
          style={{
            boxSizing: 'border-box',
            flex: '160 0 auto',
            minWidth: '160px',
            width: '160px',
          }}
        >
          <div className="ltr:text-right rtl:text-left">
            {props.depositDate}
          </div>
        </td>
        <td
          role="cell"
          className="px-2 py-4 tracking-[1px] ltr:first:pl-4 ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5"
          style={{
            boxSizing: 'border-box',
            flex: '160 0 auto',
            minWidth: '160px',
            width: '160px',
          }}
        >
          <div className="ltr:text-right rtl:text-left">
            {props.withdrawalDate}
          </div>
        </td>
        <td
          role="cell"
          className="px-2 py-4 tracking-[1px] ltr:first:pl-4 ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5"
          style={{
            boxSizing: 'border-box',
            flex: '100 0 auto',
            minWidth: '100px',
            width: '100px',
          }}
        >
          <div className="-tracking-[1px] ltr:text-right rtl:text-left">
            <strong className="mb-0.5 flex justify-start text-base md:mb-1.5 md:text-lg lg:text-base 3xl:text-2xl">
              {props.amount}
            </strong>
          </div>
        </td>
        <td
          role="cell"
          className="px-2 py-4 tracking-[1px] ltr:first:pl-4 just ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5"
          style={{
            boxSizing: 'border-box',
            flex: '200 0 auto',
            minWidth: '200px',
            width: '200px',
          }}
        >
          <button onClick={() => setShowWithdrawModal(true)} className="buttonflex items-center rounded-lg border-2 border-dashed border-gray-500 bg-gray-100 px-6 text-sm uppercase tracking-wider text-gray-900 lg:h-12 3xl:h-13">
            Withdraw Now
          </button>
        </td>
      </tr>
      <WithdrawModal 
    show={showWithdrawModal}
    onClose={() => setShowWithdrawModal(false)}
  />
    </>
  )
}

export default Deposit
