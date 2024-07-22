import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import React from 'react'
interface PostDetailsProps {
    params: {
        id: string
    }
}
const PostDetails = async ({ params }: PostDetailsProps) => {
    const post = await prisma.post.findUnique({
        where: {
            id: params.id,
        }
    })
    if (!post) {
        return notFound()
    }
    return (
        <div>
            <div>
                {post.title}
            </div>
            <div>
                {post.content}
            </div>
            <div>
                {post.authorId}
            </div>
            <div>
                {post.published}
            </div>
            <div>
                {post.id}
            </div>
        </div>
    )
}

export default PostDetails