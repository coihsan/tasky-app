import Sidebar from '@/app/(main)/workspace/[workspaceid]/_components/sidebar'
import HeaderBar from '@/app/(main)/workspace/[workspaceid]/_components/headerbar'
import { Toaster } from '@/components/ui/toaster'
import ModalProvider from '@/providers/modal-provider'
import { Provider } from 'react-redux'
import { ClerkProvider } from '@clerk/nextjs'

type Props = {
    children: React.ReactNode
    params: {
        workspaceId: string
        userId: string
        spaceId: string
    }
}

const MainLayout = ({ children, params }: Props) => {
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
            <main className="flex overflow-hidden h-screen min-h-[100dvh] p-1">
                <Sidebar />
                <aside className="w-full CardStyle rounded-2xl">
                    <HeaderBar />
                        {children}
                </aside>
            </main>
        </ClerkProvider>
    )
}

export default MainLayout
