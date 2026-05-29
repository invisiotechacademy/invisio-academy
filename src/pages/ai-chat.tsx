import { useState } from "react";

import MainLayout from "../components/layouts/main-layout";

export default function AIChatPage() {
  const [messages, setMessages] =
    useState([
      {
        role: "ai",
        text: "Hello 👋 I am your AI mentor.",
      },
    ]);

  const [input, setInput] =
    useState("");

  function sendMessage() {
    if (!input) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: input,
      },
      {
        role: "ai",
        text: "AI response for: " + input,
      },
    ]);

    setInput("");
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/10 p-10">
          <p className="text-zinc-500">
            Assistant
          </p>

          <h1 className="mt-3 text-6xl font-bold">
            AI Chat
          </h1>
        </div>

        <div className="mx-auto flex max-w-5xl flex-col gap-6 p-10">
          <div className="flex h-[600px] flex-col gap-5 overflow-y-auto rounded-3xl border border-white/10 bg-zinc-950 p-6">
            {messages.map(
              (message, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] rounded-2xl p-5 ${
                    message.role ===
                    "user"
                      ? "ml-auto bg-white text-black"
                      : "bg-zinc-800"
                  }`}
                >
                  {message.text}
                </div>
              )
            )}
          </div>

          <div className="flex gap-4">
            <input
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              placeholder="Ask AI..."
              className="flex-1 rounded-2xl border border-white/10 bg-zinc-950 p-5 outline-none"
            />

            <button
              onClick={sendMessage}
              className="rounded-2xl bg-white px-8 font-bold text-black"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}