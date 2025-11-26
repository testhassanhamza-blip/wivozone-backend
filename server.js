import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("WivoZone backend is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
