import { getAddress } from 'viem'

export const WrappedEthers = [
  '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  '0x4284186b053ACdBA28E8B26E99475d891533086a',
].map((x) => getAddress(x))
