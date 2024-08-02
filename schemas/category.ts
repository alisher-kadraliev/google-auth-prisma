import * as z from 'zod';

export const CreateCategorySchema = z.object({
    title: z.string().min(1),
    slug: z.string(),
    image: z.string().nullable(),
    imageAlt: z.string().nullable(),
});

