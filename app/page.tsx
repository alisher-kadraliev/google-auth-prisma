import { createPost } from "@/actions/Post";
import { auth, signIn, signOut } from "@/auth"
import prisma from "@/lib/db";
import Link from "next/link";
import Hero from "./(Front)/home/hero";
import { SessionProvider } from "next-auth/react";


export default async function Home() {
  const session = await auth()

  return (
      <main>
        <Hero />
      </main>
  );
}
