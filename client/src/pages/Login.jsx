// import React, { useState } from "react";
// import { api, setToken } from "../api";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [email,setEmail] = useState("");
//   const [password,setPassword] = useState("");
//   const [err,setErr] = useState("");
//   const nav = useNavigate();

//   async function submit(e){
//     e.preventDefault();
//     setErr("");
//     try{
//       const { data } = await api.post("/auth/login", { email, password });
//       setToken(data.token);
//       nav("/");
//     }catch(ex){ setErr(ex.response?.data?.error || ex.message); }
//   }

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h1 className="text-xl font-semibold mb-4">Login</h1>
//       {err && <p className="text-red-600 mb-2">{err}</p>}
//       <form onSubmit={submit} className="space-y-3">
//         <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
//         <input className="w-full border p-2 rounded" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
//         <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
//       </form>
//       <p className="mt-3 text-sm">No account? <Link to="/register" className="underline">Register</Link></p>
//     </div>
//   )
// }
import React, { useState } from "react";
import { api, setToken } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setToken(data.token);
      nav("/");
    } catch (ex) { setErr(ex.response?.data?.error || ex.message); }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-600 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-center mb-8">Continue your magical reading journey</p>
          
          {err && (
            <div className="mb-6 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {err}
            </div>
          )}
          
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-purple-400 hover:text-purple-300 font-medium transition duration-150"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
        
        <div className="bg-gray-700/50 px-8 py-4 text-center">
          <p className="text-xs text-gray-400">
            Forgot password? <Link to="/forgot-password" className="text-purple-400 hover:text-purple-300">Reset it</Link>
          </p>
        </div>
      </div>
    </div>
  );
}