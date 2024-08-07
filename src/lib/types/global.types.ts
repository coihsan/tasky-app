import { Prisma } from "@prisma/client";

export interface userProps {
  imageUrl: string;
  id: string;
  clerkId: string;
  emailUser: string;
  username: string;
  fullName: string;
  password: string;
  bio: string;
  createdAt: Date;
}

export interface cardType {
  id: number;
  title?: string;
  tags?: string;
  createDate?: Date;
  subtask?: [
    {
      id: number;
      title?: string;
      isComplete?: boolean;
    },
  ];
  member?: string[];
  comment?: boolean;
  attachment?: boolean;
  media?: boolean;
}
export interface navlink {
  id: number;
  title: string;
  url: string;
  icons: any;
}

export type boardProps = {
  status: "Backlogs" | "Inprogress" | "Review" | "Done";
};
export enum status {
  "Backlogs",
  "Inprogress",
  "Review",
  "Done",
}

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

export type AuthUserOrganization =
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientUnknownRequestError;


export interface IndexProps {
    id: number;
    title: string;
    url: string;
    icon: any | JSX.Element;
  }
  
export interface SidebarProps {
    menuName: string;
    index: IndexProps[];
    className: string;
  }
  