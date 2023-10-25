import React, { SVGProps } from 'react'

export const OutlinkSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.75 13.25L2.75 13.25L2.75 3.25"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="16"
      strokeLinecap="square"
    />
    <path
      d="M13 3L7 9"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    <path
      d="M9 2.5L13.5 2.5L13.5 7"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
  </svg>
)
