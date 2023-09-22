import React from 'react'
import Image from 'next/image'

import useDropdown from '../hooks/useDropdown'
import { textStyles } from '../themes/text-styles'

const chains = [
  {
    id: 1,
    name: 'Ethereum',
    icon: '/assets/chains/ethereum.svg',
    selected: true,
  },
  {
    id: 42161,
    name: 'Arbitrum One',
    icon: '/assets/chains/arbitrum.svg',
    selected: false,
  },
]

export default function ChainSelector(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  const { showDropdown, setShowDropdown } = useDropdown()

  return (
    <div className="flex relative" {...props}>
      <button
        onClick={() => {
          setShowDropdown((prev) => !prev)
        }}
        className="flex items-center justify-center lg:justify-start h-8 w-8 lg:w-auto p-0 lg:px-2 lg:gap-2 rounded bg-gray-800 hover:bg-gray-700 text-white"
      >
        <div className="relative w-4 h-4">
          <Image src="/assets/chains/ethereum.svg" alt="ChainIcon" fill />
        </div>
        <p className={`hidden lg:block ${textStyles.body3Bold}`}>Ethereum</p>
        <Image
          className="hidden lg:block"
          src="/assets/triangle-down.svg"
          alt="ArrowDown"
          width={16}
          height={16}
        />
      </button>
      {showDropdown ? (
        <div className="absolute right-[-5rem] md:right-0 top-10 md:top-12 z-[1500] flex flex-col w-48 bg-gray-800 border border-solid border-gray-700 rounded-lg">
          {chains
            .sort((a, b) => a.id - b.id)
            .map((chain) => (
              <div
                className={`flex items-center gap-2 py-2 px-[10px] cursor-pointer text-white ${textStyles.body3Bold} hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg`}
                key={chain.name}
                onClick={() => setShowDropdown(false)}
              >
                <Image
                  src={chain.icon}
                  alt={chain.name}
                  width={16}
                  height={16}
                />
                <span>{chain.name}</span>
                {chain.selected ? (
                  <Image
                    className="ml-auto"
                    src="/assets/check.svg"
                    alt="selected"
                    width={16}
                    height={16}
                  />
                ) : (
                  <></>
                )}
              </div>
            ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
