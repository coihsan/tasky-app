import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { describe } from 'node:test'
import { z } from 'zod'

export const DetailsUserProfileSchema = z.object({
    email: z.string().email('Required'),
    fullName: z.string().min(1, 'Required'),
    password: z.string().min(1).optional(),
    imageUrl: z.string().default('/avatar/avatar2.png').optional(),
    bio: z.string().optional(),
    username: z.string(),
    createdAt: z.date().optional(),
})

export const DetailsWorkspaceSchema = z.object({
    name: z.string().min(1, 'Required'),
    workspace_logo: z.any().optional(),
    subDomainName: z.string().min(1, 'Required'),
    createdAt: z.date().optional(),
    status: z.string().optional(),
    userId: z.number(),
})

export const NewWorkspaceSchema = z.object({
    name: z.string().min(1, 'Required'),
    workspace_logo: z.any().optional(),
    description: z.string().min(1, 'Required'),
})

export const NewSpaceSchema = z.object({
    name: z.string().min(1, 'Required'),
    description: z.string().min(1, 'Required'),
})

export const NewWorkflowFormSchema = z.object({
    name: z.string().min(1, 'Required'),
    description: z.string().min(1, 'Required'),
})
