import {
  useState,
} from "react";

export default function CourseChat() {
  const [messages, setMessages] =
    useState([
      {
        user: "Alex",

        text: "This lesson is amazing 🚀",
      },
    ]);

  const [input, setInput] =
    useState("");

  function sendMessage() {
    if (!input) return;

    setMessages((prev) => [
      ...prev,

      {
        user: "You",

        text: input,
      },
    ]);

    setInput("");
  }

  return (
    <div className="rounded-[35px] border border-white/10 bg-zinc-950 p-8">
      <h2 className="text-4xl font-black">
        Live Discussion
      </h2>

      <div className="mt-8 h-[350px] space-y-5 overflow-y-auto rounded-3xl border border-white/10 bg-black p-6">
        {messages.map(
          (
            message,
            index
          ) => (
            <div
              key={index}
              className="rounded-2xl bg-zinc-900 p-4"
            >
              <p className="font-bold">
                {message.user}
              </p>

              <p className="mt-2 text-zinc-300">
                {message.text}
              </p>
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
          placeholder="Write message..."
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