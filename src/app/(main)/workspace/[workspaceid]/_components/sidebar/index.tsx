'use client'
import React, { useEffect, useState } from 'react'
import Logo from '@/components/global/logo'
import { SidebarContent } from '@/components/global/sidebar-content'
import FooterOnSidebar from '@/components/global/footer-on-sidebar'
import { useSpaceData } from '@/lib/queries/use-swr'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import NewSpaceForm from '@/components/form/new-space-form'
import Loading from '@/components/global/loading'
import { FluentFolder24Regular } from '@/components/icons/folder-24-regular'
import EditWorkspace from '@/app/(main)/workspace/[workspaceid]/_components/edit-workspace'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectSeparator,
} from '@/components/ui/select'
import { shortText } from '@/lib/utils'
import NewWorkspaceForm from '@/components/form/new-workspace-form'
import { usePathname, useRouter, useParams } from 'next/navigation'
import { useUserDetails } from '@/lib/queries/use-swr'
import { sidebar } from '@/lib/const'
import clsx from 'clsx'

interface Props {
    spaceId: string
}

const Sidebar = () => {
    const pathname = usePathname()
    const { space } = useSpaceData()
    const router = useRouter()
    const params = useParams()
    const workspaceid = params.workspaceid as string
    const [selectedWorkspace, setSelectedWorkspace] = useState('')
    const { user, isLoading, isError } = useUserDetails()

    useEffect(() => {
        const storedWorkspaceId = localStorage.getItem('selectedWorkspace')
        if (storedWorkspaceId) {
            setSelectedWorkspace(storedWorkspaceId)
            // router.replace(`/workspace/${storedWorkspaceId}`)
        } else {
            // router.replace(`/workspace`)
        }
    }, [])

    if (isLoading) {
        return <Loading className="flex justify-center w-full" />
    }
    if (isError) {
        return <div>Error: {isError.message}</div>
    }

    const handleWorkspaceChange = (workspaceId: string) => {
        setSelectedWorkspace(workspaceId)
        localStorage.setItem('selectedWorkspace', workspaceId)
        router.replace(`/workspace/${workspaceId}`)
    }
    return (
        <aside className="w-full h-full h-screen max-w-64 relative">
            <SidebarContent borderBottom>
                <Logo />
            </SidebarContent>
            <SidebarContent>
                {user?.user_workspace[0].workspace.id && (
                    <Select
                        value={selectedWorkspace?.toString()}
                        onValueChange={handleWorkspaceChange}
                    >
                        <SelectTrigger className="w-full h-[50px]">
                            <SelectValue placeholder="Select a workspace" />
                        </SelectTrigger>
                        <SelectContent className="CardStyle">
                            <SelectGroup>
                                <SelectLabel className="text-xs">
                                    Your own
                                </SelectLabel>
                                {user.user_workspace.length === 0 ? (
                                    <div className="text-muted-foreground text-center text-xs py-4 italic">
                                        No Workspace
                                    </div>
                                ) : (
                                    user.user_workspace.map((list) => (
                                        <SelectItem
                                            className="py-2"
                                            key={list.workspace.id}
                                            value={`${list.workspace.id}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Avatar className="w-8 h-8">
                                                    <AvatarImage
                                                        sizes="28"
                                                        src={`${list.workspace.workspace_logo}`}
                                                        alt={`${list.workspace.workspace_logo}`}
                                                    />
                                                    <AvatarFallback className="bg-accent">
                                                        <span>
                                                            {shortText(
                                                                list.workspace
                                                                    .name
                                                            )}
                                                        </span>
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span>
                                                    {list.workspace.name}
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))
                                )}
                                <SelectSeparator />
                                <NewWorkspaceForm />
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            </SidebarContent>
            <SidebarContent>
                <span className="text-[11px] text-muted-foreground font-medium uppercase">
                    Workspace
                </span>
                <nav className="flex flex-col gap-1 pt-4">
                    {sidebar.map((item) => (
                        <Link
                            className={clsx(
                                'flex items-center text-sm h-9 gap-3 pl-3 text-black dark:text-foreground hover:bg-onyx-100 dark:hover:bg-onyx-800 hover:ring-2 hover:ring-onyx-100 dark:hover:ring-onyx-800 rounded-md transitionAll',
                                {
                                    'bg-muted rounded-lg font-bold':
                                        pathname === item.url,
                                }
                            )}
                            href={item.url}
                            key={item.id}
                        >
                            <div
                                className={clsx(
                                    'text-black dark:text-foreground',
                                    {
                                        '': pathname === item.url,
                                    }
                                )}
                            >
                                <item.icon />
                            </div>
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </nav>
            </SidebarContent>
            <SidebarContent borderTop>
                <div className="flex items-center justify-between pt-4 h-full">
                    <span className="text-[11px] text-muted-foreground font-medium uppercase">
                        space
                    </span>
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger>
                                <NewSpaceForm workspaceId={workspaceid} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>New Space</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
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
            </SidebarContent>
            <SidebarContent className="absolute left-4 bottom-4" borderTop>
                <FooterOnSidebar />
            </SidebarContent>
        </aside>
    )
}

export default Sidebar
