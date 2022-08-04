import { chain } from 'wagmi'

import { ChainMap } from './chains'

export const PIGGY_BANK_ADDRESS: ChainMap = {
  [chain.hardhat.id]: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  [chain.polygonMumbai.id]: '0x01656569C696f22b95e257Bb1Df66fF7012540FE',
}

export const TOKEN_ADDRESS: ChainMap = {
  [chain.hardhat.id]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  [chain.polygonMumbai.id]: '0x31942D08745C5C5eE3461F5555D2264e7226F488',
}
