import React, { useState } from 'react'

import NumberInput from '../input/number-input'
import CheckIcon from '../icon/check-icon'
import { LeftBracketAngleSvg } from '../svg/left-bracket-angle-svg'
import { Currency } from '../../model/currency'

export default function LimitSettingForm({
  claimBounty,
  setClaimBounty,
  nativeCurrency,
  onBackClick,
}: {
  claimBounty: string
  setClaimBounty: (claimBounty: string) => void
  nativeCurrency: Currency
  onBackClick: () => void
} & React.HTMLAttributes<HTMLDivElement>) {
  const [isPostOnly, setIsPostOnly] = useState(false)
  return (
    <div className="flex flex-col gap-6 cursor-pointer">
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 cursor-pointer relative" onClick={onBackClick}>
          <LeftBracketAngleSvg />
        </div>
        <div className="flex flex-1 items-center justify-center text-base sm:text-xl font-bold text-white">
          Settings
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm sm:text-base text-white mb-3 sm:mb-4">
          Claim Bounty
        </div>
        <div className="flex rounded-lg border-solid border-[1.5px] border-gray-700 p-4 mb-4">
          <div className="flex flex-col flex-1 gap-2">
            <div className="text-gray-500 text-xs sm:text-sm">
              Set amount ({nativeCurrency.symbol || ''})
            </div>
            <NumberInput
              value={claimBounty}
              onValueChange={setClaimBounty}
              className="text-xl w-full sm:text-2xl bg-transparent placeholder-gray-500 text-white outline-none"
            />
          </div>
          <button
            className="text-xs sm:text-sm h-fit p-0 m-0 rounded-sm text-blue-500 bg-transparent"
            onClick={() => {
              setClaimBounty('0')
            }}
          >
            Set bounty to 0 {nativeCurrency.symbol || ''}
          </button>
        </div>
        <p className="text-gray-500 text-xs w-[366px] lg:w-auto">
          By setting a Claim Bounty, you can incentivize others to claim your
          orders for you. The default Claim Bounty is based on the average gas
          cost of claiming an order. To learn more about how Claim Bounties
          work, check our documentation.{' '}
          <a
            className="text-blue-500 hover:text-blue-600"
            target="_blank"
            href="https://docs.clober.io/concepts/protocol/claim-bounty"
            rel="noreferrer"
          >
            Learn more &#x2192;
          </a>
        </p>
      </div>
      <div className="flex flex-col">
        <div className="text-sm sm:text-base text-white mb-3 sm:mb-4">
          Execution
        </div>
        <CheckIcon
          checked={isPostOnly}
          onCheck={() => setIsPostOnly((prevState) => !prevState)}
          text="Post Only"
        />
      </div>
    </div>
  )
}
