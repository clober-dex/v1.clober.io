import React from 'react'

import { OutlinkSvg } from '../svg/outlink-svg'
import { OpenOrder } from '../../model/open-order'
import { formatUnits } from '../../utils/bigint'
import { ActionButton } from '../button/action-button'

export const OpenOrderCard = ({
  openOrder,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  openOrder: OpenOrder
}) => {
  return (
    <div className="flex flex-col gap-4 bg-gray-900 rounded-2xl p-4" {...props}>
      <div className="flex text-sm text-white justify-between">
        <div className="font-bold flex flex-row items-center gap-1">
          {formatUnits(openOrder.amount, openOrder.inputCurrency.decimals)}{' '}
          {openOrder.inputCurrency.symbol} &#x2192; {1600}{' '}
          {openOrder.outputCurrency.symbol}
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
      <div className="flex flex-col text-xs sm:text-sm">
        <div className="flex flex-col align-baseline justify-between gap-2">
          <div className="flex flex-row align-baseline justify-between">
            <label className="text-gray-200">Price</label>
            <p className="text-white">{formatUnits(openOrder.price, 18)}</p>
          </div>
          <div className="flex flex-row align-baseline justify-between">
            <label className="text-gray-200">Filled</label>
            <div className="flex flex-row gap-1">
              <p className="text-white">{'45%'}</p>
              <p className="text-gray-400">(1200)</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-lg dark:bg-gray-700">
            <div
              className="flex items-center justify-center h-1.5 bg-blue-500 text-xs font-medium text-gray-100 text-center p-0.5 leading-none rounded-lg"
              style={{
                width: '45%',
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full gap-3 h-6">
        <ActionButton
          className="flex flex-1 items-center justify-center rounded bg-gray-700 hover:bg-blue-600 text-white text-xs sm:text-sm disabled:bg-gray-800 disabled:text-gray-500 py-2 h-6 sm:h-7"
          disabled={true}
          onClick={() => console.log('claim', [openOrder])}
          text={'Claim'}
        />
        <ActionButton
          className="flex flex-1 items-center justify-center rounded bg-gray-700 hover:bg-gray-500 text-white text-xs sm:text-sm disabled:bg-gray-800 disabled:text-gray-500 py-2 h-6 sm:h-7"
          disabled={false}
          onClick={() => console.log('cancel', [openOrder])}
          text={'Cancel'}
        />
      </div>
    </div>
  )
}
