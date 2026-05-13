import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, User } from "@heroui/react";
import { Heart, Message } from "../icons";
import { formatAmount } from "~/utils/formatting/format-amount";

export default function Preview(
    { 
        title,
        subreddit_name_prefixed,
        name,
        ups,
        num_comments,
        link_flair_text,
        subreddit_id,
        id,
        author,
        likes,
        selftext_html,
        selftext,
        preview,
    } : { 
        title: string,
        subreddit_name_prefixed: string, // e.g. 'r/worldnews'
        name: string, // e.g. 't3_1t824fj',
        ups: number,
        num_comments: number,
        link_flair_text: string | null, // e.g. 'Russia/Ukraine'
        subreddit_id: string, // e.g. 't5_2qh13'
        id: string, // e.g. '1t824fj'
        author: string, // e.g. 'UNITED24Media'
        likes: null | boolean,
        selftext_html: string | null,
        selftext: string,
        preview: {
            enabled: boolean,
            images: Array<{
                id: string,
                resolutions: Array<{
                    height: number,
                    url: string,
                    width: number,
                }>,
                source: {
                    url: string,
                    height: number,
                    width: number,
                },
                variants: {}

            }>
        }
    }
) {
    const image = preview ? preview.images[0].source.url.replace(/&amp;/g, "&") : "";
    return (
        <Card id={id} className="max-w-200 p-10">
            <CardHeader className="flex gap-3">
                <User 
                 avatarProps={{
                    src: ""
                 }}
                 description={subreddit_name_prefixed}
                 name={author}
                />
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-3 justify-center items-center">
                <h3>{title}</h3>
                { link_flair_text && <Chip color="primary" variant="bordered">{link_flair_text}</Chip> }
                { image 
                ? <Image src={image} alt="Preview image of article" />
                : null
                }
                <p className="font-[Geist]">{selftext ?? ""}</p>
            </CardBody>
            <Divider />
            <CardFooter className="flex flex-row justify-center items-center gap-5">
                <div className="flex flex-row justify-center items-center gap-2">
                    <Heart />
                    <span>{formatAmount(ups)}</span>
                </div>
                
                <div className="flex flex-row justify-center items-center gap-2">
                    <Message />
                    <span>{formatAmount(num_comments)}</span>
                </div>
            </CardFooter>
        </Card>
    )
}
