import React from 'react'

import { OpenOrder } from '../model/open-order'

import { OpenOrderCard } from './card/open-order-card'

export default function OpenOrderList({
  openOrders,
  ...props
}: {
  openOrders: OpenOrder[]
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="flex flex-col w-full h-full lg:grid lg:grid-cols-3 gap-1"
      {...props}
    >
      {openOrders.map((openOrder, index) => (
        <OpenOrderCard openOrder={openOrder} key={index} />
      ))}
    </div>
  )
}
