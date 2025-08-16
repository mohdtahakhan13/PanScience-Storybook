// server/src/utils/geminiText.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI("AIzaSyB9KSN5Tsn-wZua99GtnxnjCstAITw3L-U");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generate one page of the story (continuation style).
 * @param {string} storyName - The story title
 * @param {string} premise - The story premise
 * @param {Array} previousPages - List of already generated pages
 * @param {number} pageNumber - Current page number
 * @returns {object} page {page_title, page_text, image_prompt}
 */
export async function generateStoryPage(storyName, premise, previousPages, pageNumber) {
  const prompt = `
You are an assistant writing a children's picture book in English.

Story title: ${storyName}
Premise: ${premise}

Already written: ${JSON.stringify(previousPages)}

Now write Page ${pageNumber}.

Rules:
- Return JSON only: {page_title, page_text, image_prompt}
- page_text must be 180–220 words
- image_prompt must describe a cartoon-style illustration for this page
- Keep characters and setting consistent across all pages
  `;

  const res = await model.generateContent(prompt);
  const text = res.response.text().replace(/```json|```/g, "").trim();

  let page;
  try {
    page = JSON.parse(text);
  } catch {
    // Fallback if Gemini doesn't return valid JSON
    page = {
      page_title: `Page ${pageNumber}`,
      page_text: text,
      image_prompt: `Cartoon illustration for Page ${pageNumber}`,
    };
  }

  return page;
}
