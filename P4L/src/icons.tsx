import {memo} from "react";

export const MainIcon = memo(() => {
  return (
    <svg width="39" height="26" viewBox="0 0 39 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2354_18)">
        <path d="M33.8437 3.18622V5.31044C33.8437 15.5354 25.1846 20.18 14.5045 20.18H11.4392C11.7808 16.9809 13.2925 15.0447 17.2377 12.7442C19.1781 11.613 19.0137 10.9598 18.058 11.3347C11.4762 13.9157 8.2079 17.4036 8.06286 22.9734L8.05802 23.3663H4.83481C4.83481 21.9187 5.02175 20.6048 5.39242 19.4025C5.02175 18.0282 4.83481 16.1631 4.83481 13.8073C4.83481 7.94129 12.05 3.18622 20.9509 3.18622C24.1741 3.18622 27.3973 4.24833 33.8437 3.18622Z" fill="#435151"/>
      </g>
      <defs>
        <clipPath id="clip0_2354_18">
          <rect width="38.6786" height="25.4907" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
})

export const TreeTypeIcon = memo(() => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="18" height="18" fill="url(#pattern0)"/>
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use href="#image0_2336_340" transform="scale(0.01)"/>
        </pattern>
        <image id="image0_2336_340" width="100" height="100" href="data:image/png;base64,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"/>
      </defs>
    </svg>
  )
})


export const SubtractIcon = memo(() => {
  return (
    <svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_2378_160)">
        <path d="M26.4 12C26.4 18.0199 21.5199 22.9 15.5 22.9C9.4801 22.9 4.6 18.0199 4.6 12C4.6 5.9801 9.4801 1.1 15.5 1.1C21.5199 1.1 26.4 5.9801 26.4 12Z" stroke="black" strokeOpacity="0.7" strokeWidth="1.2" shapeRendering="crispEdges"/>
      </g>
      <path d="M10 12H21" stroke="black" strokeOpacity="0.7" strokeLinecap="round"/>
      <defs>
        <filter id="filter0_d_2378_160" x="0" y="0.5" width="31" height="31" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2378_160"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2378_160" result="shape"/>
        </filter>
      </defs>
    </svg>

  )
})
