import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import MainLayout from "../components/layouts/main-layout";

import Loading from "../components/loading";

import QuizCard from "../components/quiz-card";

import {
  supabase,
} from "../lib/supabase";

type Quiz = {
  id: string;

  question: string;

  option_a: string;

  option_b: string;

  option_c: string;

  option_d: string;

  correct_answer: string;
};

export default function QuizPage() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [quizzes, setQuizzes] =
    useState<Quiz[]>([]);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [score, setScore] =
    useState(0);

  useEffect(() => {
    loadQuiz();
  }, []);

  async function loadQuiz() {
    try {
      const { data } =
        await supabase
          .from("quizzes")
          .select("*")
          .eq(
            "course_id",
            id
          );

      setQuizzes(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAnswer(
    correct: boolean
  ) {
    let newScore = score;

    if (correct) {
      newScore += 1;

      setScore(newScore);

      toast.success(
        "Correct 🚀"
      );
    } else {
      toast.error(
        "Wrong answer"
      );
    }

    const next =
      currentIndex + 1;

    if (
      next < quizzes.length
    ) {
      setCurrentIndex(next);
    } else {
      finishQuiz(newScore);
    }
  }

  async function finishQuiz(
    finalScore: number
  ) {
    try {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      const percentage =
        Math.floor(
          (finalScore /
            quizzes.length) *
            100
        );

      const passed =
        percentage >= 70;

      await supabase
        .from(
          "quiz_results"
        )
        .insert({
          user_id: user.id,

          course_id:
            Number(id),

          score:
            percentage,

          passed,
        });

      if (passed) {
        toast.success(
          `Passed with ${percentage}% 🚀`
        );

        navigate(
          `/certificate/${id}`
        );
      } else {
        toast.error(
          `Failed with ${percentage}%`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  }

  if (
    quizzes.length === 0
  ) {
    return (
      <MainLayout>
        <div className="p-20 text-white">
          No quiz found
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-black p-10 text-white">
        <div className="mb-10">
          <p className="text-zinc-500">
            Question{" "}
            {currentIndex + 1} /{" "}
            {quizzes.length}
          </p>

          <h1 className="mt-3 text-6xl font-bold">
            Course Quiz
          </h1>
        </div>

        <QuizCard
          quiz={
            quizzes[
              currentIndex
            ]
          }
          onAnswer={
            handleAnswer
          }
        />
      </div>
    </MainLayout>
  );
}