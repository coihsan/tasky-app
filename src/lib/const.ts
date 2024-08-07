import { navlink } from './types/global.types'
import { BoardIcons } from '@/components/icons/board-split'
import CalenderDate from '@/components/icons/calender-date'
import WorkspaceIcons from '@/components/icons/workspace'
import FluentTaskListSquare24Regular from '@/components/icons/task-square'
import FluentDocumentFolder24Regular from '@/components/icons/document-folder'
import FluentPeopleTeam24Regular from '@/components/icons/people-team'
import FluentDataFunnel24Regular from '@/components/icons/data-funnel'
import { WorkflowsIcons } from '@/components/icons/workflows'
import { FluentHome24Regular } from '@/components/icons/home'
import { FluentPerson24Regular } from '@/components/icons/person'
import { FluentSettings24Regular } from '@/components/icons/settings'
import { FluentSignOut24Regular } from '@/components/icons/sign-out'
import { FluentDataUsage24Regular } from '@/components/icons/data-usage'
import { FluentColor24Regular } from '@/components/icons/color-icons'
import { FluentAppFolder24Regular } from '@/components/icons/app-folder-24-regular'
import { FluentBuildingPeople24Regular } from '@/components/icons/building-people-24-regular'

export const RoleTeam = [
    { id: 0, role: 'View', values: 'view', desc: 'Only view and comment' },
    { id: 1, role: 'User', values: 'user', desc: 'Can view, comment and edit' },
    {
        id: 2,
        role: 'Admin',
        values: 'admin',
        desc: 'Admin level access to all resource',
    },
]
export const sitelink = [
    { id: 0, title: 'Home', url: '/' },
    { id: 1, title: 'Demo', url: '/demo' },
    { id: 2, title: 'Support Me', url: '/supportme' },
]
export const menuUser = [
    {
        id: 1,
        title: 'Profile',
        url: '/account/profile',
        icon: FluentPerson24Regular,
    },
    {
        id: 3,
        title: 'Settings',
        url: '/account/profilesettings',
        icon: FluentSettings24Regular,
    },
    {
        id: 2,
        title: 'Sign Out',
        url: '/workspace/sign-out',
        icon: FluentSignOut24Regular,
    },
]
export const sidebar = [
    { id: 1, title: 'View', url: `/workspace/view`, icon: WorkspaceIcons },
    {
        id: 2,
        title: 'Upcomming',
        url: '/workspace/schedule',
        icon: CalenderDate,
    },
    {
        id: 7,
        title: 'Teams',
        url: '/workspace/members',
        icon: FluentPeopleTeam24Regular,
    },
    {
        id: 3,
        title: 'Settings',
        url: '/workspace/settings',
        icon: FluentSettings24Regular,
    },
]
export const sidebaraccountuser = [
    {
        id: 9,
        title: 'Workspace',
        url: '/workspace',
        icon: FluentBuildingPeople24Regular,
    },
    {
        id: 0,
        title: 'Profile',
        url: '/profile',
        icon: FluentPerson24Regular,
    },
    {
        id: 1,
        title: 'Integration',
        url: '/app/integration',
        icon: FluentAppFolder24Regular,
    },
    {
        id: 2,
        title: 'Preferences',
        url: '/app/preferences',
        icon: FluentColor24Regular,
    },
    {
        id: 3,
        title: 'Usage',
        url: '/app/usage',
        icon: FluentDataUsage24Regular,
    },
    {
        id: 4,
        title: 'Settings',
        url: '/app/settings',
        icon: FluentSettings24Regular,
    },
]
export const workspaceMenu = [
    {
        id: 9,
        title: 'Board',
        url: '/workspace/board',
        icon: BoardIcons,
    },
    {
        id: 4,
        title: 'Memos',
        url: '/workspace/memos',
        icon: FluentDocumentFolder24Regular,
    },
    {
        id: 5,
        title: 'Funnel',
        url: '/workspace/funnel',
        icon: FluentDataFunnel24Regular,
    },
    {
        id: 6,
        title: 'Workflows',
        url: '/workspace/workflows',
        icon: WorkflowsIcons,
    },
    {
        id: 8,
        title: 'Todos',
        url: '/workspace/todos',
        icon: FluentTaskListSquare24Regular,
    },
]
export const coreFeature = [
    {
        id: 1,
        title: "Don't Miss Out!",
        description:
            'Emphasize the reminder and notification system of your account, ensuring that users never miss important deadlines or tasks.',
        icon: BoardIcons,
    },
    {
        id: 2,
        title: 'Work Together!',
        description:
            'Highlight the collaboration features of your account, allowing users to share tasks with others, assign tasks to team members, and track progress together.',
        icon: BoardIcons,
    },
    {
        id: 4,
        title: "It's Safe!",
        description:
            'Assure users of the data security and privacy measures implemented in your account, protecting their sensitive information',
        icon: BoardIcons,
    },
]
