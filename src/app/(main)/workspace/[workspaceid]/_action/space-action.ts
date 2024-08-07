'use server'

import { db } from '@/lib/db'
import { workspaceTypes } from '@/lib/types/db.types'
import { currentUser } from '@clerk/nextjs/server'
import { User } from '@prisma/client'

// Create a new space
export const createNewSpace = async (
    name: string,
    description: string,
    workspaceId: string
) => {
    const user = await currentUser()
    if (!user) return null

    const workspaceUser = await db.userWorkspace.findFirst({
        where: {
            userId: user.id,
            workspaceId: workspaceId,
        },
        include: {
            user: true,
        },
    })

    if (
        workspaceUser?.user.role === 'CREATOR' ||
        workspaceUser?.user.role === 'ADMIN'
    ) {
        const response = await db.space.create({
            data: {
                name,
                description,
                workspace: {
                    connect: {
                        id: workspaceId,
                    },
                },
            },
        })
        return response
    }
    throw new Error('User is not authorized to create space in this workspace')
}

// Get all workspace of user
export const getAllWorkspace = async () => {
    const allworkspace = await db.workspace.findMany()

    return allworkspace.map((list: workspaceTypes) => ({
        id: list.id,
        name: list.name,
        status: list.status,
        workspace_logo: list.workspace_logo,
        createdAt: list.created_at,
        updatedAt: list.updated_at,
    }))
}

// Get all space of user

export const getAllSpace = async (workspaceId: string) => {
    const allspace = await db.space.findMany({
        where: {
            workspace: {
                id: workspaceId,
            },
        },
    })
    return allspace
}

export const getSpaceDataDetails = async (spaceId: string) => {
    const response = await db.space.findUnique({
        where: {
            id: spaceId,
        },
        select: {
            board: true,
            funnel: true,
            workflows: true,
            memos: true,
            media: true,
        },
    })
    return response
}

// CREATE SPACE TEAM

export const createSpaceTeam = async (spaceId: string, user: User) => {
    if (user.role === 'CREATOR' || user.role === 'ADMIN') return null
    const response = await db.user.create({
        data: {
            ...user,
        },
    })
    return response
}