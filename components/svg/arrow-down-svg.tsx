import React, { SVGProps } from 'react'

export const ArrowDownSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 4.5L12 19.5"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
    <path
      d="M5.25 13.5L12 20.25L18.75 13.5"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="square"
    />
  </svg>
)
