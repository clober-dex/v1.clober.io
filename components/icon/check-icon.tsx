import React from 'react'

import { CheckSelectedSvg } from '../svg/check-selected-svg'
import { CheckDefaultSvg } from '../svg/check-default-svg'

export default function CheckIcon({
  checked,
  onCheck,
  text,
  checkedText,
  uncheckedText,
  ...props
}: {
  checked: boolean
  onCheck: (check: boolean) => void
  text?: string
  checkedText?: string
  uncheckedText?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const label = checked ? checkedText || text : uncheckedText || text
  return (
    <div
      className="inline-block cursor-pointer"
      {...props}
      onClick={() => onCheck(!checked)}
    >
      <div className="flex items-center gap-2">
        {checked ? <CheckSelectedSvg /> : <CheckDefaultSvg />}
        {label && <p className="text-sm text-white">{label}</p>}
      </div>
    </div>
  )
}
