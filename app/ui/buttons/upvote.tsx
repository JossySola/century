import { useFetcher } from "react-router";
import { startTransition, useOptimistic } from "react";
import { Heart, HeartFill } from "../icons";
import { formatAmount } from "~/utils/formatting/format-amount";
import { motion } from "motion/react";

export default function Upvote({ likes, votes, id }: {
  likes: boolean | null;
  votes: number;
  id: string;
}) {
  // useFetcher provides pending state and does not add into the browser's navigation
  const fetcher = useFetcher();
  const [optimisticVote, addOptimisticVote] = useOptimistic(likes ?? false, (currentValue, _) => {
    return !currentValue;
  });
  const handleClick = () => {
    startTransition(() => {
      addOptimisticVote(null);
    });
  }
  return (
    <fetcher.Form method="post" className="inline-flex">
      <input type="hidden" value="upvote" name="action" />
      <input type="hidden" value={id} name="id" />
      <input type="hidden" value={optimisticVote ? "1" : "0"} name="dir" />
      <button
        onClick={handleClick}
        type="submit"
        disabled={optimisticVote !== optimisticVote ? true : false}
        aria-label={optimisticVote ? "Remove upvote" : "Upvote"}
        className="flex flex-row justify-center items-center gap-2 cursor-pointer"
      >
        {optimisticVote
        ? <motion.div whileTap={{
          scale: 2.5,
          transition: { duration: 0.3 },
          }}><HeartFill color="oklch(57.7% 0.245 27.325)"/></motion.div> 
        : <Heart />}
        <span>{formatAmount(votes)}</span>
      </button>
    </fetcher.Form>
  );
}
