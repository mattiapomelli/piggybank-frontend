import { useState } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'

import { CHAIN } from '@constants/chains'
import ConnectModal from '@components/ConnectModal'

const WalletStatus = () => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const [showConnectModal, setShowConnectModal] = useState(false)

  // Wrong network
  if (chain?.unsupported) {
    return (
      <button
      className="hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none text-white bg-red-500 hover:bg-red-600 px-5 py-3 rounded-full"
        onClick={() => switchNetwork?.(CHAIN.id)}
      >
        Switch to {CHAIN.name}
      </button>
    )
  }

  // Connected
  if (
    isConnected
  ) {
    return (
      <div>
        {address}
        </div>
    )
  }

  // Disconnected
  return (
    <>
      <button className="hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none text-white bg-gray-800 hover:bg-black px-5 py-3 rounded-full">Connect</button>
      <ConnectModal
          show={showConnectModal}
          onClose={() => setShowConnectModal(false)}
        />
    </>
  )
}

export default WalletStatus