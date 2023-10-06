import React from 'react'
import Image from 'next/image'
import { Chain } from 'wagmi'

export default function ChainIcon({
  chain,
  ...props
}: React.BaseHTMLAttributes<HTMLDivElement> & {
  chain: Chain
}) {
  const iconPath = `/assets/chainIcons/${
    chain.name.toLowerCase().split(' ')[0]
  }.svg`
  return (
    <div {...props}>
      <Image src={iconPath} alt="ChainIcon" fill />
    </div>
  )
}
