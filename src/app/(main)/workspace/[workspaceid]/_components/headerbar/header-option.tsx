'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FluentAdd24Filled } from '@/components/icons/add-24-filled'
import { workspaceMenu } from '@/lib/const'

const HeaderOption = () => {
    const pathname = usePathname()
    
    return (
        <div className="flex items-center space-x-2">
            <div className="flex items-center">
                <Image
                    className="rounded-md"
                    src={'/avatar/avatar2.png'}
                    width={36}
                    height={36}
                    alt={'avatar'}
                />
                <div className="ml-3">
                    <h1 className="text-sm font-semibold">Space Name</h1>
                </div>
            </div>
            <Separator orientation="vertical" />
            <div className="flex items-center space-x-2">
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button size={'icon'} variant={'outline'}>
                                        <FluentAdd24Filled />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="CardStyle">
                                    {workspaceMenu.map((item, index) => (
                                        <DropdownMenuItem key={index}>
                                            <span>{item.title}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Create new ...</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

export default HeaderOption
