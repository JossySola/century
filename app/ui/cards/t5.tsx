import { Card, CardBody, CardHeader, Image, User } from "@heroui/react";
import { Link } from "react-router";
import { formatAmount } from "~/utils/format-amount";
import { motion } from "motion/react";
import { memo } from "react";

const T5 = memo(function T5({
    display_name_prefixed,
    subscribers,
    name,
    public_description,
    banner_img,
    icon_img,
    fullname,
}: {
    display_name_prefixed: string,
    subscribers: number,
    name: string,
    public_description: string,
    banner_img: string,
    icon_img: string,
    fullname: string,
}) {
    return (
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="w-full sm:w-133">
            <Link to={`/${display_name_prefixed}`}>
                <Card className="p-5">
                    {
                        banner_img 
                        ? <Image
                        removeWrapper
                        alt="Card background image"
                        className="z-0 w-full h-full object-cover"
                        src={banner_img} />
                        : null
                    }
                    <CardHeader>
                        <User
                        avatarProps={{ src: icon_img }}
                        name={display_name_prefixed}
                        description={`${formatAmount(subscribers)} members`} />
                    </CardHeader>
                    <CardBody>
                        <span>{public_description}</span>
                    </CardBody>
                </Card>
            </Link>
        </motion.div>
    )
});
export default T5;