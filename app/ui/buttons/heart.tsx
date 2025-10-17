import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useFetcher, useParams } from "react-router";
import { Heart, HeartFill } from "../icons";
import { motion } from "motion/react";

export default function HeartButton({ vote, setVote, id }: { 
    vote: string, 
    setVote: Dispatch<SetStateAction<string>>, 
    id: string 
}) {
    const params = useParams();
    const fetcher = useFetcher();
    useEffect(() => {
        if (fetcher.data) {
            if (fetcher.data.endpoint) {
                window.sessionStorage.setItem("x-century-pending-action", JSON.stringify({
                    type: "vote",
                    id,
                    vote,
                }));
                window.sessionStorage.setItem("x-century-pending-url", JSON.stringify(params));
                window.location.href = fetcher.data.endpoint;
            } else if (fetcher.data.error) {
                console.error("Error processing vote:", fetcher.data.error);
            } else {
                setVote(prev => prev === "1" ? "0" : "1");
            }
        }
    }, [fetcher.data]);
    const handleClick = () => {
        fetcher.submit({}, { 
            method: "post",
            action: `/api/upvote/${id}/${vote}`});
    }    
    return (
        <motion.div 
        onClick={handleClick}
        className="cursor-pointer" 
        whileTap={{ scale: 1.5 }}>
            {
                vote === "1"
                ? <HeartFill color="oklch(57.7% 0.245 27.325)"/>
                : <Heart />
            }
        </motion.div>
    )
}