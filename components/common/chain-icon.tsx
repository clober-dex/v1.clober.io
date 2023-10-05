import React from 'react'
import Image from 'next/image'
import { Chain } from 'wagmi'

export default function ChainIcon({
  chain,
  ...props
}: React.BaseHTMLAttributes<HTMLDivElement> & {
  chain: Chain
}) {
  return (
    <div {...props}>
      <Image src={`/assets/chains/${chain.id}.svg`} alt="ChainIcon" fill />
    </div>
  )
}
