import type { NextPage } from 'next'

import DepositsList from '@components/DepositsList'
import Container from '@components/Layout/Container'

const Home: NextPage = () => {
  return (
    <Container>
      <DepositsList />
    </Container>
  )
}

export default Home
