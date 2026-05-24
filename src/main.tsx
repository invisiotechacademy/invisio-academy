import React from "react"

import ReactDOM from "react-dom/client"

import {
  BrowserRouter,
} from "react-router-dom"

import App from "./App"

import "./index.css"

import { supabase } from "./lib/supabase"

import { useAuthStore } from "./store/auth-store"

async function initializeAuth() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  useAuthStore
    .getState()
    .setSession(session)

  supabase.auth.onAuthStateChange(
    (_event, session) => {
      useAuthStore
        .getState()
        .setSession(session)
    }
  )
}

initializeAuth()

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)