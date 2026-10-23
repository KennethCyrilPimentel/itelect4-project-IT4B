import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AiReview } from "../../types/index";
import { askAi } from "../api/client";
import { reviewFormSchema } from "../schemas/reviewSchema";
import type { ReviewFormValues } from "../schemas/reviewSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// One colour per difficulty value. If you add a fourth value to AiReview,
// this object stops compiling until it has a colour for it.
const DIFFICULTY_STYLE: Record<AiReview["difficulty"], string> = {
  easy: "bg-green-100 text-green-800",
  moderate: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

function ReviewPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { prompt: "" },
  });

  // A mutation, not a query: it runs when the button is pressed, never on
  // page load, and every press is a new request (and spends Gemini quota).
  const review = useMutation({
    mutationFn: askAi,
  });

  const onSubmit = (values: ReviewFormValues): void => {
    review.mutate(values.prompt);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
        AI Shoot Review
      </h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Describe an upcoming shoot and get a shot list and prep tips.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="prompt" className="text-foreground">
            Shoot description
          </Label>
          <textarea
            id="prompt"
            rows={6}
            {...register("prompt")}
            aria-invalid={errors.prompt ? true : undefined}
            placeholder="What kind of shoot, how long, where, how many people..."
            className="rounded-lg border border-input bg-background p-2.5 text-sm text-foreground"
          />
          {errors.prompt && (
            <p className="text-sm text-red-600">{errors.prompt.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={review.isPending}
          className="justify-self-start"
        >
          {review.isPending ? "Reviewing..." : "Review my shoot"}
        </Button>
      </form>

      {/* The backend's own sentence: rate limit, quota, or a 502. Never Google's raw error. */}
      {review.isError && (
        <p className="mt-4 text-sm text-red-700">{review.error.message}</p>
      )}

      {review.data && (
        <div className="mt-6 grid gap-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <span
            className={`justify-self-start rounded px-2 py-0.5 text-sm font-semibold ${DIFFICULTY_STYLE[review.data.difficulty]}`}
          >
            {review.data.difficulty}
          </span>
          <p className="text-gray-900 dark:text-white">{review.data.summary}</p>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Shot list
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
              {review.data.shotList.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Prep tips
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
              {review.data.prepTips.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;