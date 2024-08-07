"use client";
import { useForm } from "react-hook-form";
import React, { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DetailsWorkspaceSchema } from "@/lib/schema";
import { Workspace } from "@prisma/client";
import Loading from "../global/loading";

type WorkspaceDetailsProps = {
  data?: Partial<Workspace>
};

const WorkspaceDetails = ({ data } : WorkspaceDetailsProps) => {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof DetailsWorkspaceSchema>>({
    resolver: zodResolver(DetailsWorkspaceSchema),
    mode: 'onChange',
    defaultValues: {
      name: data?.name,
      workspace_logo: data?.workspace_logo,
      status: data?.status,
      createdAt: data?.created_at,
    }
  })
  return (
    <>
    <Form {...form}>
      <form action="">
        <FormField
          name="name"
          control={form.control}
          render={({field}) =>(
          <FormItem>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" {...field} />
            </FormControl>
          </FormItem>
        )}
        />
        <Button
          type="submit"
          disabled={isPending}
          >
          {isPending ? <Loading /> : 'Save Agency Information'}
        </Button>
      </form>
    </Form>
    </>
  );
};
export default WorkspaceDetails;
