import React from "react";

function PersonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="7" r="4"></circle>

      <path d="M12 11c-2.5 0-6 1.5-6 4v1c0 2.5 2.5 4 6 4s6-1.5 6-4v-1c0-2.5-3.5-4-6-4z"></path>

      <path d="M8 15v4m8-4v4"></path>

      <path d="M10 21v2m4-2v2"></path>
    </svg>
  );
}

export default PersonIcon;
