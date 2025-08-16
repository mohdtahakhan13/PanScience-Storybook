import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import storyRoutes from "./routes/story.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.get("/", (_, res) => res.send("Storybook AI API up"));
app.use("/api/auth", authRoutes);
app.use("/api/story", storyRoutes);

const PORT = process.env.PORT || 8080;
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
});
