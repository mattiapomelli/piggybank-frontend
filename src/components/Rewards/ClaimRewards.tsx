import Button from '@components/UI/Button'
import { usePiggyBankContractWrite } from '@hooks/useContractWriteAndWait'
import useTokenBalance from '@hooks/useTokenBalance'
import { BigNumber, ethers } from 'ethers'

interface ClaimRewardsProps {
  rewards: BigNumber
  onClaimSuccess: () => void
}

const ClaimRewards = ({ rewards, onClaimSuccess }: ClaimRewardsProps) => {
  const { refetch } = useTokenBalance()

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
    <>
      <div className="bg-green-200 rounded-xl p-6">
        <p>
          You have rewards! You can redeem {ethers.utils.formatEther(rewards)}{' '}
          USDC
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
      {error && (
        <div className="bg-red-200 rounded-xl p-6 text-red-700">
          {error?.message || 'Something went wrong'}
        </div>
      )}
    </>
  )
}

export default ClaimRewards
