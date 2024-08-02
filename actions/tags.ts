"use server"
import { auth } from '@/auth'
import db from '@/lib/db'
import { CreateTagsSchema } from '@/schemas/tags'
import { revalidatePath } from 'next/cache'
import * as z from 'zod'

export const tags = async () => {
    const tags = db.tag.findMany()
    return tags
}

export const createTags = async (formData: z.infer<typeof CreateTagsSchema>) => {
    const session = await auth()
    if (!session || !session.user) return null;

    const title = formData.title as string;
    const slug = formData.slug as string;
    const image = formData.image as string | null;
    const imageAlt = formData.imageAlt as string | null

    try {

        const tag = await db.tag.create({
            data: {
                title,
                slug,
                image,
                imageAlt,
            },
        })
        revalidatePath("/categories")

        return { success: `${tag.title} created successfully` }
    } catch (error: any) {
        console.log(error);
        return { error: "Error try again" }
    }
}