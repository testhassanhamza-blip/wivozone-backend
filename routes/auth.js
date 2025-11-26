// routes/auth.js
import express from "express";
const router = express.Router();

const ADMIN_PASSWORD = "12345WivoZone"; // tu peux changer ici

router.post("/login", (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    const token = Buffer.from(Date.now().toString()).toString("base64");
    return res.json({
      success: true,
      token,
    });
  }

  res.json({ success: false });
});

export default router;
