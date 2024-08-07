import { Prisma } from '@prisma/client'

export interface UserDataTypes {
  userId: string;
  username: string;
  createdAt: Date | undefined;
  clerkId: string;
  password?: string;
  bio?: string;
  fullName?: string;
  imageUrl?: string;
  emailUser?: string;
};

export interface SpaceDataTypes {
  id: string;
  name: string ;
  description: string | null;
  created_at: Date; 
  updated_at: Date;
}

export interface workspaceTypes {
  id: string;
  name: string;
  description: string | null;
  status: string | null;
  workspace_logo: string | null;
  created_at: Date;
  updated_at: Date;
}
