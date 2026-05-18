import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type Props = {
    childdren: ReactNode
    className?: string
}

export function AuthScreenLayout({
    childdren,
    className
}: Props) {
    return(
        <div className={
            cn('bg-background flex min-h-svh w-full flex-col items-center justify-center gap-6 p 6',
                className
            )
        }>
            {childdren}
        </div>
    )
}