'use client'
import React, { Suspense } from 'react'
import EditWorkspace from '@/app/(main)/workspace/[workspaceid]/_components/edit-workspace'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import NewSpaceForm from '@/components/forms/new-space-form'
import Loading from '@/components/global/loading'
import { FluentFolder24Regular } from '@/components/icons/folder-24-regular'
import { useSpaceData } from '@/lib/queries/use-swr'
import { SidebarContent } from '@/components/global/sidebar-content'

interface Props {
    id: string
}
// TODO : This Component to be delete
const GetAllpace = ({ id }: Props) => {
    const { space, isError, isLoading } = useSpaceData()

    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <div>Error: {isError.message}</div>
    }

    return (
        <SidebarContent borderTop>
            <div className="flex items-center justify-between pt-4 h-full">
                <span className="text-[11px] text-muted-foreground font-medium uppercase">
                    space
                </span>
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                            <NewSpaceForm workspaceId={id} />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>New Space</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Suspense fallback={isLoading}>
                {space?.length ? (
                    <div className="pt-4 h-72 z-50">
                        {space.map((list) => (
                            <div className="grid w-full" key={list.id}>
                                <Link
                                    href={`/workspace/${list.workspaceId}/space/${list.id}`}
                                    className="text-sm h-9 hover:bg-muted/50 px-2 rounded-md flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <FluentFolder24Regular className="size-5" />
                                        <span className="overflow-hidden text-clip-1 text-nowrap">
                                            {list.name}
                                        </span>
                                    </div>
                                    <EditWorkspace />
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-muted-foreground text-center text-xs py-4 italic">
                        No Space
                    </div>
                )}
            </Suspense>
        </SidebarContent>
    )
}

export default GetAllpace
