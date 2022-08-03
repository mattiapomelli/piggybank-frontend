import { chain } from 'wagmi'

import { ChainMap } from './chains'

export const PIGGY_BANK_ADDRESS: ChainMap = {
  [chain.hardhat.id]: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  [chain.polygonMumbai.id]: '0x742d2ed4FB8A2935493D0F3A5CE532854D4517c8',
}

export const TOKEN_ADDRESS: ChainMap = {
  [chain.hardhat.id]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  [chain.polygonMumbai.id]: '0x5e49715365084Bf2cCAfeaa8B82CeCe176a0773F',
}
