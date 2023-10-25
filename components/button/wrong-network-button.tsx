import Image from 'next/image'
import React from 'react'

import { textStyles } from '../../themes/text-styles'
import { TriangleDownRedSvg } from '../svg/triangle-down-red-svg'

export const WrongNetworkButton = ({
  openChainModal,
}: {
  openChainModal: () => void
}) => {
  return (
    <button
      className="flex items-center justify-center gap-2 md:justify-start w-8 rounded md:w-full p-0 md:py-[6px] md:px-[8px] cursor-pointer h-8 bg-gray-800 md:bg-gray-950 hover:bg-gray-600 active::bg-gray-600"
      onClick={() => openChainModal && openChainModal()}
    >
      <span className={`text-red-500 inline-block ${textStyles.body3Bold}`}>
        Wrong Network
      </span>
      <TriangleDownRedSvg />
    </button>
  )
}
