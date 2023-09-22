export function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatHash(hash: string, a: number = 5, b: number = 2) {
  return `${hash.slice(0, a)}...${hash.slice(-b)}`
}
