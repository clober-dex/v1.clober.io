import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image'

import { textStyles } from '../../themes/text-styles'

export default function DecimalsSelector({
  availableDecimalPlacesGroups,
  value,
}: {
  availableDecimalPlacesGroups: { label: string; value: number }[]
  value: { label: string; value: number }
}) {
  return (
    <Listbox value={value}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="flex items-center gap-0.5">
              <span className={`${textStyles.body5} text-white`}>
                {value.label}
              </span>
              <span className="">
                <Image
                  className="text-gray-400 dark:text-white"
                  src="/assets/triangle-down.svg"
                  alt="ArrowDown"
                  width={16}
                  height={16}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition show={open} as={Fragment}>
              <Listbox.Options className="absolute z-[1500] top-6 right-0 mt-0 min-w-[4rem] p-0 bg-gray-700 rounded">
                {availableDecimalPlacesGroups.map(({ label, value }, index) => (
                  <Listbox.Option
                    key={index}
                    className={`py-1 px-2 text-right text-white ${textStyles.body5} hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg`}
                    value={value}
                  >
                    <span>{label}</span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
