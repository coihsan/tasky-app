-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CREATOR', 'USER', 'ADMIN', 'VIEW');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'INPROGRESS', 'COMPLETED', 'ARCHIVE');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('ACCEPTED', 'REVOKED', 'PENDING');

-- CreateEnum
CREATE TYPE "Icon" AS ENUM ('ADD', 'EDIT', 'DELETE', 'Briefcase');

-- CreateTable
CREATE TABLE "Board" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "spaceId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Column" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "position" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "columnId" TEXT NOT NULL,
    "is_complete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubTask" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT[],
    "is_complete" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'INPROGRESS',
    "cardId" TEXT NOT NULL,

    CONSTRAINT "SubTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "color" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funnel" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "steps" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "spaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Funnel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Memos" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "spaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Memos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Space" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" "TaskStatus",
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaceTeams" (
    "spaceId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "SpaceTeams_pkey" PRIMARY KEY ("spaceId","teamId")
);

-- CreateTable
CREATE TABLE "SpaceHeaderOption" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "link" TEXT NOT NULL DEFAULT '#',
    "icon" "Icon" NOT NULL DEFAULT 'Briefcase',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "spaceId" TEXT NOT NULL,

    CONSTRAINT "SpaceHeaderOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" DEFAULT 'ACTIVE',
    "workspaceId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "position" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTeams" (
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserTeams_pkey" PRIMARY KEY ("userId","teamId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email_user" TEXT NOT NULL,
    "bio" TEXT,
    "preferences" TEXT,
    "password" TEXT,
    "imageUrl" TEXT,
    "phone_number" TEXT DEFAULT '000-0000-0000',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CREATOR',
    "position" TEXT,
    "status_account" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" TEXT NOT NULL,
    "email_user" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "access" BOOLEAN NOT NULL,
    "spaceId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workflows" (
    "id" TEXT NOT NULL,
    "nodes" TEXT,
    "edges" TEXT,
    "name" TEXT NOT NULL,
    "flow_path" TEXT,
    "cron_path" TEXT,
    "publish" BOOLEAN DEFAULT false,
    "spaceId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "workspace_logo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWorkspace" (
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "UserWorkspace_pkey" PRIMARY KEY ("userId","workspaceId")
);

-- CreateTable
CREATE TABLE "_SpaceToTeams" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PermissionsToSpace" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Card_columnId_idx" ON "Card"("columnId");

-- CreateIndex
CREATE INDEX "Tags_cardId_idx" ON "Tags"("cardId");

-- CreateIndex
CREATE INDEX "Funnel_userId_idx" ON "Funnel"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_link_key" ON "Media"("link");

-- CreateIndex
CREATE INDEX "Media_spaceId_idx" ON "Media"("spaceId");

-- CreateIndex
CREATE INDEX "Memos_userId_idx" ON "Memos"("userId");

-- CreateIndex
CREATE INDEX "Notification_userId_workspaceId_spaceId_idx" ON "Notification"("userId", "workspaceId", "spaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_email_key" ON "Invitation"("email");

-- CreateIndex
CREATE INDEX "Invitation_workspaceId_spaceId_idx" ON "Invitation"("workspaceId", "spaceId");

-- CreateIndex
CREATE INDEX "Space_workspaceId_idx" ON "Space"("workspaceId");

-- CreateIndex
CREATE INDEX "SpaceTeams_spaceId_idx" ON "SpaceTeams"("spaceId");

-- CreateIndex
CREATE INDEX "SpaceTeams_teamId_idx" ON "SpaceTeams"("teamId");

-- CreateIndex
CREATE INDEX "SpaceHeaderOption_spaceId_idx" ON "SpaceHeaderOption"("spaceId");

-- CreateIndex
CREATE INDEX "UserTeams_userId_idx" ON "UserTeams"("userId");

-- CreateIndex
CREATE INDEX "UserTeams_teamId_idx" ON "UserTeams"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_user_key" ON "User"("email_user");

-- CreateIndex
CREATE INDEX "User_clerkId_idx" ON "User"("clerkId");

-- CreateIndex
CREATE INDEX "Permissions_spaceId_email_user_idx" ON "Permissions"("spaceId", "email_user");

-- CreateIndex
CREATE INDEX "UserWorkspace_userId_idx" ON "UserWorkspace"("userId");

-- CreateIndex
CREATE INDEX "UserWorkspace_workspaceId_idx" ON "UserWorkspace"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "_SpaceToTeams_AB_unique" ON "_SpaceToTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_SpaceToTeams_B_index" ON "_SpaceToTeams"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionsToSpace_AB_unique" ON "_PermissionsToSpace"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionsToSpace_B_index" ON "_PermissionsToSpace"("B");

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTask" ADD CONSTRAINT "SubTask_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funnel" ADD CONSTRAINT "Funnel_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memos" ADD CONSTRAINT "Memos_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceTeams" ADD CONSTRAINT "SpaceTeams_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceTeams" ADD CONSTRAINT "SpaceTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceHeaderOption" ADD CONSTRAINT "SpaceHeaderOption_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeams" ADD CONSTRAINT "UserTeams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeams" ADD CONSTRAINT "UserTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workflows" ADD CONSTRAINT "Workflows_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkspace" ADD CONSTRAINT "UserWorkspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkspace" ADD CONSTRAINT "UserWorkspace_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpaceToTeams" ADD CONSTRAINT "_SpaceToTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpaceToTeams" ADD CONSTRAINT "_SpaceToTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionsToSpace" ADD CONSTRAINT "_PermissionsToSpace_A_fkey" FOREIGN KEY ("A") REFERENCES "Permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionsToSpace" ADD CONSTRAINT "_PermissionsToSpace_B_fkey" FOREIGN KEY ("B") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;
