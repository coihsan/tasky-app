'use client'
import { sidebar } from '@/lib/const'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SidebarContent } from './sidebar-content'
// TODO : This Component to be delete
const WorkspaceMenu = () => {
    const pathname = usePathname()
    return (
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
                            className={clsx('text-black dark:text-foreground', {
                                '': pathname === item.url,
                            })}
                        >
                            <item.icon />
                        </div>
                        <span>{item.title}</span>
                    </Link>
                ))}
            </nav>
        </SidebarContent>
    )
}

export default WorkspaceMenu
