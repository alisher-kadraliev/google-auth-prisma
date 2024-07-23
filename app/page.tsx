import { createPost } from "@/actions/Post";
import { auth, signIn, signOut } from "@/auth"
import prisma from "@/lib/db";
import Link from "next/link";
export default async function Home() {
  const session = await auth()

  return (
    <main>
      <div>
      
     

      </div>
    </main>
  );
}
