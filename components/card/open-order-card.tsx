import React from 'react'

import { OutlinkSvg } from '../svg/outlink-svg'
import { OpenOrder } from '../../model/open-order'
import { formatUnits } from '../../utils/bigint'

export const OpenOrderCard = ({
  openOrder,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  openOrder: OpenOrder
}) => {
  return (
    <div className="flex flex-col gap-3 bg-gray-900 rounded p-4" {...props}>
      <div className="flex text-sm text-white justify-between">
        <div className="font-bold flex flex-row items-center gap-1">
          {openOrder.baseSymbol} / {openOrder.quoteSymbol}
          <a
            target="_blank"
            href="https://etherscan.io/tx/0x84a09de087e610fbba59440ea57f7166b3a7178260c485ab8315dd51ad197475"
            rel="noreferrer"
          >
            <OutlinkSvg className="w-3 h-3" />
          </a>
        </div>
        <div
          className={`${openOrder.isBid ? 'text-green-500' : 'text-red-500'}`}
        >
          {openOrder.isBid ? 'Buy' : 'Sell'}
        </div>
      </div>
      <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
        <div className="flex flex-row align-baseline justify-between">
          <label className="text-gray-200">Price</label>
          <p className="text-white">{formatUnits(openOrder.price, 18)}</p>
        </div>
        <div className="flex flex-row align-baseline justify-between">
          <label className="text-gray-200">Filled / Amount</label>
          <p className="text-white">
            {formatUnits(openOrder.filledAmount, 18)} /{' '}
            {formatUnits(openOrder.amount, 18)}
          </p>
        </div>
        <div className="flex flex-row align-baseline justify-between">
          <label className="text-gray-200">Claimable</label>
          <p className="text-white">
            {formatUnits(openOrder.claimableAmount, 18)}
          </p>
        </div>
      </div>
      <div className="flex w-full gap-3 h-6">
        <button
          className="flex flex-1 items-center justify-center p-0 h-6 text-xs border-solid border-white border rounded bg-transparent text-white"
          disabled={false}
          onClick={() => console.log('claim', [openOrder])}
        >
          Claim
        </button>
        <button
          className="flex flex-1 items-center justify-center p-0 h-6 text-xs border-solid border-white border rounded bg-transparent text-white"
          disabled={false}
          onClick={() => console.log('cancel', [openOrder])}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
