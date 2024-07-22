import { createPost } from "@/actions/Post";
import { auth, signIn, signOut } from "@/auth"
import prisma from "@/lib/db";
export default async function Home() {
  const session = await auth()
  if (!session?.user) return null

  return (
    <main>
      <div>
        <form
          action={async () => {
            "use server"
            await signIn("google")
          }}
        >
          <button type="submit">Signin with Google</button>
        </form>
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button type="submit">Out</button>
        </form>
        {session.user.name}
        <form action={createPost}>
          <input name="title" className="border" type="text" />
          <input name="content" className="border" type="text" />
          <button type="submit">Create Post</button>
        </form>

      </div>
    </main>
  );
}
