import type { NextPage } from 'next'
import { useAccount, useConnect } from 'wagmi'
import DepositsList from '@components/DepositsList';
const Home: NextPage = () => {
  const { connector: activeConnector, isConnected, address } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

  return (
    <>
      <DepositsList/>
    </>
    );
}

export default Home
