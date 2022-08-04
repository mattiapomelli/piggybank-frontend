import { chain } from 'wagmi'

import { ChainMap } from './chains'

export const PIGGY_BANK_ADDRESS: ChainMap = {
  [chain.hardhat.id]: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  [chain.polygonMumbai.id]: '0xE1d449DB565Fe3Ea2FB71Aec8b3BB6c41d0c020f',
}

export const TOKEN_ADDRESS: ChainMap = {
  [chain.hardhat.id]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  [chain.polygonMumbai.id]: '0xB1E0589c6a6bBD53f68F3768f7CB7178d1B56Ee8',
}
