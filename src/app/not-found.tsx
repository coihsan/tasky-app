import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-onyx-950 text-white w-full h-screen flex flex-col justify-center items-center">
      <span className="font-bold text-4xl mb-4">404</span>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="mt-6">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
