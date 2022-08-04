import type { NextPage } from 'next'

import Container from '@components/Layout/Container'
import DepositForm from '@components/Deposit/DepositForm'
import DepositsList from '@components/Deposit/DepositsList'
import { useAccount } from 'wagmi'
import { usePiggyBankContractRead } from '@hooks/useContractRead'
import { PiggyBank } from '@abis/types'
import ClaimRewards from '@components/Rewards/ClaimRewards'
import useTokenBalance from '@hooks/useTokenBalance'
import { BigNumber } from 'ethers'

const Home: NextPage = () => {
  const { address, isReconnecting } = useAccount()
  const { balance } = useTokenBalance()

  const { data: deposits, refetch: refetchDeposits } = usePiggyBankContractRead<
    PiggyBank.DepositStructOutput[]
  >({
    functionName: 'getUserDeposits',
    args: [address],
    enabled: address !== undefined,
  })

  const { data: rewards, refetch: refetchRewards } =
    usePiggyBankContractRead<BigNumber>({
      functionName: 'pendingRewards',
      args: [address],
    })

  return (
    <Container className="py-6 flex flex-col gap-10">
      {address && !isReconnecting && rewards?.gte(0) && (
        <div>
          <p>
            <span className="font-bold">Your balance: </span>
            {balance?.formatted} {balance?.symbol}
          </p>
        </div>
      )}
      <DepositForm onDepositSuccess={refetchDeposits} />
      {address && !isReconnecting && deposits && (
        <>
          {rewards?.gt(0) && (
            <ClaimRewards rewards={rewards} onClaimSuccess={refetchRewards} />
          )}
          <DepositsList
            deposits={deposits}
            onWithdrawSuccess={refetchDeposits}
          />
        </>
      )}
    </Container>
  )
}

export default Home
