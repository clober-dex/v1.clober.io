import React from 'react'
import Image from 'next/image'
import { Chain, useSwitchNetwork } from 'wagmi'

import { textStyles } from '../../themes/text-styles'
import useDropdown from '../../hooks/useDropdown'
import ChainIcon from '../icon/chain-icon'

export default function ChainSelector({
  chain,
  setChain,
  chains,
}: {
  chain: Chain
  setChain: (chain: Chain) => void
  chains: Chain[]
}) {
  const { switchNetwork } = useSwitchNetwork({
    onSuccess(data) {
      setChain(data)
    },
  })
  const { showDropdown, setShowDropdown } = useDropdown()

  return chains.find((_chain) => _chain.id === chain.id) ? (
    <div className="flex relative">
      <button
        onClick={() => {
          setShowDropdown((prev) => !prev)
        }}
        className="flex items-center justify-center lg:justify-start h-8 w-8 lg:w-auto p-0 lg:px-2 lg:gap-2 rounded bg-gray-800 hover:bg-gray-700 text-white"
      >
        <ChainIcon className="relative w-4 h-4" chain={chain} />
        <p className={`hidden lg:block ${textStyles.body3Bold}`}>
          {chain.name.split(' ')[0]}
        </p>
        <Image
          className="hidden lg:block"
          src="/assets/triangle-down.svg"
          alt="ArrowDown"
          width={16}
          height={16}
        />
      </button>
      {showDropdown ? (
        <div className="absolute right-1 md:right-[-5rem] top-10 md:top-12 z-[1500] flex flex-col w-48 bg-gray-800 border border-solid border-gray-700 rounded-lg">
          {chains
            .sort((a, b) => a.id - b.id)
            .map((_chain) => (
              <div
                className={`flex items-center gap-2 py-2 px-[10px] cursor-pointer text-white ${textStyles.body3Bold} hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg`}
                key={_chain.name}
                onClick={() => {
                  try {
                    switchNetwork?.(_chain.id)
                  } catch (e) {
                    console.error(e)
                  } finally {
                    setShowDropdown(false)
                  }
                }}
              >
                <ChainIcon className="relative w-4 h-4" chain={_chain} />
                <span>{_chain.name}</span>
                {_chain.id === chain.id ? (
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
  ) : (
    <></>
  )
}
