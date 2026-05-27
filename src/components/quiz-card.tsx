import {
  useState,
} from "react";

type Props = {
  question: string;

  options: string[];

  correctAnswer: string;
};

export default function QuizCard({
  question,
  options,
  correctAnswer,
}: Props) {
  const [selected, setSelected] =
    useState("");

  const [result, setResult] =
    useState("");

  function checkAnswer() {
    if (
      selected ===
      correctAnswer
    ) {
      setResult(
        "Correct 🚀"
      );
    } else {
      setResult(
        "Wrong Answer ❌"
      );
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950 p-10">
      <h2 className="text-3xl font-black">
        {question}
      </h2>

      <div className="mt-8 space-y-4">
        {options.map(
          (option) => (
            <button
              key={option}
              onClick={() =>
                setSelected(
                  option
                )
              }
              className={`block w-full rounded-2xl border p-5 text-left text-xl transition ${
                selected ===
                option
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-black hover:border-white/30"
              }`}
            >
              {option}
            </button>
          )
        )}
      </div>

      <button
        onClick={
          checkAnswer
        }
        className="mt-8 rounded-2xl bg-white px-8 py-4 text-xl font-bold text-black"
      >
        Check Answer
      </button>

      {result && (
        <div className="mt-6 text-2xl font-bold">
          {result}
        </div>
      )}
    </div>
  );
}