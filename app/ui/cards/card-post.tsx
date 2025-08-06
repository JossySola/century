"use client"
import { Card, CardBody, CardFooter, CardHeader, Divider, Image, User } from "@heroui/react"
import { Heart, HeartFill } from "../icons"
import { formatAmount } from "../../utils"

export default function PostCard({ author, subreddit, id, permalink, num_comments, selftext, subreddit_id, thumbnail, thumbnail_height, thumbnail_width, title, ups }: {
    author: string,
    subreddit: string,
    id: string,
    permalink: string,
    num_comments: number,
    selftext: string,
    subreddit_id: string,
    thumbnail: string,
    thumbnail_height: number,
    thumbnail_width: number,
    title: string,
    ups: number,
}) {
    return (
       <Card className="w-full md:w-[532px] p-5">
            <CardHeader className="flex flex-col gap-3 text-center">
                <User name={author} description={subreddit} />
                <h5>{title}</h5>
            </CardHeader>
            <CardBody className="flex flex-col justify-center items-center text-center">
                {
                    thumbnail 
                    ? <Image src={thumbnail} width={thumbnail_width} />
                    : null 
                }
                <p>{selftext}</p>
            </CardBody>
            <Divider />
            <CardFooter className="flex flex-row text-gray-500">
                <div className="flex flex-row justify-center items-center gap-3">
                    {
                        ups > 0
                        ? <HeartFill />
                        : <Heart />
                    }
                    <span className="">{formatAmount(ups)}</span>
                </div>
            </CardFooter>
       </Card> 
    )
}