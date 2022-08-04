import type { NextPage } from 'next'

import Container from '@components/Layout/Container'
import DepositForm from '@components/Deposit/DepositForm'
import DepositsList from '@components/Deposit/DepositsList'
import { useAccount } from 'wagmi'
import { usePiggyBankContractRead } from '@hooks/useContractRead'
import { PiggyBank } from '@abis/types'

const Home: NextPage = () => {
  const { address, isReconnecting } = useAccount()
  const { data: deposits, refetch } = usePiggyBankContractRead<
    PiggyBank.DepositStructOutput[]
  >({
    functionName: 'getUserDeposits',
    args: [address],
    enabled: address !== undefined,
  })

  return (
    <Container className="py-6">
      <DepositForm onDepositSuccess={refetch} />
      {address && !isReconnecting && deposits && (
        <DepositsList deposits={deposits} />
      )}
    </Container>
  )
}

export default Home
