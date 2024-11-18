import connectToDB from "@/utils/db";
// In your main server file (e.g., server.js or app.js)

// Other routes and middleware
const handler = (req, res) => {
  connectToDB;
  res.json({ message: "Welcome to cms apis home page :))" });
};

export default handler;
