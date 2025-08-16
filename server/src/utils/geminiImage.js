// server/src/utils/geminiImage.js
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const PEXELS_API_KEY = "0jW0ZfHIvTt6V33Vrw3AVTP2rXjlDdWjSpSN4ZSKTLMKcTFdeON20qm5";

/**
 * Fetch a cartoon-style illustration from Pexels
 * @param {string} query - Image search query
 * @returns {string|null} image_url
 */
export async function fetchCartoonImage(query) {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query + " cartoon illustration")}&per_page=1`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );

    const data = await res.json();
    return data.photos?.[0]?.src?.large || null;
  } catch (err) {
    console.error("Pexels fetch failed:", err.message);
    return null;
  }
}
