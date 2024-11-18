// This is using ES6 import syntax as you used in your snippet
// pages/api/logout.js
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req, res) {
  // Clears the token cookie
  res.setHeader(
    "Set-Cookie",
    "refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict"
  );
  res.status(200).json({ message: "Logged out successfully" });
}
