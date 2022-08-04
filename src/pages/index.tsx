import type { NextPage } from 'next'

import Container from '@components/Layout/Container'
import DepositForm from '@components/Deposit/DepositForm'
import DepositsList from '@components/Deposit/DepositsList'
import { useAccount } from 'wagmi'

const Home: NextPage = () => {
  const { address, isReconnecting } = useAccount()

  return (
    <Container className="py-6">
      <DepositForm />
      {address && !isReconnecting && <DepositsList />}
    </Container>
  )
}

export default Home
