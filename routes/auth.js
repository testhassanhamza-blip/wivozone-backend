import express from "express";
const router = express.Router();

const ADMIN_PASSWORD = "12345WivoZone"; // Tu peux changer

router.post("/login", (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    // token simple
    const token = Buffer.from(Date.now().toString()).toString("base64");

    return res.json({
      success: true,
      token
    });
  }

  res.json({ success: false });
});

export default router;
