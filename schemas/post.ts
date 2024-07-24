import * as z from 'zod';

export const CreatePostSchema = z.object({
    title: z.string().min(1),
    content: z.string(),
    published: z.boolean(),
    likes: z.number().optional(),
    readingTime: z.number().optional(),
    image: z.string().nullable(),
    imageAlt: z.string().nullable(),
    status: z.string().nullable(),
    watched: z.number().optional(),
    slug: z.string().nullable(),
});