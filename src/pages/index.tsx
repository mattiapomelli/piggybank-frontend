import type { NextPage } from 'next'
import { useAccount, useConnect } from 'wagmi'

const Home: NextPage = () => {
  const { connector: activeConnector, isConnected, address } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

  return (
    <>
      {isConnected && (
        <div>
          {address} Connected to {activeConnector?.name}
        </div>
      )}

      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect({ connector })}>
          {connector.id === 'injected' ? 'MetaMask' : connector.name}
          {isLoading &&
            pendingConnector?.id === connector.id &&
            ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </>
  )
}

export default Home
