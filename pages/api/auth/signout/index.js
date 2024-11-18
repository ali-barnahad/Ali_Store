import { setCookie } from "nookies";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Set the cookie with an expired date to effectively delete it
  setCookie({ res }, "token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Logout is done" });
}
