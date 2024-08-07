import useSWR from 'swr'
import { getAuthUserDetails } from './index';
import { getAllSpace, getAllWorkspace } from '@/app/(main)/workspace/[workspaceid]/_action/space-action';
import { getAllWorkspaceByID } from '@/app/(main)/workspace/[workspaceid]/_action/workspace-action';

export function useSpaceData(){
  const {data, isLoading, error} = useSWR('spaceID', getAllSpace)
  return {
    space: data,
    isLoading,
    isError: error
  }
}
export function useWorkspaceData(){
  const {data, isLoading, error} = useSWR('worksaceDataID', getAllWorkspace)
  return {
    workspace: data,
    isLoading,
    isError: error
  }
}

export function useWorkspaceByID(){
  const {data, isLoading, error} = useSWR('workspaceID', getAllWorkspaceByID)
  return{
    workspaceData: data?.id,
    isLoading,
    isError: error
  }
}

export function useUserDetails(){
    const { data, isLoading, error } = useSWR('userID', getAuthUserDetails)
    return{
        user: data,
        isLoading,
        isError: error
    }
}