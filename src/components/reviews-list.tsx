type Review = {
  id: string;

  rating: number;

  comment: string;
};

type Props = {
  reviews: Review[];
};

export default function ReviewsList({
  reviews,
}: Props) {
  if (
    reviews.length === 0
  ) {
    return (
      <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8 text-zinc-500">
        No reviews yet
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map(
        (review) => (
          <div
            key={review.id}
            className="rounded-3xl border border-white/10 bg-zinc-950 p-8"
          >
            <p className="mb-4 text-2xl">
              {"⭐".repeat(
                review.rating
              )}
            </p>

            <p className="text-zinc-300">
              {
                review.comment
              }
            </p>
          </div>
        )
      )}
    </div>
  );
}