export const Island = ({darkMode}) => {

  return (
    <>
    {darkMode.value === false ?
      <svg viewBox="0 0 1441 258" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M591.5 89.5C338.315 82.4712 1 235 1 235V255.97H1440V211.5C1440 211.5 1199.62 223.021 1025.5 200.715C887.414 183.026 730.661 93.3633 591.5 89.5Z" fill="#C4C4C4" />
        <path d="M1340 208L1346 18.5H1343V15H1346V7H1343V3.5H1340.5L1354 0L1367.5 3.5H1365.5V7H1362.5V15H1365.5V18.5H1362.5L1370 208H1340Z" fill="#E1E1E1" />
        <path d="M240.5 87C83 94.5 1 164 1 164V256.588H1440.5V197.588C1440.5 197.588 987.5 209.088 773 175.089C558.5 141.089 398 79.5 240.5 87Z" fill="#E1E1E1" />
        <path d="M950.5 208.5L1343 7H1346V10L1139 231.5L950.5 208.5Z" fill="url(#paint0_linear_0_1)" />
        <defs>
          <linearGradient id="paint0_linear_0_1" x1="1346" y1="6.99981" x2="1171" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2F2F2" stopOpacity="0.75" />
            <stop offset="0.755208" stopColor="#F2F2F2" stopOpacity="0.15" />
            <stop offset="0.927083" stopColor="#F2F2F2" stopOpacity="0.08" />
          </linearGradient>
        </defs>
      </svg>
      :
      <svg viewBox="0 0 1441 258" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M950.5 208.5L1343 7H1346V10L1139 231.5L950.5 208.5Z" fill="url(#paint0_linear_0_1)" />
        <path d="M591.5 89.5C338.315 82.4712 1 235 1 235V255.97H1440V211.5C1440 211.5 1199.62 223.021 1025.5 200.715C887.414 183.026 730.661 93.3633 591.5 89.5Z" fill="#474747" />
        <path d="M1340 208L1346 18.5H1343V15H1346V7H1343V3.5H1340.5L1354 0L1367.5 3.5H1365.5V7H1362.5V15H1365.5V18.5H1362.5L1370 208H1340Z" fill="#474747" />
        <path d="M240.5 87C83 94.5 1 164 1 164V256.588H1440.5V197.588C1440.5 197.588 987.5 209.088 773 175.089C558.5 141.089 398 79.5 240.5 87Z" fill="#646464" />
        <defs>
          <linearGradient id="paint0_linear_0_1" x1="1346" y1="6.99981" x2="1171" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2F2F2" stopOpacity="0.75" />
            <stop offset="0.755208" stopColor="#F2F2F2" stopOpacity="0.15" />
            <stop offset="0.927083" stopColor="#F2F2F2" stopOpacity="0.08" />
          </linearGradient>
        </defs>
      </svg>
    }
    </>


  )
} 