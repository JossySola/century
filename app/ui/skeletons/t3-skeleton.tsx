import { Card, Skeleton } from "@heroui/react";
import { memo } from "react";

const T3Skeleton = memo(function () {
    return (
        <div className="flex flex-col items-center gap-5 w-full mb-5">
            <div className="w-full max-w-[90vw] md:w-133">
                <Card className="max-w-200 h-fit p-10 flex flex-col gap-y-6">
                    <div className="flex flex-row gap-2">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <Skeleton className="w-25 h-3 rounded-lg" />
                            <Skeleton className="w-25 h-3 rounded-lg" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Skeleton className="rounded-xl w-3/4 h-5" />
                        <Skeleton className="rounded-xl w-full h-5" />
                    </div>
                    <Skeleton className="rounded-xl w-full h-70" />
                </Card>
            </div>
        </div>
    )
});
export default T3Skeleton;