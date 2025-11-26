import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// Fix dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files (frontend)
app.use(express.static(path.join(__dirname, "public")));

// Routes
import authRoutes from "./routes/auth.js";
import generateRoutes from "./routes/generate.js";
import activeRoutes from "./routes/active.js";
import validRoutes from "./routes/valid.js";

app.use("/api/auth", authRoutes);
app.use("/api/generate", generateRoutes);
app.use("/api/active", activeRoutes);
app.use("/api/valid", validRoutes);

// Home
app.get("/", (req, res) => {
  res.send("WivoZone backend is running.");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
