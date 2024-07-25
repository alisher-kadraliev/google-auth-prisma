import React from 'react'
import db from '@/lib/db'
import { notFound } from 'next/navigation'
type BlogPageProps = {
  params: {
    slug: string
  }
}
const Blog = async ({ params }: BlogPageProps) => {
  const post = await db.post.findUnique({
    where: {
      slug: params.slug
    }
  })
  const category = await db.category.findUnique({
    where: {
      id: post?.categoryId ?? undefined
    }
  })
  if (!post) {
    return notFound();
  }
  return (
    <div
      className="flex h-full justify-center rounded-lg border-2 p-6 shadow-sm"
    >
      <div className="flex flex-col justify-center items-center gap-1 text-center">
        <h2>{post.slug} </h2>
        <h2>{category?.title} </h2>
      </div>
    </div>
  )
}

export default Blog