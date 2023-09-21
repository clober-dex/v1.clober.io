import React from 'react'
import { useAccount, useDisconnect, useNetwork } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import Image from 'next/image'

import useDropdown from '../hooks/useDropdown'
import { formatAddress } from '../utils/address'
import { textStyles } from '../themes/text-styles'

import UserIcon from './common/user-icon'

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

export function WalletSelector() {
  const { address, status, connector } = useAccount()
  const { showDropdown, setShowDropdown } = useDropdown()
  const { disconnect } = useDisconnect()
  const { openConnectModal } = useConnectModal()
  const { chain } = useNetwork()

  return (
    <div className="flex relative">
      {status === 'connected' ? (
        <button
          className="flex items-center justify-center gap-2 md:justify-start w-8 md:w-full p-0 md:py-[6px] md:px-[8px] cursor-pointer h-8 bg-gray-800 md:bg-gray-950 hover:bg-gray-600 active::bg-gray-600"
          onClick={() => {
            setShowDropdown((x) => !x)
          }}
        >
          <UserIcon
            className="w-4 h-4 rounded-[100%] aspect-square"
            address={address}
          />
          <span
            className={`hidden md:block text-white ${textStyles.body3Bold} ${
              chain && chain.id !== 1 ? 'text-yellow-500' : 'text-white'
            }`}
          >
            {formatAddress(address)}
          </span>
        </button>
      ) : (
        <button
          className="flex items-center h-8 py-0 px-3 md:px-4 rounded bg-blue-500 hover:bg-blue-600 disabled:bg-gray-800 text-white disabled:text-green-500 text-xs sm:text-sm"
          disabled={status !== 'disconnected'}
          onClick={() => openConnectModal && openConnectModal()}
        >
          {status === 'disconnected' ? (
            <>
              Connect<span className="hidden md:block md:ml-1">Wallet</span>
            </>
          ) : (
            status
          )}
        </button>
      )}
      {chain && chain.id === 1 && showDropdown && address ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-10 md:top-12 z-[1500] p-4 w-64 bg-gray-800 border border-solid border-gray-700 rounded-lg"
        >
          <div className="flex items-center mb-3">
            <UserIcon
              className="mr-2 w-6 rounded-[100%] aspect-square"
              address={address}
            />
            <span className={`text-white mr-auto ${textStyles.body2Bold}`}>
              {formatAddress(address)}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={async () => {
                  if (address) {
                    await navigator.clipboard.writeText(address)
                    setShowDropdown(false)
                  }
                }}
                className="flex items-center justify-center p-0 w-8 h-8 bg-gray-700 rounded-lg"
              >
                <Image
                  src="/assets/copy.svg"
                  alt="copyUserAddress"
                  width={16}
                  height={16}
                  className="fill-gray-100"
                />
              </button>
              <button
                onClick={async () => {
                  console.log('outlink')
                }}
                className="flex items-center justify-center p-0 w-8 h-8 bg-gray-700 rounded-lg"
              >
                <Image
                  src="/assets/outlink.svg"
                  alt="outlink"
                  width={16}
                  height={16}
                  className="fill-gray-100"
                />
              </button>
            </div>
          </div>
          <div className={`flex items-center py-1 px-0 ${textStyles.body3_5}`}>
            <label className="flex-1 text-gray-400">Wallet</label>
            <span className="text-white">{connector?.name}</span>
          </div>
          <div className={`flex items-center py-1 px-0 ${textStyles.body3_5}`}>
            <label className="flex-1 text-gray-400">Network</label>
            <span className="text-white">{'Network'}</span>
          </div>
          <button
            className="group flex items-center justify-center gap-2 mt-3 h-[34px] w-full bg-gray-700 hover:bg-gray-600 rounded-lg"
            onClick={() => {
              setShowDropdown(false)
              disconnect()
            }}
          >
            <svg
              className="w-4 fill-gray-100 group-hover:fill-red-500"
              viewBox="0 0 16 16"
            >
              <g clipPath="url(#a)">
                <path d="M5.43 14.207A3.636 3.636 0 0 1 2.857 8L4.4 6.457l1.028 1.028-1.542 1.543a2.182 2.182 0 0 0 3.086 3.085l1.542-1.542 1.029 1.03L8 13.142a3.614 3.614 0 0 1-2.572 1.064Zm.514-3.122-1.029-1.028 5.143-5.143 1.028 1.029-5.142 5.141v.001ZM11.6 9.543l-1.03-1.029 1.543-1.542A2.182 2.182 0 1 0 9.03 3.886L7.486 5.428 6.458 4.4 8 2.857a3.636 3.636 0 0 1 5.143 5.142L11.6 9.542ZM10.182 12.238l1.405-.377.753 2.81-1.405.377zM11.988 11.223l.377-1.405 2.81.753-.377 1.405zM5.819 3.537l-1.406.377-.753-2.81L5.066.727zM4.012 4.552l-.376 1.405-2.81-.753.376-1.405z" />
              </g>
              <defs>
                <clipPath id="a">
                  <path d="M0 0h16v16H0z" />
                </clipPath>
              </defs>
            </svg>
            <span
              className={`${textStyles.body3_5} text-gray-100 group-hover:text-red-500 delay-100`}
            >
              Disconnect Wallet
            </span>
          </button>
        </div>
      ) : (
        <></>
      )}
      {chain && chain.id !== 1 ? (
        <div className="absolute right-0 top-12 z-[1500] p-4 w-64 bg-gray-800 border border-solid border-yellow-500 rounded-lg">
          <div className="flex items-start gap-2">
            <svg viewBox="0 0 16 16" className="shrink-0 mt-1 w-4 h-4">
              <rect
                width="14.5"
                height="14.5"
                x=".75"
                y=".75"
                stroke="#FFD468"
                strokeWidth="1.5"
                rx="7.25"
              />
              <path stroke="#FFD468" strokeWidth="1.5" d="M8 4v5M8 10v1.5" />
            </svg>
            <span className={`${textStyles.body3Bold} text-white`}>
              Please switch to a supported network.
            </span>
          </div>
          <p className={`mt-2 text-gray-400 ${textStyles.body4}`}>
            Select a network from below.
          </p>
          <div
            className={`flex flex-wrap items-center gap-2 mt-3 ${textStyles.body3_5}`}
          >
            {chains.map((chain) => (
              <button
                className="flex items-center gap-2 text-white py-1.5 px-2 h-7 rounded-lg bg-gray-700 hover:bg-gray-600"
                key={chain.name}
                onClick={async () => {
                  setShowDropdown(false)
                }}
              >
                <Image
                  src={chain?.icon}
                  alt={chain.name}
                  width={16}
                  height={16}
                />
                <span className="text-white">{chain.name}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
