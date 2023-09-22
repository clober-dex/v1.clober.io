import React from 'react'
import Image from 'next/image'

export default function Check({
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
        <Image
          src={
            checked ? '/assets/check-selected.svg' : '/assets/check-default.svg'
          }
          width={16}
          height={16}
          alt="check"
        />
        {label && <p className="text-sm text-white">{label}</p>}
      </div>
    </div>
  )
}
