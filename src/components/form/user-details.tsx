"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { getAuthUserDetails, initUser, updateUser } from "@/lib/queries";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { DetailsUserProfileSchema } from "@/lib/schema";
import { useState, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/providers/modal-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { z } from "zod";

type Props = {
  userData?: Partial<User>;
  type?: 'workspace' | 'space'
};
const UserDetails = ({userData} : Props) => {
  const [changes, setChanges] = useState(false)
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { setClose } = useModal();

  const form = useForm<z.infer<typeof DetailsUserProfileSchema>>({
    resolver: zodResolver(DetailsUserProfileSchema),
    mode: "onChange",
    defaultValues:{
      fullName: userData?.full_name || undefined,
      username: userData?.username,
      email: userData?.email_user,
      imageUrl: userData?.imageUrl || undefined,
      bio: userData?.bio || undefined,
    }
  })

  const onSubmit = async (values: z.infer<typeof DetailsUserProfileSchema>) => {
    try {
      const updatedUser = await initUser({
        full_name: values.fullName,
        username: values.username,
        email_user: values.email,
        imageUrl: values.imageUrl,
        bio: values.bio,
      })
      startTransition(() => {
        if (updatedUser) {
          toast({
            title: 'Profile Updated',
            description: 'Profile updated successfully',
          });
          setClose();
        }
      });
    } catch (error) {
      
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
          name="imageUrl"
          control={form.control}
          render={({ field }) =>(
            <FormItem>
              <FormControl>
                <FormLabel>Profile Picture</FormLabel>
                <Image src={`imageUrl`} width={100} height={100} alt="Profile Picture" />
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
           />
          <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormLabel>Usernama</FormLabel>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormLabel>E-Mail</FormLabel>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          {changes && <Button>Save</Button>}
          </form>
      </Form>
    </>
  );
};

export default UserDetails;
