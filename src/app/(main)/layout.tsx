import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import ModalProvider from '@/providers/modal-provider'
import { Toaster as ToasterSonner } from '@/components/ui/sonner'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
                <ModalProvider>
                    {children}
                    <ToasterSonner position="top-center" />
                    <Toaster />
                </ModalProvider>
        </ClerkProvider>
    )
}

export default Layout
