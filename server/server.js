import "./db.js";
import express from "express";

const PORT = 4000;
const app = express();

app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3"] });
});

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
