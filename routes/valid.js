// routes/valid.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, "../data/users.json");

// 🟢 Un utilisateur est "valide" si la date de fin est dans le futur
function isValid(user) {
  if (!user.endTime) return true;
  return new Date(user.endTime) > new Date();
}

router.get("/", (req, res) => {
  let list = [];

  if (fs.existsSync(USERS_FILE)) {
    list = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  }

  const validUsers = list.filter(isValid);

  res.json({
    success: true,
    count: validUsers.length,
    users: validUsers
  });
});

export default router;
