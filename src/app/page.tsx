import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { archivo } from "@/lib/fonts";
import { coreFeature } from "@/lib/const";
import GradientHero from "@/components/design/gradientHero";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Navigation from "@/components/site/navigation";
import FooterSite from "@/components/site/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FluentArrowUpRight24Filled } from "@/components/icons/arrow-up-right";

const Section = ({ children }: { children: React.ReactNode }) => {
  return <section className="container py-12">{children}</section>;
};
export default function Home() {
  return (
    <section className="relative">
      <Navigation />
      <GradientHero />
      <main className="container mx-auto">
        <div className="absolute inset-0 h-full w-full items-center px-5 py-24 -z-50 dark:bg-radial-gradient" />
        <section className="flex flex-col items-center justify-center pb-12 pt-12 md:pt-16 lg:pt-20 mx-auto">
          <div className="max-w-screen-md">
            <h1
              className={`${archivo} font-bold text-4xl md:text-6xl lg:text-6xl text-center pb-6`}
            >
              It's a Primitive Task Management{" "}
              <span className="text-lime-500">App</span>
            </h1>
            <p className="text-center text-zinc-400 mx-auto">
              A Task manager for personal or organization, this is not just
              Agile-Method. With Primitive App, you can add some feature what
              you like.
            </p>
            <div className="grid w-full md:flex items-center gap-3 justify-center mt-6">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
              >
                <span>Free! Get Started</span>
              </HoverBorderGradient>
              <Button
                className="rounded-full flex items-center gap-2"
                variant={"link"}
              >
                <Link href={"/how"}>How it's works</Link>
                <FluentArrowUpRight24Filled />
              </Button>
            </div>
          </div>
          <Image
            className="rounded-lg border border-white/20 mt-9 shadow-xl"
            src={"/preview.webp"}
            width={1000}
            height={700}
            alt="preview"
            priority
          />
        </section>
        <Section>
          <h1 className="text-center text-4xl font-semibold pb-6">
            Some Features You Don’t Care About It
          </h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[950px] mx-auto">
            {coreFeature.map((feature) => (
              <Card key={feature.id} className="p-4 CardStyle drop-shadow-xl">
                <CardHeader className="flex items-center flex-col gap-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl borderStyle bg-gradient-to-b from-onyx-50 to-onyx-200 dark:from-onyx-600 dark:to-onyx-800 shadow-2xl">
                    <feature.icon />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardDescription className="text-center text-onyx-500">
                  {feature.description}
                </CardDescription>
              </Card>
            ))}
          </ul>
        </Section>
      </main>
      <FooterSite />
    </section>
  );
}
