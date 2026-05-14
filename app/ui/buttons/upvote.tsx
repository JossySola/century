import { useFetcher } from "react-router";
import { useOptimistic } from "react";
import { Heart, HeartFill } from "../icons";
import { formatAmount } from "~/utils/formatting/format-amount";

type VoteDir = "1" | "0";

export default function Upvote({ likes, votes, id }: {
  likes: boolean | null;
  votes: number;
  id: string;
}) {
  // Using fetcher in order to use access token from Cookies, as it is
  // needed to access the Session Server-side
  const fetcher = useFetcher();
  const [optimisticVote, addOptimisticVote] = useOptimistic(
    { liked: likes ?? false, votes },
    (
      current,
      optimisticDir: VoteDir,
    ): { liked: boolean; votes: number } => {
      if (optimisticDir === "1") {
        return {
          liked: true,
          votes: current.liked ? current.votes : current.votes + 1,
        };
      }

      return {
        liked: false,
        votes: current.liked ? current.votes - 1 : current.votes,
      };
    },
  );

  const isSubmitting = fetcher.state !== "idle";
  const nextDir: VoteDir = optimisticVote.liked ? "0" : "1";

  return (
    <fetcher.Form method="post" className="inline-flex">
      <input type="hidden" value="upvote" name="action" />
      <input type="hidden" value={id} name="id" />
      <button
        type="submit"
        name="dir"
        value={nextDir}
        disabled={isSubmitting}
        aria-label={optimisticVote.liked ? "Remove upvote" : "Upvote"}
        className="flex flex-row justify-center items-center gap-2 cursor-pointer"
        onClick={() => addOptimisticVote(nextDir)}
      >
        {optimisticVote.liked 
        ? <HeartFill color="oklch(57.7% 0.245 27.325)"/> 
        : <Heart />}
        <span>{formatAmount(optimisticVote.votes)}</span>
      </button>
    </fetcher.Form>
  );
}
