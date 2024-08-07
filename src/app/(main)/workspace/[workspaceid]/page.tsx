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
const WorkspaceIDClient = ({ searchParams }: Props) => {
    const { user } = useUserDetails()
    // if (user?.user_workspace) {
    //     return redirect(`/workspace/${user?.user_workspace[0].workspaceId}`)
    // }
    // if (searchParams.workspace) {
    //     const userPath = searchParams.workspace.userId.split('___')[0]
    //     const userWorkspaceId =
    //         searchParams.workspace.workspaceId.split('___')[1]
    //     if (userWorkspaceId) return <div>Not authorized</div>
    //     return redirect(`/workspace/${userPath}/${userWorkspaceId}`)
    // } else return redirect('/workspace')

    return (
        <ScrollArea className="relative pb-32 h-screen w-full p-4">
            <PanelBar />
            <h1>Workspace ID</h1>
            <div>
                <span>Workspace Data :</span>
                <h2>Workspace Owner : {user?.user_workspace[0].userId} by {user?.full_name}</h2>
                <h2>Workspace ID : {user?.user_workspace[0].workspaceId} and</h2>
                <h3>
                    Description :{' '}
                    {user?.user_workspace[0].workspace.description}
                </h3>
            </div>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    )
}
export default WorkspaceIDClient
