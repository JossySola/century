import { useFetcher, useRouteLoaderData } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { formatAmount } from "~/utils/formatting/format-amount";
import { motion } from "motion/react";
import { addToast } from "@heroui/react";
import Heart from '@react-spectrum/s2/icons/Heart';
import HeartFilled from '@react-spectrum/s2/icons/HeartFilled';

export default function Upvote({ likes, votes, id, onVoteChange }: {
  likes: boolean | null;
  votes: number;
  id: string;
  onVoteChange?: (liked: boolean) => void;
}) {
  const fetcher = useFetcher();
  const rootLoaderData = useRouteLoaderData("root") as { identity?: { name?: string } } | undefined;
  const isSignedIn = Boolean(rootLoaderData?.identity?.name);
  const [committedLiked, setCommittedLiked] = useState(Boolean(likes));
  const [pendingLiked, setPendingLiked] = useState<boolean | null>(null);
  const optimisticLiked = pendingLiked ?? committedLiked;

  useEffect(() => {
    if (pendingLiked === null) {
      setCommittedLiked(Boolean(likes));
    }
  }, [likes, pendingLiked]);

  useEffect(() => {
    if (fetcher.state !== "idle" || pendingLiked === null) return;

    if (fetcher.data?.error) {
        addToast({
          description: fetcher.data.error,
          color: "danger",
        });
        return;
    }

    setCommittedLiked(pendingLiked);
    onVoteChange?.(pendingLiked);
  }, [fetcher.state, fetcher.data, pendingLiked, onVoteChange]);

  useEffect(() => {
    if (fetcher.state === "idle" && pendingLiked !== null) {
      setPendingLiked(null);
    }
  }, [fetcher.state, pendingLiked]);

  const optimisticVotes = useMemo(() => {
    if (pendingLiked === null) return votes;
    if (pendingLiked === committedLiked) return votes;
    return votes + (pendingLiked ? 1 : -1);
  }, [votes, pendingLiked, committedLiked]);

  const handleSubmit = () => {
    if (fetcher.state !== "idle") return;
    if (!isSignedIn) {
      addToast({
        description: "You must sign in first in order to upvote.",
        color: "danger",
      });
      return;
    }

    const nextLiked = !optimisticLiked;
    setPendingLiked(nextLiked);

    const formData = new FormData();
    formData.set("dir", nextLiked ? "1" : "0");
    fetcher.submit(formData, {
      method: "post",
      action: `/api/vote/${id}`,
    });
  };

  return (
    <div className="inline-flex">
      <button
        onClick={handleSubmit}
        type="button"
        disabled={fetcher.state !== "idle"}
        aria-label={optimisticLiked ? "Remove upvote" : "Upvote"}
        className="flex flex-row justify-center items-center gap-1 cursor-pointer"
      >
        {optimisticLiked
        ? <motion.div whileTap={{
          scale: 2.5,
          transition: { duration: 0.3 },
          }}><HeartFilled UNSAFE_style={{"--iconPrimary": "oklch(57.7% 0.245 27.325)"} as React.CSSProperties}/></motion.div> 
        : <Heart />}
        <span>{formatAmount(optimisticVotes)}</span>
      </button>
    </div>
  );
}
