import React from 'react'
import BigNumber from 'bignumber.js'

import NumberInput from '../input/number-input'

export const SwapSettingModal = ({
  slippageInput,
  setSlippageInput,
  partitionInput,
  setPartitionInput,
}: {
  slippageInput: string
  setSlippageInput: (slippageInput: string) => void
  partitionInput: string
  setPartitionInput: (partitionInput: string) => void
}) => (
  <div className="absolute flex flex-col bg-gray-900 rounded-lg p-3 sm:p-4 gap-2 sm:gap-3 left-0 bottom-9 sm:bottom-11 text-white border-solid border-[1.5px] border-gray-500">
    <div className="self-start text-base font-bold">Max Slippage</div>
    <div className="flex text-base px-3 py-2 sm:py-3 bg-gray-800 rounded">
      <NumberInput
        value={slippageInput}
        onValueChange={setSlippageInput}
        onBlur={() => {
          const v = new BigNumber(slippageInput)
          v.isNaN() || v.gt(50)
            ? setSlippageInput('50.00')
            : setSlippageInput(v.toFixed(2))
        }}
        placeholder="1"
        className="w-40 bg-transparent outline-none"
      />
      <div className="text-gray-500">%</div>
    </div>
    <div className="self-start text-base font-bold">Max Partitions</div>
    <div className="flex text-base px-3 py-2 sm:py-3 bg-gray-800 rounded">
      <NumberInput
        value={partitionInput}
        onValueChange={setPartitionInput}
        onBlur={() => {
          const v = new BigNumber(partitionInput)
          v.isNaN() || v.gt(20) || v.lt(0)
            ? setPartitionInput('1')
            : setPartitionInput(v.toFixed(0))
        }}
        placeholder="1"
        className="w-40 bg-transparent outline-none"
      />
    </div>
  </div>
)
