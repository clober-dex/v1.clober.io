export type Currency = {
  address: `0x${string}`
  name: string
  symbol: string
  decimals: number
}

export function getLogo(currency?: Currency): string {
  if (!currency) {
    return ''
  }
  console.log(
    'ddd',
    `https://assets.odos.xyz/tokens/${currency.symbol.toUpperCase()}.webp`,
  )
  return `https://assets.odos.xyz/tokens/${currency.symbol.toUpperCase()}.webp`
}
