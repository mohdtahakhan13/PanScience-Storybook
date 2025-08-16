// // server/src/utils/geminiStorybook.js
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();

// const API_KEY = "AIzaSyB9KSN5Tsn-wZua99GtnxnjCstAITw3L-U" || "YOUR_FALLBACK_KEY";
// if (!API_KEY) throw new Error("Missing GEMINI_API_KEY in .env");

// const genAI = new GoogleGenerativeAI(API_KEY);
// const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// /**
//  * Generate an image using Google Imagen 3 API.
//  * Returns a base64 data URL string on success, or null on failure.
//  */
// async function tryGenerateGeminiImage(imagePrompt) {
//   try {
//     const resp = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0:generate?key=${API_KEY}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           instances: [
//             {
//               prompt: `${imagePrompt} — colorful, cute, 2D cartoon illustration, kid-friendly, clean lines`,
//             },
//           ],
//           parameters: {
//             sampleCount: 1,
//           },
//         }),
//       }
//     );

//     if (!resp.ok) {
//       const errTxt = await resp.text().catch(() => "");
//       console.warn("Images API error:", resp.status, errTxt);
//       return null;
//     }

//     const data = await resp.json();

//     // ✅ Imagen 3 response format
//     const b64 =
//       data?.predictions?.[0]?.bytesBase64Encoded ||
//       data?.images?.[0]?.bytesBase64Encoded ||
//       null;

//     if (!b64) return null;
//     return `data:image/png;base64,${b64}`;
//   } catch (err) {
//     console.warn("Gemini/Imagen fetch failed:", err?.message);
//     return null;
//   }
// }

// /**
//  * Ask Gemini for a 5-part story in strict JSON with ~600 words per part.
//  */
// export async function generateStoryBook({ storyName, prompt }) {
//   const sys = `
// You are an assistant that writes children's illustrated books in clear English.

// TASK:
// Create a story with EXACTLY 5 parts (think of them as pages).
// Each part MUST include:
// - "page_title": a short creative title (<= 5 words)
// - "page_text": ~600 words (aim for 580–620; do not go under 520 or over 700)
// - "image_prompt": a vivid CARTOON-STYLE illustration description for that part

// IMPORTANT:
// - Keep the same characters, tone, and setting across the 5 parts.
// - DO NOT include any extra commentary.
// - OUTPUT STRICTLY valid JSON in this exact shape:
// {
//   "pages": [
//     { "page_title": "...", "page_text": "...", "image_prompt": "..." },
//     { "page_title": "...", "page_text": "...", "image_prompt": "..." },
//     { "page_title": "...", "page_text": "...", "image_prompt": "..." },
//     { "page_title": "...", "page_text": "...", "image_prompt": "..." },
//     { "page_title": "...", "page_text": "...", "image_prompt": "..." }
//   ]
// }

// STORY NAME: ${storyName}
// USER PROMPT (premise/details): ${prompt}
// `;

//   const resp = await textModel.generateContent(sys);
//   const raw = resp.response.text();
//   const cleaned = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

//   let data;
//   try {
//     data = JSON.parse(cleaned);
//   } catch (e) {
//     throw new Error("Gemini did not return valid JSON for the story.");
//   }

//   let pages = Array.isArray(data?.pages) ? data.pages : [];

//   // --- Normalize to 5 pages
//   if (pages.length > 5) pages = pages.slice(0, 5);
//   while (pages.length < 5) {
//     pages.push({
//       page_title: `Extra Part ${pages.length + 1}`,
//       page_text: "",
//       image_prompt: `Cartoon illustration for Part ${pages.length + 1}`,
//     });
//   }

//   // --- Attach images
//   const withImages = [];
//   for (const page of pages) {
//     const imgDataUrl = await tryGenerateGeminiImage(page.image_prompt);
//     withImages.push({ ...page, imageDataUrl: imgDataUrl }); // null if failed
//   }

//   return { storyName, pages: withImages };
// }


import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Gemini Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) throw new Error("Missing GEMINI_API_KEY in .env");
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Stable Diffusion Configuration
const STABILITY_API_KEY = process.env.STABILITY_API_KEY
const STABILITY_API_HOST = "https://api.stability.ai";

/**
 * Generate image using Stable Diffusion API
 */
async function generateStableDiffusionImage(imagePrompt) {
  if (!STABILITY_API_KEY) {
    console.warn("No Stability API key available");
    return null;
  }

  try {
    const response = await fetch(
      `${STABILITY_API_HOST}/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${STABILITY_API_KEY}`
        },
        body: JSON.stringify({
          text_prompts: [{
            text: `${imagePrompt} - colorful, cute, 2D cartoon illustration, kid-friendly, clean lines`,
            weight: 1
          }],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 30,
          samples: 1
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.warn("Stability API error:", error.message);
      return null;
    }

    const data = await response.json();
    return `data:image/png;base64,${data.artifacts[0].base64}`;
  } catch (err) {
    console.warn("Image generation failed:", err.message);
    return null;
  }
}

/**
 * Generate complete storybook with images
 */
export async function generateStoryBook({ storyName, prompt }) {
  const sysPrompt = `
You are an assistant that writes children's illustrated books in clear English.

TASK:
Create a story with EXACTLY 5 parts (pages). Each part MUST include:
- "page_title": Short creative title (<= 5 words)
- "page_text": ~600 words (580-620 words)
- "image_prompt": Vivid cartoon-style illustration description

IMPORTANT:
- Maintain consistent characters, tone, and setting
- Output STRICTLY valid JSON in this format:
{
  "pages": [
    { "page_title": "...", "page_text": "...", "image_prompt": "..." },
    ... (5 items total)
  ]
}

STORY NAME: ${storyName}
USER PROMPT: ${prompt}
`;

  try {
    // Generate story content
    const result = await textModel.generateContent(sysPrompt);
    const text = result.response.text();
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(cleaned);

    // Validate and normalize pages
    let pages = Array.isArray(data?.pages) ? data.pages.slice(0, 5) : [];
    while (pages.length < 5) {
      pages.push({
        page_title: `Page ${pages.length + 1}`,
        page_text: "Content coming soon...",
        image_prompt: `Illustration for ${storyName}, page ${pages.length + 1}`
      });
    }

    // Generate images with guaranteed fallback
    const withImages = [];
    for (const page of pages) {
      try {
        const imgData = await generateStableDiffusionImage(page.image_prompt);
        withImages.push({
          ...page,
          imageDataUrl: imgData || getPlaceholderImage(page.image_prompt)
        });
      } catch (err) {
        console.warn(`Image generation failed for page ${page.page_title}:`, err.message);
        withImages.push({
          ...page,
          imageDataUrl: getPlaceholderImage(page.image_prompt)
        });
      }
    }

    return { 
      storyName, 
      pages: withImages,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error("Story generation failed:", error.message);
    throw new Error(`Story generation failed: ${error.message}`);
  }
}

// Guaranteed fallback image
function getPlaceholderImage(text) {
  const encodedText = encodeURIComponent(text.substring(0, 50));
  return `https://placehold.co/600x400?text=${encodedText}`;
}