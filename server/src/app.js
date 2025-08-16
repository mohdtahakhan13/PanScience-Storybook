import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import storyRoutes from "./routes/story.js";

const app = express();

// Allowed origins: local + production frontend
const allowedOrigins = [
  "https://panscience-storybook-client.onrender.com" ,  // replace with your actual Render frontend URL
  "http://localhost:3000"              // local dev
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: "5mb" }));

app.get("/", (_, res) => res.send("Storybook AI API up"));
app.use("/api/auth", authRoutes);
app.use("/api/story", storyRoutes);

const PORT = process.env.PORT || 8080;
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
});
