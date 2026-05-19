// src/pages/auth/components/auth-screen-layout.tsx

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type Props = {
    children: ReactNode  // ← "childdren" емес, "children"
    className?: string
}

export function AuthScreenLayout({
    children,             // ← "childdren" емес, "children"
    className
}: Props) {
    return(
        <div className={
            cn('bg-background flex min-h-svh w-full flex-col items-center justify-center gap-6 p-6',
                className
            )
        }>
            {children} 
        </div>
    )
}