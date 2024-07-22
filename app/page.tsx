import { createPost } from "@/actions/Post";
import { auth, signIn, signOut } from "@/auth"
import prisma from "@/lib/db";
import Link from "next/link";
export default async function Home() {
  const session = await auth()

  return (
    <main>
      <div>
        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/dashboard" })
          }}
        >
          <button type="submit">Signin with Google</button>
        </form>
        <Link href="/login"></Link>

      </div>
    </main>
  );
}
