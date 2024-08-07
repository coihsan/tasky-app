import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { RoleTeam } from '@/lib/const'
import { FluentHome24Regular } from '@/components/icons/home'
import { Role } from '@prisma/client'

export default function AddTeam() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Invite</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] CardStyle">
                <DialogHeader>
                    <DialogTitle>New Staff</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you
                        {`'`}re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            value="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <Select>
                    <SelectTrigger className="w-[180px] flex items-start [&_[data-description]]:hidden">
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="view">
                            <div className="grid gap-0.5">
                                <h3>View</h3>
                                <p
                                    className="text-xs text-muted-foreground"
                                    data-description
                                >
                                    Only view and comment
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="staff">
                            <div className="grid gap-0.5">
                                <h3>Staff</h3>
                                <p
                                    className="text-xs text-muted-foreground"
                                    data-description
                                >
                                    Can view, comment and edit
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="owner">
                            <div className="grid gap-0.5">
                                <h3>Owner</h3>
                                <p
                                    className="text-xs text-muted-foreground"
                                    data-description
                                >
                                    Admin level access to all resource
                                </p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
