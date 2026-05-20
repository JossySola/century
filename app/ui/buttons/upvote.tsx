import { useFetcher } from "react-router";
import { startTransition, useEffect, useOptimistic } from "react";
import { formatAmount } from "~/utils/formatting/format-amount";
import { motion } from "motion/react";
import { addToast } from "@heroui/react";
import Heart from '@react-spectrum/s2/icons/Heart';
import HeartFilled from '@react-spectrum/s2/icons/HeartFilled';

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
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        addToast({
          description: fetcher.data.error,
          color: "danger",
        })
      }
    }
  }, [fetcher]);
  const handleClick = () => {
    startTransition(() => {
      addOptimisticVote(null);
    });
  }
  return (
    <fetcher.Form method="post" action={`/api/vote/${id}`} className="inline-flex">
      <input type="hidden" value={optimisticVote ? "1" : "0"} name="dir" />
      <button
        onClick={handleClick}
        type="submit"
        disabled={optimisticVote !== optimisticVote ? true : false}
        aria-label={optimisticVote ? "Remove upvote" : "Upvote"}
        className="flex flex-row justify-center items-center gap-1 cursor-pointer"
      >
        {optimisticVote
        ? <motion.div whileTap={{
          scale: 2.5,
          transition: { duration: 0.3 },
          }}><HeartFilled UNSAFE_style={{"--iconPrimary": "oklch(57.7% 0.245 27.325)"} as React.CSSProperties}/></motion.div> 
        : <Heart />}
        <span>{formatAmount(votes)}</span>
      </button>
    </fetcher.Form>
  );
}
