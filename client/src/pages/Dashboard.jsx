// import React, { useState } from "react";
// import { api } from "../api";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard(){
//   const [storyName,setStoryName] = useState("");
//   const [premise,setPremise] = useState("");
//   const [loading,setLoading] = useState(false);
//   const [err,setErr] = useState("");
//   const nav = useNavigate();

//   async function generate(e){
//     e.preventDefault();
//     setLoading(true); setErr("");
//     try{
//       const { data } = await api.post("/story/generate",{ storyName, premise });
//       nav("/viewer", { state: { story: data } });
//     }catch(ex){ setErr(ex.response?.data?.error || ex.message); }
//     finally{ setLoading(false); }
//   }

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Create a 5‑Page Story</h2>
//       {err && <p className="text-red-600 mb-2">{err}</p>}
//       <form onSubmit={generate} className="space-y-3">
//         <input className="w-full border p-2 rounded" placeholder="Story name (e.g., The Moon Kite)" value={storyName} onChange={e=>setStoryName(e.target.value)} />
//         <textarea className="w-full border p-2 rounded" rows="4" placeholder="Short premise (optional)" value={premise} onChange={e=>setPremise(e.target.value)} />
//         <button disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">
//           {loading ? "Generating…" : "Generate Storybook"}
//         </button>
//       </form>
//       <p className="text-sm text-gray-500 mt-3">You’ll get 5 pages, each with text + one image.</p>
//     </div>
//   )
// }
import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [storyName, setStoryName] = useState("");
  const [premise, setPremise] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function generate(e) {
    e.preventDefault();
    setLoading(true); setErr("");
    try {
      const { data } = await api.post("/story/generate", { storyName, premise });
      nav("/viewer", { state: { story: data } });
    } catch (ex) { setErr(ex.response?.data?.error || ex.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">Create a Magical Story</h2>
          <p className="mt-2 text-lg text-purple-200">Craft your 5-page adventure</p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 p-8">
          {err && (
            <div className="mb-6 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {err}
            </div>
          )}

          <form onSubmit={generate} className="space-y-6">
            <div>
              <label htmlFor="storyName" className="block text-sm font-medium text-gray-300 mb-2">
                Story Title <span className="text-purple-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <input
                  id="storyName"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="The Moon Kite"
                  value={storyName}
                  onChange={e => setStoryName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="premise" className="block text-sm font-medium text-gray-300 mb-2">
                Story Premise <span className="text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <textarea
                  id="premise"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  rows="4"
                  placeholder="A short description of your magical story..."
                  value={premise}
                  onChange={e => setPremise(e.target.value)}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Example: "A brave little fox discovers a magical kite that can fly to the moon"</p>
            </div>

            <button
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg disabled:opacity-70 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Crafting Your Story...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Generate Storybook
                </>
              )}
            </button>
          </form>

          <div className="mt-8 bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <h3 className="text-sm font-medium text-purple-300 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
              What You'll Get
            </h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li className="flex items-start">
                <svg className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>5 beautifully illustrated pages</span>
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Engaging story text on each page</span>
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Magical AI-generated artwork</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}