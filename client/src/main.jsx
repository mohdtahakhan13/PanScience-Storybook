import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import StoryViewer from "./pages/StoryViewer.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App />, children: [
    { index: true, element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      )},
    { path: "viewer", element: (
        <ProtectedRoute>
          <StoryViewer />
        </ProtectedRoute>
      )}
  ]},
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> }
]);


createRoot(document.getElementById("root")).render(<RouterProvider router={router}/>);
