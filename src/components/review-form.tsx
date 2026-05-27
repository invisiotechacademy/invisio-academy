import {
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  supabase,
} from "../lib/supabase";

type Props = {
  courseId: string;

  onSuccess: () => void;
};

export default function ReviewForm({
  courseId,
  onSuccess,
}: Props) {
  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function submitReview() {
    try {
      setLoading(true);

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        toast.error(
          "Login required"
        );

        return;
      }

      const { error } =
        await supabase
          .from("reviews")
          .insert({
            user_id:
              user.id,

            course_id:
              courseId,

            rating,

            comment,
          });

      if (error)
        throw error;

      toast.success(
        "Review added"
      );

      setComment("");

      onSuccess();
    } catch (error: any) {
      toast.error(
        error.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
      <h2 className="mb-6 text-3xl font-bold">
        Leave Review
      </h2>

      <div className="space-y-5">
        <select
          value={rating}
          onChange={(e) =>
            setRating(
              Number(
                e.target.value
              )
            )
          }
          className="w-full rounded-2xl border border-white/10 bg-black p-4 outline-none"
        >
          <option value={5}>
            ⭐⭐⭐⭐⭐
          </option>

          <option value={4}>
            ⭐⭐⭐⭐
          </option>

          <option value={3}>
            ⭐⭐⭐
          </option>

          <option value={2}>
            ⭐⭐
          </option>

          <option value={1}>
            ⭐
          </option>
        </select>

        <textarea
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          placeholder="Write review..."
          className="h-40 w-full rounded-2xl border border-white/10 bg-black p-4 outline-none"
        />

        <button
          onClick={
            submitReview
          }
          disabled={loading}
          className="w-full rounded-2xl bg-white py-4 text-xl font-bold text-black"
        >
          {loading
            ? "Loading..."
            : "Submit Review"}
        </button>
      </div>
    </div>
  );
}