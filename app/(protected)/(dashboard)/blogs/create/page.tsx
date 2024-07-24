"use client"
import { createPost } from '@/actions/Post'
import { auth } from '@/auth'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreatePostSchema } from '@/schemas/post'
import { Button } from "@/components/ui/button"
import * as z from 'zod'
import { Loader2, ChevronLeft } from "lucide-react"

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
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'
import favicon from '@/app/favicon.ico'

const Create = () => {
    const [isPending, startTransition] = useTransition()
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

    const onSubmit = async (values: z.infer<typeof CreatePostSchema>) => {
        startTransition(async () => {
            const res = await createPost(values)
            if (res?.success) {
                toast.success(res.success, { duration: 5000 });
                router.push("/blogs")
            }
        });

    };

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "title") {
                const slug = value.title?.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "-") || "";
                form.setValue("slug", slug);
            }
        });
        return () => subscription.unsubscribe();
    }, [form.watch, form]);



    const { title, metaTitle, metaDescription, slug } = form.watch();
    return (
        <div
            className="h-full rounded-lg border-2 shadow-sm bg-slate-50 dark:bg-slate-900"
        >
            <div className="flex flex-col gap-1 relative ">

                <div className='bg-black shadow-md rounded-xl w-full flex justify-between items-center p-3 sticky top-0 mb-4'>
                    <Link href="/blogs" >
                        <Button variant="outline" size="icon">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div className='text-white font-bold text-center text-2xl'>{title}</div>
                    <div className='flex gap-4 justify-center items-center'>
                        <div className='flex gap-3 justify-center items-center'>
                            <div className='w-2 h-2 bg-green-500 rounded-full '></div>
                            <div className='text-white'>in progess</div>
                        </div>
                        <Button type='submit' onClick={form.handleSubmit(onSubmit)} disabled={isPending} className='bg-white text-black hover:bg-white/80 disabled:opacity-1' variant={'default'}>
                            {isPending ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait </> : <>Submit</>}
                        </Button>
                    </div>
                </div>
                <div className='flex flex-col gap-10 px-7 max-lg:px-2'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10 px-0'>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid-cols-2 max-lg:grid-cols-1 grid justify-center items-start gap-4'>
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={isPending}  {...field} placeholder='Write your post title' type='text' />
                                                    </FormControl>
                                                    <FormMessage className='bg-destructive/15 text-destructive py-1 px-2 rounded-lg dark:text-red-500 dark:bg-none' />
                                                </FormItem>
                                            )}
                                        />
                                        kategory tags
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Search Engine Optimization (SEO)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid-cols-2 max-lg:grid-cols-1 grid justify-center items-center gap-10'>
                                        <div className='flex flex-col gap-6'>
                                            <FormField
                                                control={form.control}
                                                name="slug"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Slug</FormLabel>
                                                        <FormControl>
                                                            <Input disabled={isPending} {...field} placeholder='Write your post slug' type='text' value={field.value || ''} />
                                                        </FormControl>
                                                        <FormMessage className='bg-destructive/15 text-destructive py-1 px-2 rounded-lg dark:text-red-500 dark:bg-none' />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="metaTitle"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Page Title</FormLabel>
                                                        <FormControl>
                                                            <Input disabled={isPending} {...field} placeholder='type here...' type='text' value={field.value || ''} />
                                                        </FormControl>
                                                        <FormMessage className='bg-destructive/15 text-destructive py-1 px-2 rounded-lg dark:text-red-500 dark:bg-none' />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="metaDescription"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Description</FormLabel>
                                                        <FormControl>
                                                            <Textarea disabled={isPending} {...field} placeholder='type here...' value={field.value || ''} />
                                                        </FormControl>
                                                        <FormMessage className='bg-destructive/15 text-destructive py-1 px-2 rounded-lg dark:text-red-500 dark:bg-none' />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className='flex flex-col text-wrap gap-3 justify-start items-start border bg-slate-100 dark:bg-slate-900 p-4'>
                                            <div className='flex gap-2'>
                                                <Image src={favicon} alt='logo' width={50} height={20} className='rounded-full' />
                                                <div>
                                                    <div className='text-muted-foreground text-lg'>Website Name</div>
                                                    <div className='text-muted-foreground text-sm'> https://tureng.com &gt; {slug}</div>
                                                </div>
                                            </div>
                                            <div className='text-xl font-bold text-blue-400'>{metaTitle}</div>
                                            <div className='text-md'>{metaDescription}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Medya</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid-cols-2 grid justify-center items-start gap-4'>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Post Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid-cols-2 grid justify-center items-start gap-4'>
                                    </div>
                                </CardContent>
                            </Card>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Create