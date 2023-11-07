import { CHAIN_IDS } from './chain'

export const CONTRACT_ADDRESSES: {
  [chain in CHAIN_IDS]: {
    MarketRouter: `0x${string}`
    OrderCanceler: `0x${string}`
  }
} = {
  [CHAIN_IDS.POLYGON]: {
    MarketRouter: '0xB4be941716d4d27147D5A4d82801897877CA5906' as `0x${string}`,
    OrderCanceler:
      '0xFc03c0bad134A0c0151db9358AD697c5dAF611Ee' as `0x${string}`,
  },
  [CHAIN_IDS.ARBITRUM]: {
    MarketRouter: '0xB4be941716d4d27147D5A4d82801897877CA5906' as `0x${string}`,
    OrderCanceler:
      '0xFc03c0bad134A0c0151db9358AD697c5dAF611Ee' as `0x${string}`,
  },
  [CHAIN_IDS.POLYGON_ZKEVM]: {
    MarketRouter: '0x4C95C9a2a0F5DB89401721E4a0BF279c4E0144C5' as `0x${string}`,
    OrderCanceler:
      '0xFc03c0bad134A0c0151db9358AD697c5dAF611Ee' as `0x${string}`,
  },
  [CHAIN_IDS.COUPON_FINANCE_CHAIN]: {
    MarketRouter: '0xB4be941716d4d27147D5A4d82801897877CA5906' as `0x${string}`,
    OrderCanceler:
      '0xFc03c0bad134A0c0151db9358AD697c5dAF611Ee' as `0x${string}`,
  },
}
