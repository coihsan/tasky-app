'use client'
import type { Metadata, ResolvingMetadata } from 'next'
import { db } from '@/lib/db'
import { redirect, useRouter } from 'next/navigation'
import PanelBar from '@/app/(main)/workspace/[workspaceid]/_components/panel-bar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useUserDetails } from '@/lib/queries/use-swr'
import { UserWorkspace } from '@prisma/client'
type Props = {
    searchParams: { workspace: UserWorkspace; spaceId: string }
}
const Page = ({ searchParams }: Props) => {
    const { user } = useUserDetails()

    return (
        <ScrollArea className="relative pb-32 h-screen w-full p-4">
            <PanelBar />
            <h1>Workspace Page</h1>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    )
}
export default Page
