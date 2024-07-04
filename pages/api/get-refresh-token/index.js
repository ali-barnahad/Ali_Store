export default function handler(req, res) {
  const { cookies } = req;
  const refreshToken = cookies["refresh-token"];
  res.status(200).json({ refreshToken });
}
