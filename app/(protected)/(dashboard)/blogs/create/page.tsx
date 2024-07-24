"use client"
import { createPost } from '@/actions/Post'
import { auth } from '@/auth'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreatePostSchema } from '@/schemas/post'
import { Button } from "@/components/ui/button"
import * as z from 'zod'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const Create = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const router = useRouter()

    const form = useForm<z.infer<typeof CreatePostSchema>>({
        resolver: zodResolver(CreatePostSchema),
        defaultValues: {
            title: "",
            content: "",
            published: false,
            likes: 0,
            readingTime: 0,
            image: "",
            imageAlt: "",
            status: "",
            watched: 0,
            slug: "",
        }
    })

    const onSubmit = (values: z.infer<typeof CreatePostSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            createPost(values)
                .then((data) => {
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "title") {
                const slug = value.title?.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "-") || "";
                form.setValue("slug", slug);
            }
        });
        return () => subscription.unsubscribe();
    }, [form.watch, form]);

    if (error) {
        toast.error(error)
    }

    if (success) {
        toast.success(success)
        router.push('/blogs')
    }
    return (
        <div
            className="h-full rounded-lg border-2 shadow-sm bg-slate-50"
        >
            <div className="flex flex-col gap-1 relative ">

                <div className='bg-black rounded-xl w-full flex justify-around items-center p-3 sticky top-0 mb-4'>
                    <Link href="/" >Back</Link>
                    <Button type='submit' onClick={form.handleSubmit(onSubmit)} className='ml-auto' variant={'secondary'}>Submit</Button>
                </div>
                <div className='flex flex-col gap-10 px-7'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Title</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form action="" onSubmit={form.handleSubmit(onSubmit)} className='space-y-6  px-6'>
                                    <div className='grid-cols-2 grid justify-center items-center gap-4'>
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className='flex gap-5 items-center'>
                                                        <FormLabel className='mb-4'>Title</FormLabel>  <FormMessage className='bg-destructive/15 text-destructive py-1 px-2 rounded-lg' />
                                                    </div>
                                                    <FormControl>
                                                        <Input disabled={isPending}  {...field} placeholder='Write your post title' type='text' />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="slug"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className='flex gap-5 items-center'>
                                                        <FormLabel className='mb-4'>Slug</FormLabel>
                                                        <FormMessage className='bg-destructive/15 text-destructive p-2 rounded-lg' />
                                                    </div>
                                                    <FormControl>
                                                        <Input disabled={isPending} {...field} placeholder='Write your post slug' type='text' value={field.value || ''} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="image"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className='flex gap-5 items-center'>
                                                        <FormLabel className='mb-4'>Slug</FormLabel>
                                                        <FormMessage className='bg-destructive/15 text-destructive p-2 rounded-lg' />
                                                    </div>
                                                    <FormControl>
                                                        <Input disabled={isPending} {...field} placeholder='Write your post slug' type='text' value={field.value ?? ''} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="likes"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className='flex gap-5 items-center'>
                                                        <FormLabel className='mb-4'>Slug</FormLabel>
                                                        <FormMessage className='bg-destructive/15 text-destructive p-2 rounded-lg' />
                                                    </div>
                                                    <FormControl>
                                                        <Input disabled={isPending} {...field} placeholder='Write your post slug' type='number' />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="readingTime"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className='flex gap-5 items-center'>
                                                        <FormLabel className='mb-4'>Slug</FormLabel>
                                                        <FormMessage className='bg-destructive/15 text-destructive p-2 rounded-lg' />
                                                    </div>
                                                    <FormControl>
                                                        <Input disabled={isPending} {...field} placeholder='Write your post slug' type='number' />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className='flex gap-5 items-center'>
                                                        <FormLabel className='mb-4'>Status</FormLabel>
                                                        <FormMessage className='bg-destructive/15 text-destructive p-2 rounded-lg' />
                                                    </div>
                                                    <FormControl>
                                                        <select
                                                            disabled={isPending}
                                                            {...field}
                                                            className="form-select"
                                                            value={field.value ?? ''}
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="progess">In grogress</option>
                                                            <option value="completed">Completed</option>
                                                        </select>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </form>

                            </Form>
                        </CardContent>
                    </Card>

                </div>

                {/* <form action={createPost} className='flex flex-col'>
                    <input type="text" name='title' className='border' placeholder='title' />
                    <input type="text" name='slug' className='border' placeholder='slug' />
                    <input type="text" name='content' className='border' placeholder='content' />
                    <input type="checkbox" className='border' placeholder='published' name='published' />
                    <input type="number" className='border' placeholder='likes' name='likes' />
                    <input type="number" className='border' placeholder='readingTime' name='readingTime' />
                    <input type="text" className='border' placeholder='image' name='image' />
                    <input type="text" className='border' placeholder='imageAlt' name='imageAlt' />
                    <select className='border' name='status'>
                        <option value='pending'>pending</option>
                        <option value='progress'>in progress</option>
                        <option value='completed'>completed</option>
                    </select>
                    <input type="number" className='border' placeholder='watched' name='watched' />
                    <button type='submit'>submit</button>
                </form> */}

            </div>
        </div>
    )
}

export default Create