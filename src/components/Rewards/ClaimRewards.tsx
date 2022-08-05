import Button from '@components/UI/Button'
import { usePiggyBankContractWrite } from '@hooks/useContractWriteAndWait'
import useMounted from '@hooks/useMounted'
import useTokenBalance from '@hooks/useTokenBalance'
import { BigNumber, ethers } from 'ethers'
import { useAccount } from 'wagmi'

interface ClaimRewardsProps {
  rewards: BigNumber
  onClaimSuccess: () => void
  className?: string
}

const ClaimRewards = ({
  rewards,
  onClaimSuccess,
  className,
}: ClaimRewardsProps) => {
  const { refetch } = useTokenBalance()

  const { address, isReconnecting } = useAccount()
  const mounted = useMounted()

  const loading = isReconnecting || !mounted

  const {
    write: claimRewards,
    isLoading,
    error,
  } = usePiggyBankContractWrite({
    functionName: 'claimRewards',
    onSuccess() {
      refetch()
      onClaimSuccess()
    },
  })

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">Rewards</h2>
      {!loading && address && (
        <>
          {rewards.gt(0) ? (
            <div className="bg-green-200 rounded-xl p-6">
              <p>
                You have rewards! You can redeem{' '}
                {ethers.utils.formatEther(rewards)} USDC
              </p>
              <div className="flex justify-end">
                <Button
                  className="mt-2"
                  onClick={() => claimRewards()}
                  loading={isLoading}
                >
                  Claim
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-gray-700 text-center text-xl mt-6">
              You have no rewards to redeem
            </div>
          )}
        </>
      )}
      {!loading && !address && (
        <div className="text-gray-700 text-center text-xl mt-6">
          Connect your wallet to see your rewards
        </div>
      )}
      {error && (
        <div className="bg-red-200 rounded-xl p-6 text-red-700">
          {error?.message || 'Something went wrong'}
        </div>
      )}
    </div>
  )
}

export default ClaimRewards
