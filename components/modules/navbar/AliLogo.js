import React from "react";
export const AliLogo = () => (
  <svg
    width="70"
    height="40"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 40"
  >
    <rect width="100" height="40" rx="10" ry="10" fill="#4A90E2" />

    <circle cx="30" cy="20" r="15" fill="#083344" />
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" />
        <stop offset="100%" />
      </linearGradient>
    </defs>
    <text
      x="30"
      y="25"
      fontFamily="Arial, sans-serif"
      fontSize="20"
      fill="#4A90E2"
      textAnchor="middle"
      alignmentBaseline="middle"
    >
      Ali
    </text>

    <text
      x="68"
      y="24.5"
      fontFamily="Arial, sans-serif"
      fontSize="20"
      fill="#ecfeff"
      textAnchor="middle"
      alignmentBaseline="middle"
    >
      store
    </text>
  </svg>
);
