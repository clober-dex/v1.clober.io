import React from 'react'
import Image from 'next/image'

import { textStyles } from '../../themes/text-styles'
import { formatHash } from '../../utils/string'

const orders = [
  {
    baseSymbol: 'WETH',
    quoteSymbol: 'USDC',
    isBid: true,
    txHash:
      '0x6d91975935196522e7da9911412a1c2c2e509b13f19f215f7aaef820f7125734',
    timestamp: 'Sep 22, 2023 8:34 PM',
    price: '1600.01',
    filledAmount: '1.312',
    amount: '1.312',
    claimableAmount: '1.312',
  },
  {
    baseSymbol: 'WETH',
    quoteSymbol: 'USDC',
    isBid: false,
    txHash:
      '0x6d91975935196522e7da9911412a1c2c2e509b13f19f215f7aaef820f7125734',
    timestamp: 'Sep 22, 2023 8:34 PM',
    price: '1600.01',
    filledAmount: '1.312',
    amount: '1.312',
    claimableAmount: '1.312',
  },
]
export default function OrderList({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="flex flex-col w-full h-full lg:grid lg:grid-cols-3 gap-1"
      {...props}
    >
      {orders.map((order, index) => (
        <div
          className="flex flex-col gap-4 bg-gray-900 rounded p-4"
          key={index}
        >
          <div className="flex text-sm text-white justify-between">
            {order.baseSymbol}-{order.quoteSymbol}
            <div
              className={`${order.isBid ? 'text-green-500' : 'text-red-500'}`}
            >
              {order.isBid ? 'Buy' : 'Sell'}
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex flex-row align-baseline justify-between">
              <label className={`${textStyles.body5} text-gray-200`}>
                Transaction
              </label>
              <div className="flex gap-1 items-center">
                <p className={`${textStyles.body5} text-white`}>
                  {formatHash(order.txHash)}
                </p>
                <a
                  target="_blank"
                  href="https://etherscan.io/tx/0x84a09de087e610fbba59440ea57f7166b3a7178260c485ab8315dd51ad197475"
                  rel="noreferrer"
                >
                  <Image
                    src="/assets/outlink.svg"
                    width={12}
                    height={12}
                    alt="explore transaction"
                  />
                </a>
              </div>
            </div>
            <div className="flex flex-row align-baseline justify-between">
              <label className={`${textStyles.body5} text-gray-200`}>
                Date Created
              </label>
              <p className={`${textStyles.body5} text-white`}>
                {order.timestamp}
              </p>
            </div>
            <div className="flex flex-row align-baseline justify-between">
              <label className={`${textStyles.body5} text-gray-200`}>
                Price
              </label>
              <p className={`${textStyles.body5} text-white`}>{order.price}</p>
            </div>
            <div className="flex flex-row align-baseline justify-between">
              <label className={`${textStyles.body5} text-gray-200`}>
                Filled / Amount
              </label>
              <p className={`${textStyles.body5} text-white`}>
                {order.filledAmount}/{order.amount}
              </p>
            </div>
            <div className="flex flex-row align-baseline justify-between">
              <label className={`${textStyles.body5} text-gray-200`}>
                Claimable
              </label>
              <p className={`${textStyles.body5} text-white`}>
                {order.claimableAmount}
              </p>
            </div>
          </div>
          <div className="flex w-full gap-3 h-6">
            <button
              className="flex flex-1 items-center justify-center p-0 h-6 text-xs border-solid border-white border rounded bg-transparent text-white"
              disabled={false}
              onClick={() => console.log('claim', [order])}
            >
              Claim
            </button>
            <button
              className="flex flex-1 items-center justify-center p-0 h-6 text-xs border-solid border-white border rounded bg-transparent text-white"
              disabled={false}
              onClick={() => console.log('cancel', [order])}
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
