import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ success: true, message: "generate route OK" });
});

export default router;
