import React from 'react'

import { OutlinkSvg } from '../svg/outlink-svg'
import { OpenOrder } from '../../model/open-order'
import { formatUnits } from '../../utils/bigint'
import { ActionButton } from '../button/action-button'
import { toPlacesString } from '../../utils/bignumber'
import { PRICE_DECIMAL } from '../../utils/prices'

export const OpenOrderCard = ({
  openOrder,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  openOrder: OpenOrder
}) => {
  const filledRatio =
    (Number(openOrder.filledAmount) / Number(openOrder.amount)) * 100
  return (
    <div
      className="flex flex-col lg:w-[320px] gap-4 bg-gray-900 rounded-2xl p-4"
      {...props}
    >
      <div className="flex text-sm text-white justify-between">
        <div className="font-bold flex flex-row items-center gap-1">
          {openOrder.inputCurrency.symbol} &#x2192;{'  '}
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
          {openOrder.isBid ? 'Bid' : 'Ask'}
        </div>
      </div>
      <div className="flex flex-col text-xs sm:text-sm">
        <div className="flex flex-col align-baseline justify-between gap-2">
          <div className="flex flex-row align-baseline justify-between">
            <label className="text-gray-200">You sell</label>
            <p className="text-white">
              {toPlacesString(
                formatUnits(openOrder.amount, openOrder.inputCurrency.decimals),
              )}
            </p>
          </div>
          <div className="flex flex-row align-baseline justify-between">
            <label className="text-gray-200">You buy</label>
            <p className="text-white">
              {toPlacesString(
                formatUnits(
                  openOrder.amount * openOrder.price,
                  openOrder.outputCurrency.decimals + PRICE_DECIMAL,
                ),
              )}
            </p>
          </div>
          <div className="flex flex-row align-baseline justify-between">
            <label className="text-gray-200">Price</label>
            <p className="text-white">
              {toPlacesString(formatUnits(openOrder.price, PRICE_DECIMAL))}
            </p>
          </div>
          <div className="flex flex-row align-baseline justify-between">
            <label className="text-gray-200">Filled</label>
            <div className="flex flex-row gap-1">
              <p className="text-white">{filledRatio.toFixed(2)}%</p>
              <p className="text-gray-400">
                (
                {toPlacesString(
                  formatUnits(
                    openOrder.filledAmount,
                    openOrder.inputCurrency.decimals,
                  ),
                )}
                )
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-lg dark:bg-gray-700">
            <div
              className="flex items-center justify-center h-1.5 bg-blue-500 text-xs font-medium text-gray-100 text-center p-0.5 leading-none rounded-lg"
              style={{
                width: `${filledRatio}%`,
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
