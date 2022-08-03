import type { NextPage } from 'next'

import Container from '@components/Layout/Container'
import DepositForm from '@components/Deposit/DepositForm'
// import DepositsList from '@components/DepositsList'

const Home: NextPage = () => {
  return (
    <Container className="py-6">
      <DepositForm />
      {/* <DepositsList /> */}
    </Container>
  )
}

export default Home
