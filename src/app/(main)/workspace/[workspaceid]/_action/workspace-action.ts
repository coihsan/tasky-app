"use server"

import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { User } from "@prisma/client"

export const createNewWorkspace = async ({
    name,
    description,
    workspace_logo,
}: {
    name: string
    description: string
    workspace_logo: string
}) => {
    const user = await currentUser()
    const response = await db.workspace.create({
        data: {
            name: name,
            description,
            workspace_logo: workspace_logo,
            user_workspace: {
                create: {
                    user: {
                        connect: {
                            email_user: user?.emailAddresses[0].emailAddress,
                        },
                    },
                },
            },
        },
    })
    return response
}

// Get user permissions

export const getUserPermissions = async (userId: Partial<User>) => {
    const response = await db.user.findUnique({
        where: { email_user: userId.email_user },
        include: {
            permissions: {
                include: {
                    workspace: true,
                    space: {
                        include: {
                            workspace: true,
                        },
                    },
                },
            },
        },
    })
    return response
}

// Get workspace by ID

export const getAllWorkspaceByID = async (workspaceId: string) => {
    const user = await currentUser()
    if (!user) return null

    const workspaceDetails = await db.workspace.findUnique({
        where: {
            id: workspaceId,
        },
        include: {
            space: true,
        },
    })
    return workspaceDetails
}

// CREATE WORKSPACE TEAM

export const createWorkspaceTeam = async (workspaceId: string, user: User) => {
    if (user.role === 'CREATOR') return null
    const response = await db.user.create({
        data: {
            ...user,
        },
    })
    return response
}