'use server'

import { Role, User, UserWorkspace } from '@prisma/client'
import { db } from '../db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { v4 } from 'uuid'
import { clerkClient } from '@clerk/nextjs/server'
import { Space, Workspace } from '@prisma/client'
import { workspaceTypes } from '../types/db.types'

// INVITATION
export const verifyAndAcceptInvitation = async () => {
    const user = await currentUser()

    if (!user) return redirect('/sign-in')
    const invitationExists = await db.invitation.findUnique({
        where: {
            email: user.emailAddresses[0].emailAddress,
            workspaceId: user.id,
        },
    })
}

// UPDATE USER INFORMATION

export const updateUser = async (user: Partial<User>) => {
    const response = await db.user.update({
        where: { email_user: user.email_user },
        data: { ...user },
    })

    return response
}

// Check user if logged in or not, and create new user if not logged in

export const checkUser = async () => {
    const user = await currentUser()

    if (!user) {
        return null
        console.error('User not found!')
    }
    const loggedInUser = await db.user.findUnique({
        where: {
            email_user: user.emailAddresses[0].emailAddress,
        },
    })
    if (loggedInUser) {
        return loggedInUser
    }
    const createUser = await db.user.create({
        data: {
            clerkId: user.id,
            full_name: user.fullName as string,
            username: user.username as string,
            email_user: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl,
        },
    })
    return createUser
}

// GET USER INFORMATION

export const getAuthUserDetails = async () => {
    const user = await currentUser()
    if (!user) {
        return null
    }
    const userDetails = await db.user.findUnique({
        where: {
            email_user: user.emailAddresses[0].emailAddress,
        },
        include: {
            user_workspace: {
                include: {
                    workspace: {
                        include: {
                            space: true,
                        },
                    },
                },
            },
            permissions: true,
        },
    })
    return userDetails
}

// Init User with Role

export const initUser = async (newUser: Partial<User>) => {
    const user = await currentUser()
    if (!user) return

    const userData = await db.user.upsert({
        where: {
            email_user: user.emailAddresses[0].emailAddress,
        },
        update: newUser,
        create: {
            id: user.id,
            imageUrl: user.imageUrl,
            full_name: user.fullName as string,
            username: user.username as string,
            email_user: user.emailAddresses[0].emailAddress,
            role: newUser.role || 'CREATOR' || 'ADMIN',
            clerkId: user.id,
        },
    })
    await clerkClient.users.updateUserMetadata(user.id, {
        privateMetadata: {
            Role: userData.role || 'CREATOR' || 'ADMIN',
        },
    })
    return userData
}

// Delete User Account

export const deleteUser = async (userId: string) => {
    await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
            role: undefined,
        },
    })
    const deletedUser = await db.user.delete({
        where: { id: userId },
    })

    return deletedUser
}

// Create a new workspace



