// server/src/routes/storybook.js
import express from "express";
import { auth } from "../middleware/auth.js";
import { generateStoryBook } from "../utils/geminiStorybook.js";

const router = express.Router();

/**
 * POST /api/storybook/generate
 * body: { storyName: string, premise?: string }
 */
router.post("/generate", auth, async (req, res) => {
  try {
    const { storyName, premise } = req.body;
    if (!storyName) {
      return res.status(400).json({ error: "storyName is required" });
    }

    // 🔹 Build prompt here instead of expecting frontend to pass it
    const prompt = `
      Create a children's picture storybook titled "${storyName}".
      Break it into 5 parts (pages). Each page must be about 600 words.
      Keep the story consistent and engaging for kids.
      Include one illustration description (cartoon style) per part.
      Premise (optional): ${premise || "general moral story"}.
    `;

    const result = await generateStoryBook({ storyName, prompt });
    res.json(result);
  } catch (e) {
    console.error("Storybook generation failed:", e?.message);
    res.status(500).json({ error: e?.message || "Internal error" });
  }
});

export default router;
