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
import { PlusIcon } from '@radix-ui/react-icons'
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
import { NewWorkspaceSchema } from '@/lib/schema'
import { createNewWorkspace } from '@/lib/queries'
import { redirect, useRouter } from 'next/navigation'
import { useModal } from '@/providers/modal-provider'
import Loading from '../global/loading'
import Uploader from './Uploader'
import { useToast } from '../ui/use-toast'
import { v4 } from 'uuid'
import { User } from '@prisma/client'

type FormValues = z.infer<typeof NewWorkspaceSchema>;

const NewWorkspaceForm = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const { setClose } = useModal();

    const form = useForm<FormValues>({
        mode: 'onChange',
        resolver: zodResolver(NewWorkspaceSchema),
        defaultValues: {
            name: '',
            workspace_logo: '',
            description: '',
        },
    })

    const onSubmit = async (values: FormValues) => {
        try {
            const workspace = await createNewWorkspace({
                name: values.name,
                description: values?.description,
                workspace_logo: values?.workspace_logo,
            })
            startTransition(() => {
                if (workspace) {
                    toast({
                        title: 'Workspace created',
                        description: 'Workspace created successfully',
                    })
                }
            })
            if (isPending) {
                router.push(`/app/workspace/${workspace.id}`)
                setClose()
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create workspace",
              });
        }
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="flex items-center gap-2 w-full"
                        variant={'default'}
                    >
                        <PlusIcon className="w-4 h-4" />
                        Add
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] CardStyle">
                    <DialogHeader>
                        <DialogTitle>New Workspace</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            className="space-y-4"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name="workspace_logo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Logo</FormLabel>
                                        <FormControl>
                                            <Uploader defaultValue={''} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Workspace Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                id="name"
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
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                disabled={isPending}
                                                placeholder="Type your description here."
                                                {...field}
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
export default NewWorkspaceForm
