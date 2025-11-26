// routes/generate.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, "../data/users.json");

// Fonction pour générer un username propre
function generateUsername(name) {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, "");
  const prefix = clean.slice(0, 3);
  const random = Math.floor(100 + Math.random() * 900); // 3 chiffres
  return prefix + random;
}

// Fonction pour générer un mot de passe
function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let pwd = "";
  for (let i = 0; i < 6; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)];
  }
  return pwd;
}

router.post("/", (req, res) => {
  const { name, phone, duration } = req.body;

  if (!name || !phone || !duration) {
    return res.json({ success: false, message: "Missing fields." });
  }

  const username = generateUsername(name);
  const password = generatePassword();

  const newUser = {
    id: Date.now(),
    name,
    phone,
    username,
    password,
    duration,
    created: new Date().toISOString()
  };

  // Lecture + ajout
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
