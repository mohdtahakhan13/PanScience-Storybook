# 📚 StoryBook Generator

A full-stack AI StoryBook app built for **PanScience Hackathon 2025**.  
Generates **5-page storybooks** with text + images, downloadable as PDF, and viewable in a built-in reader.

---

## 👥 Authors
- **Anurag Rawat**
- **Mohd Taha Khan**

---

## ✨ Features
- 🔑 Authentication (Login/Register)
- 📝 Input **Story Name** (required) + optional description
- 🤖 AI generates **5 pages (~600 words each)** with **titles**
- 🖼️ One AI-generated illustration per page
- 📥 Download storybook as PDF
- 📖 Built-in reader for continuous story experience

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite), TailwindCSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI:** Gemini (text + images)
- **PDF:** pdf-lib (server side)

---

## 📂 Folder Structure

storybook/
├── server/
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # JWT auth
│   │   ├── utils/           # Gemini integration
│   │   └── index.js         # App entry
│   └── package.json
├── client/
│   ├── src/
│   │   ├── pages/           # Login, Register, Dashboard, StoryViewer
│   │   ├── components/      # UI components
│   │   └── App.jsx
│   └── package.json
├── docker-compose.yml
└── README.md

⚙️ Installation
1. Clone Repo
git clone https://github.com/<your-username>/storybook.git
cd storybook

2. Backend
cd server
npm install
cp .env.example .env   # add GEMINI_API_KEY, MONGO_URI, JWT_SECRET
npm run dev

3. Frontend
cd client
npm install
npm run dev

4. Access

Frontend → http://localhost:5173

Backend → http://localhost:8080

📖 Usage

Register/Login

Enter Story Name + (optional) Description

Generate → Get 5 parts:

Each ~600 words

Each has a title + image

View in Story Reader

Download PDF

📥 Example

Input:

{
  "storyName": "The Rabbit and the Turtle",
  "prompt": "A story about patience and wisdom beating overconfidence."
}


Output:

Pages:

The Race Begins

The Rabbit Runs Ahead

The Turtle Steady Walks

The Rabbit Sleeps

The Turtle Wins

Each page has ~600 words + an illustration

Exportable as PDF

🐳 Docker (Optional)
docker-compose up --build

🏆 Hackathon

Built for PanScience Hackathon 2025.
AI + Creativity → Turning prompts into complete storybooks with text & illustrations.

