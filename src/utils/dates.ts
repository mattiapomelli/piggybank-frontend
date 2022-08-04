import { BigNumber } from 'ethers'

export const formatDate = (date: BigNumber) => {
  return new Date(toMillis(date)).toLocaleDateString()
}

export const toMillis = (date: BigNumber) => {
  return Number(date.toString()) * 1000
}
