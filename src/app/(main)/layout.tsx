import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import ModalProvider from '@/providers/modal-provider'
import { Toaster as ToasterSonner } from '@/components/ui/sonner'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
                <ModalProvider>
                    {children}
                    <ToasterSonner position="top-center" />
                    <Toaster />
                </ModalProvider>
    )
}

export default Layout
