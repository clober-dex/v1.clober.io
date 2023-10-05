import React from 'react'
import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from '@rainbow-me/rainbowkit'
import Image from 'next/image'

import { formatAddress } from '../utils/string'
import { textStyles } from '../themes/text-styles'

import UserIcon from './common/user-icon'

export function WalletSelector({
  address,
  status,
}: {
  address: `0x${string}` | undefined
  status: 'connected' | 'disconnected' | 'reconnecting' | 'connecting'
}) {
  const { openChainModal } = useChainModal()
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()

  return (
    <div className="flex items-center">
      {status === 'disconnected' ? (
        <button
          className="flex items-center py-0 px-3 md:px-4 h-8 rounded bg-blue-500 hover:bg-blue-600 disabled:bg-gray-800 text-white disabled:text-green-500 text-xs sm:text-sm"
          onClick={() => openConnectModal && openConnectModal()}
        >
          Connect<span className="hidden md:block md:ml-1">Wallet</span>
        </button>
      ) : openAccountModal ? (
        <button
          className="flex items-center justify-center gap-2 md:justify-start w-8 md:w-full py-0 px-3 md:px-4 cursor-pointer h-8 bg-gray-800 md:bg-gray-950 hover:bg-gray-600 active::bg-gray-600"
          onClick={() => openAccountModal && openAccountModal()}
        >
          <UserIcon
            className="w-4 h-4 rounded-[100%] aspect-square"
            address={address}
          />
          <span
            className={`hidden md:block text-white ${textStyles.body3Bold}`}
          >
            {formatAddress(address || '')}
          </span>
        </button>
      ) : openChainModal ? (
        <button
          className="flex items-center justify-center gap-2 md:justify-start w-8 md:w-full p-0 md:py-[6px] md:px-[8px] cursor-pointer h-8 bg-gray-800 md:bg-gray-950 hover:bg-gray-600 active::bg-gray-600"
          onClick={() => openChainModal && openChainModal()}
        >
          <span className={`text-red-500 inline-block ${textStyles.body3Bold}`}>
            Wrong Network
          </span>
          <Image
            src="/assets/triangle-down-red.svg"
            alt="ArrowDown"
            width={16}
            height={16}
          />
        </button>
      ) : (
        <button
          disabled={true}
          className="flex items-center h-8 py-0 px-3 md:px-4 rounded bg-blue-500 hover:bg-blue-600 disabled:bg-gray-800 text-white disabled:text-green-500 text-xs sm:text-sm"
        >
          {status}
        </button>
      )}
    </div>
  )
}
