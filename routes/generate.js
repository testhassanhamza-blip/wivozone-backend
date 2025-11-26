// routes/generate.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, "../data/users.json");

// Générer username : 3 lettres + 3 chiffres
function generateUsername(name) {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, "");
  const prefix = clean.slice(0, 3); // 3 premières lettres
  const random = Math.floor(100 + Math.random() * 900); // 3 chiffres
  return prefix + random;
}

// Générer password : 4 chars (pas de O ni 0)
function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let pwd = "";
  for (let i = 0; i < 4; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)];
  }
  return pwd;
}

// Calcul expiration
function calculateEndTime(duration) {
  const now = new Date();
  if (duration === "1 jour") now.setDate(now.getDate() + 1);
  if (duration === "3 jours") now.setDate(now.getDate() + 3);
  if (duration === "7 jours") now.setDate(now.getDate() + 7);
  if (duration === "1 mois") now.setMonth(now.getMonth() + 1);
  return now.toISOString();
}

router.post("/", (req, res) => {
  const { name, phone, duration } = req.body;

  if (!name || !phone || !duration) {
    return res.json({ success: false, message: "Champs manquants." });
  }

  const username = generateUsername(name);
  const password = generatePassword();
  const created = new Date().toISOString();
  const endTime = calculateEndTime(duration);

  const newUser = {
    id: Date.now(),
    name,
    phone,
    username,
    password,
    duration,
    created,
    endTime
  };

  let list = [];
  if (fs.existsSync(USERS_FILE)) {
    list = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  }

  list.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify(list, null, 2));

  res.json({
    success: true,
    user: newUser
  });
});

export default router;
