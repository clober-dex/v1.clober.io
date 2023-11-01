import { fetchOdosApi } from './utils'

export async function buildSwapCallData({
  pathId,
  userAddress,
}: {
  pathId: string
  userAddress: string
}): Promise<{
  data: `0x${string}`
  gas: bigint
  value: bigint
  to: `0x${string}`
  nonce: number
  gasPrice: bigint
}> {
  const result = await fetchOdosApi<{
    transaction: {
      data: `0x${string}`
      gas: number
      value: string
      to: `0x${string}`
      nonce: number
      gasPrice: number
    }
  }>('sor/assemble', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      pathId,
      simulate: true,
      userAddr: userAddress,
    }),
  })
  return {
    data: result.transaction.data,
    gas: BigInt(result.transaction.gas),
    value: BigInt(result.transaction.value),
    to: result.transaction.to,
    nonce: result.transaction.nonce,
    gasPrice: BigInt(result.transaction.gasPrice),
  }
}
