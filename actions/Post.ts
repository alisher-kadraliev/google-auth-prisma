"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { PostStatus } from "@prisma/client"
import db from '@/lib/db'
import { CreatePostSchema } from "@/schemas/post"
import * as z from 'zod'


export const getPosts = async () => {
    const posts = await db.post.findMany();
    return posts;
}

const generateUniqueSlug = async (title: string) => {
    let slug = title.toLowerCase().replace(/ /g, "-");
    while (await db.post.findUnique({ where: { slug } })) {
        slug = `${title.toLowerCase().replace(/ /g, "-")}`;
    }
    return slug;
}

export const createPost = async (formData: z.infer<typeof CreatePostSchema>) => {
    const session = await auth()
    if (!session || !session.user) return null;

    const title = formData.title as string;
    const providedSlug = formData.slug as string;
    const content = formData.content as string;
    const published = formData.published === false;
    const likes = formData.likes ? Number(formData.likes) : 0;
    const readingTime = formData.readingTime ? Number(formData.readingTime) : 0;
    const image = formData.image as string | null;
    const imageAlt = formData.imageAlt as string | null;
    const status = formData.status as PostStatus | null;
    const watched = formData.watched ? Number(formData.watched) : 0

    const slug = providedSlug ? await generateUniqueSlug(providedSlug) : await generateUniqueSlug(title);

    try {
        await prisma.post.create({
            data: {
                title,
                content,
                slug,
                published,
                likes,
                readingTime,
                image,
                imageAlt,
                status: status || PostStatus.pending,
                watched,
                authorId: session.user.id || "",
            },
        })
        revalidatePath("/blogs")
        return { success: "Post created successfully" }
    } catch (error: any) {
        return { error: "Error " + error }
    }
}