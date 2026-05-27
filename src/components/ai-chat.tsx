import {
  useState,
} from "react";

export default function AIChat() {
  const [messages, setMessages] =
    useState([
      {
        role: "ai",

        text: "Hi 🚀 I am your AI tutor.",
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

        text: `AI response for: ${input}`,
      },
    ]);

    setInput("");
  }

  return (
    <div className="rounded-[35px] border border-white/10 bg-zinc-950 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-black">
          AI Tutor
        </h2>

        <span className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-black">
          ONLINE
        </span>
      </div>

      <div className="mt-8 h-[400px] space-y-5 overflow-y-auto rounded-3xl border border-white/10 bg-black p-6">
        {messages.map(
          (
            message,
            index
          ) => (
            <div
              key={index}
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.role ===
                "user"
                  ? "ml-auto bg-white text-black"
                  : "bg-zinc-900 text-white"
              }`}
            >
              {message.text}
            </div>
          )
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <input
          value={input}
          onChange={(e) =>
            setInput(
              e.target.value
            )
          }
          placeholder="Ask AI tutor..."
          className="flex-1 rounded-2xl border border-white/10 bg-black px-6 py-4 text-white outline-none"
        />

        <button
          onClick={
            sendMessage
          }
          className="rounded-2xl bg-white px-8 py-4 font-bold text-black"
        >
          Send
        </button>
      </div>
    </div>
  );
}