import { Skeleton } from "@heroui/react";

export default function CommentSkeleton() {
    return (
        <div className="w-full p-5 flex flex-col gap-3">
            <div className="max-w-75 w-full flex items-center gap-3">
                <div>
                    <Skeleton className="flex rounded-full w-8 h-8" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
                <Skeleton className="h-3 w-2/5 rounded-lg" />
            </div>
        </div>
    )
}