"use client"
import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUserDetails } from "@/lib/queries/use-swr";
import UserDetails from "@/components/form/user-details";

const ProfilePage = () => {
  const { user } = useUserDetails()
  if (!user) return redirect('/sign-in');

  return (
    <main className="p-4">
      <p className="text-lg font-semibold">Public profile</p>
        <h2 className="text-3xl font-bold">{user?.full_name} </h2>
        <p>{user?.username}</p>
        <div className="py-6 flex items-center"></div>
        <Image
          className="rounded-full aspect-square border w-max"
          src={`${user?.imageUrl}`}
          width={200}
          height={200}
          alt={`${user?.full_name}`}
          />
          <div className="flex flex-col rounded-lg border border-destructive bg-destructive/10 gap-4 p-4 mt-4">
              <div className="text-destructive">Danger Zone</div>
            <div className="text-muted-foreground">
              Deleting your account will permanently remove your account and all
              data associated with it. This action cannot be undone. Please be certain.
            </div>
            <Button variant={'destructive'}>Delete</Button>
          </div>
          <UserDetails />
    </main>
  );
};

export default ProfilePage;
