import { Contract, ContractTransaction } from 'ethers'
import { Result } from 'ethers/lib/utils'
import { useContractRead } from 'wagmi'

import MyTokenAbi from '@abis/contracts/MyToken.json'
import PiggyBankAbi from '@abis/contracts/PiggyBank.json'
import { MyToken, PiggyBank } from '@abis/types'
import { PIGGY_BANK_ADDRESS, TOKEN_ADDRESS } from '@constants/addresses'
import { CHAIN } from '@constants/chains'

type ContractFunctions<T extends Contract> = T['functions']

type ContractReadFunctions<T extends Contract> = {
  [K in keyof ContractFunctions<T>]: ReturnType<
    ContractFunctions<T>[K]
  > extends Promise<ContractTransaction>
    ? never
    : K
}[keyof ContractFunctions<T>]

interface UseContractReadArgs<T extends Contract> {
  functionName: ContractReadFunctions<T>
  onSuccess?: (data: Result) => void
  args?: any | any[]
  enabled?: boolean
}

interface UseContractReadReturnType<T>
  extends Omit<ReturnType<typeof useContractRead>, 'data'> {
  data: T | undefined
}

export const usePiggyBankContractRead = <T = Result>(
  args: UseContractReadArgs<PiggyBank>,
): UseContractReadReturnType<T> => {
  const { data, ...rest } = useContractRead({
    addressOrName: PIGGY_BANK_ADDRESS[CHAIN.id],
    contractInterface: PiggyBankAbi.abi,
    ...args,
  })

  return {
    ...rest,
    data: data as T | undefined,
  }
}

export const useTokenContractRead = <T = Result>(
  args: UseContractReadArgs<MyToken>, // TODO: replace with ERC20 for production
): UseContractReadReturnType<T> => {
  const { data, ...rest } = useContractRead({
    addressOrName: TOKEN_ADDRESS[CHAIN.id],
    contractInterface: MyTokenAbi.abi,
    ...args,
  })

  return {
    ...rest,
    data: data as T | undefined,
  }
}
