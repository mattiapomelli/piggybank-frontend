import { useState } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'

import { CHAIN } from '@constants/chains'
import ConnectModal from '@components/Wallet/ConnectModal'
import Address from '@components/Address/Address'
import AddressAvatar from '@components/Address/AddressAvatar'
import Button from '@components/UI/Button'

const WalletStatus = () => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const [showConnectModal, setShowConnectModal] = useState(false)

  // Wrong network
  if (chain?.unsupported) {
    return (
      <Button
        variant="danger"
        size="small"
        onClick={() => switchNetwork?.(CHAIN.id)}
      >
        Switch to {CHAIN.name}
      </Button>
    )
  }

  // Connected
  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <Address address={address} className="font-semibold text-lg" />
        <AddressAvatar address={address} size={22} />
      </div>
    )
  }

  // Disconnected
  return (
    <>
      <Button onClick={() => setShowConnectModal(true)}>Connect</Button>
      <ConnectModal
        show={showConnectModal}
        onClose={() => setShowConnectModal(false)}
      />
    </>
  )
}

export default WalletStatus
