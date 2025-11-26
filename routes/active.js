// routes/active.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, "../data/users.json");

// Fonction pour déterminer si un forfait est encore actif
function isActive(user) {
  if (!user.endTime) return true; // si pas encore implémenté, on considère actif
  return new Date(user.endTime) > new Date();
}

router.get("/", (req, res) => {
  let list = [];

  if (fs.existsSync(USERS_FILE)) {
    list = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  }

  const activeUsers = list.filter(isActive);

  res.json({
    success: true,
    count: activeUsers.length,
    users: activeUsers
  });
});

export default router;
