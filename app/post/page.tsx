import { auth } from '@/auth';
import prisma from '@/lib/db';
import Link from 'next/link';
import React from 'react'

const PostPage = async () => {
  const session = await auth()
  const posts = await prisma.post.findMany({
    where: {
      authorId: session?.user?.id
    }
  })
  return (
    <div>
      {posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id} >
          <h1>{post.title}</h1>
        </Link>
      ))
      }
    </div >
  )
}

export default PostPage