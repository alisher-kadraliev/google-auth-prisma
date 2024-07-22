"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export const createPost = async (formData: FormData) => {
    const session = await auth()
    if (!session || !session.user) return null;
    const title = formData.get("title") as string
    const content = formData.get("content") as string

    await prisma.post.create({
        data: {
            title,
            content,
            authorId: session.user.id || ""
        }
    })
    revalidatePath('/');
}