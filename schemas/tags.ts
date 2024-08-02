import * as z from 'zod';

export const CreateTagsSchema = z.object({
    title: z.string().min(1),
    slug: z.string().nullable(),
    image: z.string().nullable(),
    imageAlt: z.string().nullable(),
});
