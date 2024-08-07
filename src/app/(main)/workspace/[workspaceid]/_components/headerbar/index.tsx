'use client'
import React from 'react'
import UserButtonCustom from '@/components/auth/user-button'
import HeaderOption from './header-option'
import NotificationUser from '@/components/global/notification-user'
import { useUserDetails } from '@/lib/queries/use-swr'

// type Props = {
//     workspaceID: string,
//     spaceId: string,
//     type: 'workspace' | 'space',
// }

const HeaderBar = () => {
    const {user} = useUserDetails()

    // const details = type === 'workspace' 
    // ? user?.user_workspace
    // : user?.user_workspace.find((spaceId) => spaceId.workspace.id === workspaceID)
    // if (!details) return

    return (
        <header className="flex dark:bg-gradient-to-r dark:from-white/5 space-x-4 items-center w-full h-16 py-2 px-3 relative rounded-t-2xl border-b-[1px] border-onyx-100 dark:border-onyx-50/10">
            <HeaderOption  />
            <div className="flex items-center gap-3 absolute right-4">
                <NotificationUser />
                <UserButtonCustom />
            </div>
        </header>
    )
}
export default HeaderBar
