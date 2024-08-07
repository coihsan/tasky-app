'use client'

import React, { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Textarea } from '../ui/textarea'
import { NewSpaceSchema } from '@/lib/schema'
import { useRouter } from 'next/navigation'
import { useModal } from '@/providers/modal-provider'
import Loading from '../global/loading'
import { useToast } from '../ui/use-toast'
import { FluentAdd24Filled } from '../icons/add-24-filled'
import { createNewSpace } from '@/app/(main)/workspace/[workspaceid]/_action/space-action'

type FormValues = z.infer<typeof NewSpaceSchema>

interface NewSpaceProps {
    workspaceId: string
}

const NewSpaceForm = ({ workspaceId }: NewSpaceProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()
    const { setClose } = useModal()

    const form = useForm<FormValues>({
        mode: 'onChange',
        resolver: zodResolver(NewSpaceSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    })

    const onSubmit = async (values: FormValues) => {
        try {
            const response = await createNewSpace(
                values.name,
                values.description,
                workspaceId
            )
            const spaceId = response?.workspaceId as string
            startTransition(() => {
                if (response) {
                    toast({
                        title: 'Space Created',
                        description: 'Space created successfully',
                    })
                    setClose()
                    router.push(`/workspaces/${workspaceId}/spaces/${spaceId}`)
                }
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to create space',
            })
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button size={'icon'} variant={'ghost'}>
                        <FluentAdd24Filled className="size-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="CardStyle">
                    <DialogHeader>
                        <DialogTitle>New Space</DialogTitle>
                        <DialogDescription>
                            Create a new Space
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            className="space-y-4"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Space Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Description{' '}
                                            <span className="text-xs italic text-muted-foreground">
                                                (optional)
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                value={field.value.toLowerCase()}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="flex items-center justify-center gap-2"
                                disabled={isPending}
                                variant={'default'}
                                type="submit"
                            >
                                {isPending ? (
                                    <>
                                        <Loading /> Creating...
                                    </>
                                ) : (
                                    'Create'
                                )}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default NewSpaceForm
