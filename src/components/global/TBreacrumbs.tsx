"use client";
import React from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const TBreadcrumbs = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/app">App</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathNames.map((link, index) => {
            let href = `${pathNames.slice(0, index + 1).join("/")}`;
            let itemLink = link[0].toUpperCase() + link.slice(1, link.length);
            return (
              <React.Fragment key={index}>
                {index === 0 && (
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={href}>{itemLink}</Link>
                    </BreadcrumbLink>
                    {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                )}
                {index === 1 && (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{itemLink}</BreadcrumbPage>
                    {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
export default TBreadcrumbs;
