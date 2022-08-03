import classNames from 'classnames'
import { Connector, useConnect } from 'wagmi'

import Modal, { BaseModalProps } from '@components/UI/Modal'
import MetamaskIcon from '@icons/metamask.svg'
import WalletConnectIcon from '@icons/walletconnect.svg'

interface ConnectorIconProps {
  name: string
  className?: string
}

const ConnectorIcon = ({ name, className }: ConnectorIconProps) => {
  switch (name) {
    case 'WalletConnect':
      return <WalletConnectIcon className={className} />
    default:
      return <MetamaskIcon className={className} />
  }
}

const ConnectModal = ({ show, onClose }: BaseModalProps) => {
  const { connectors, connectAsync, error } = useConnect()

  const onConnect = async (connector: Connector) => {
    if (connector.ready) {
      try {
        await connectAsync({ connector })
        onClose()
      } catch (error) {
        console.error('Error while connecting', error)
      }
    }
  }

  return (
    <Modal show={show} onClose={onClose}>
      <h4 className="font-bold text-xl text-center mb-6">
        Connect your wallet
      </h4>
      <div className="flex flex-col gap-4">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => onConnect(connector)}
            className={classNames(
              'bg-gray-100 flex items-center px-4 py-3 rounded-lg gap-4 ',
              connector.ready
                ? 'hover:bg-gray-200'
                : 'cursor-not-allowed opacity-60',
            )}
          >
            <ConnectorIcon name={connector.name} className="text-3xl" />
            {connector.id === 'injected' ? 'MetaMask' : connector.name}
            {!connector.ready && ' (Unsupported)'}
          </button>
        ))}
      </div>
      {error && <div className="text-red-500 mt-4">{error.message}</div>}
    </Modal>
  )
}

export default ConnectModal
