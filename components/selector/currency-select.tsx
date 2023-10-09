import React from 'react'
import Image from 'next/image'

import { Currency, getLogo } from '../../model/currency'
import { formatUnits } from '../../utils/numbers'

const CurrencySelect = ({
  currencies,
  onBack,
  onCurrencySelect,
}: {
  currencies: Currency[]
  onBack: () => void
  onCurrencySelect: (currency: Currency) => void
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 cursor-pointer relative" onClick={onBack}>
          <Image
            src="/assets/left-bracket-angle.svg"
            alt="LeftBracketAngle"
            fill
          />
        </div>
        <div className="flex flex-1 items-center justify-center text-base sm:text-xl font-bold text-white">
          Select a token
        </div>
      </div>
      <div className="flex flex-col relative rounded shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <div className="relative h-4 w-4">
            <Image src={'/assets/search.svg'} alt={'Search'} fill />
          </div>
        </div>
        <input
          type="search"
          name="search"
          id="search"
          className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 dark:bg-gray-800 placeholder:text-gray-400 text-xs sm:text-sm"
          placeholder="Search by token name, symbol, or address"
        />
      </div>
      <div className="flex flex-col bg-gray-900 rounded-b-xl sm:rounded-b-3xl">
        {currencies.map((currency) => (
          <button
            key={currency.address}
            className="flex w-full px-4 py-2 items-center justify-between text-start"
            onClick={() => onCurrencySelect(currency)}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
                <Image
                  src={getLogo(currency)}
                  alt={currency.name}
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  fill
                />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-white">
                  {currency.symbol}
                </div>
                <div className="text-xs text-gray-500">{currency.name}</div>
              </div>
            </div>
            <div className="text-sm text-end text-white">
              <div>
                {formatUnits(1000000000000000000000n, 18)}
                {/*{formatUnits(*/}
                {/*  balances[currency.address] ?? 0n,*/}
                {/*  currency.decimals,*/}
                {/*  prices[currency.address],*/}
                {/*)}*/}
              </div>
              <div className="text-gray-500 text-xs">
                {formatUnits(1000000000000000000000n, 18)}
                {/*{formatDollarValue(*/}
                {/*  balances[currency.address] ?? 0n,*/}
                {/*  currency.decimals,*/}
                {/*  prices[currency.address],*/}
                {/*)}*/}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CurrencySelect
