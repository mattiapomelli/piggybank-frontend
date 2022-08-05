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
import useMounted from '@hooks/useMounted'

const Home: NextPage = () => {
  const { address, isReconnecting } = useAccount()
  const { balance } = useTokenBalance()
  const mounted = useMounted()

  const loading = isReconnecting || !mounted

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
    <Container className="py-6">
      <div>
        <p>
          <span className="font-bold">Your balance: </span>
          {!loading && (
            <>
              {balance?.formatted} {balance?.symbol}
            </>
          )}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-x-10 gap-y-16 mt-8">
        <DepositForm onDepositSuccess={refetchDeposits} className="flex-1" />
        <ClaimRewards
          rewards={rewards || BigNumber.from(0)}
          onClaimSuccess={refetchRewards}
          className="flex-1"
        />
      </div>
      {!loading && (
        <DepositsList
          deposits={deposits || []}
          onWithdrawSuccess={refetchDeposits}
          className="mt-16"
        />
      )}
    </Container>
  )
}

export default Home
