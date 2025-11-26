import express from "express";
const router = express.Router();

// Exemple simple d'utilisateurs connectés
// Tu pourras remplacer plus tard par MikroTik
router.get("/", (req, res) => {
  res.json({
    success: true,
    users: [
      { name: "TEST001", phone: "0700000000", start: "10:00", end: "11:00" }
    ]
  });
});

export default router;
