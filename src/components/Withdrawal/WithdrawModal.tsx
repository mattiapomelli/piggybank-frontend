import classNames from 'classnames'
import { Connector, useConnect } from 'wagmi'
import Modal, { BaseModalProps } from '@components/UI/Modal'
import WithdrawForm from './WithdrawForm'


const WithdrawModal = ({ show, onClose }: BaseModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <WithdrawForm />
        <p>
            Withdrawing before the date will result in a loss of funds.
          </p>
      </div>
    </Modal>
  )
}

export default WithdrawModal;
