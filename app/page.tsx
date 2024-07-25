import { createPost } from "@/actions/Post";
import { auth, signIn, signOut } from "@/auth"
import prisma from "@/lib/db";
import Link from "next/link";


export default function Home() {

  return (
    <main>
      <div>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </main>
  );
}
