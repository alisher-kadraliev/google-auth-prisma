"use client"
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateCategorySchema } from '@/schemas/category'
import { Button } from "@/components/ui/button"
import * as z from 'zod'
import { Loader2, ChevronLeft } from "lucide-react"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"
import {
    Form,
    FormControl, FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import {
    Card,
    CardContent, CardHeader,
    CardTitle
} from "@/components/ui/card"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createCategory } from '@/actions/category'
import { UploadButton } from "@/utils/uploadthing"



const Create = () => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const router = useRouter()

    const form = useForm<z.infer<typeof CreateCategorySchema>>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
            title: "",
            image: "",
            imageAlt: "",
            slug: ""

        }
    })

    const [isLoading, setIsLoading] = useState(false)
    const { title, slug } = form.watch();

    const onSubmit = async (values: z.infer<typeof CreateCategorySchema>) => {
        setIsLoading(true)
        toast.promise(
            createCategory(values),
            {
                loading: 'Scanning memories🧐',
                success: (res) => <b>{res?.success} </b>,
                error: (res) => <b>{res.error} </b>,
            }
        ).then(res => {
            setIsLoading(false)
            if (res?.success) {
                router.push("/categories")
            }
        }).catch(() => {
            setIsLoading(false)
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

    return (
        <div
            className="h-full rounded-lg pb-6 border-2 shadow-sm bg-slate-50 dark:bg-slate-900"
        >
            <div className="flex flex-col gap-1 relative">
                <div className='bg-black shadow-md rounded-xl z-50 w-full flex justify-between items-center p-3 sticky top-0 mb-4'>
                    <Link href="/categories" >
                        <Button variant="outline" size="icon">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div className='text-white font-bold text-center text-2xl'>{title}</div>
                    <div className='flex gap-4 justify-center items-center'>
                        <div className='flex gap-3 justify-center items-center'>
                            <div className='w-2 h-2 bg-green-500 rounded-full '></div>
                            <div className='text-white'>
                                in progess
                            </div>
                        </div>
                        <Button type='submit' onClick={form.handleSubmit(onSubmit)} disabled={isLoading} className='bg-white text-black hover:bg-white/80 disabled:opacity-1' variant={'default'}>
                            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : <>Submit</>}
                        </Button>
                    </div>
                </div>
                <div className={`flex flex-col gap-10 px-7 max-lg:px-2 ${isLoading ? 'blur-sm' : ''}`}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10 px-0'>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>

                                </CardHeader>
                                <CardContent>
                                    <div className='grid-cols-2 max-lg:grid-cols-1 grid justify-center mx-auto gap-4'>
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={isLoading}  {...field} placeholder='Write your post title' type='text' />
                                                    </FormControl>
                                                    <FormMessage className='bg-destructive/15 text-destructive py-1 px-2 rounded-lg dark:text-red-500 dark:bg-none' />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="slug"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Slug</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={isLoading}  {...field} placeholder='slug' type='text' />
                                                    </FormControl>
                                                    <FormMessage className='bg-destructive/15 text-destructive py-1 px-2 rounded-lg dark:text-red-500 dark:bg-none' />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Medya</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid-cols-2 grid justify-center items-start gap-4'>
                                        <div
                                            className='bg-black text-white'
                                            data-ut-element="button"
                                        >
                                            <UploadButton
                                                className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => {
                                                    console.log("Files: ", res);
                                                    setImageUrl(res[0].url)
                                                    form.setValue('image', res[0].url)
                                                    alert("Upload Completed");
                                                }}
                                                onUploadError={(error: Error) => {
                                                    alert(`ERROR! ${error.message}`);
                                                }}
                                            />
                                            {imageUrl.length ? <div>
                                                <Image src={imageUrl} className='w-auto h-auto' alt='image' width={300} height={300} />
                                            </div> : "no image"}

                                        </div>
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="imageAlt"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>image alt metin</FormLabel>
                                                        <FormControl>
                                                            <Input disabled={isLoading} {...field} placeholder='Image alt' type='text' value={field.value || ''} />
                                                        </FormControl>
                                                        <FormMessage className='bg-destructive/15 text-destructive py-1 px-2 rounded-lg dark:text-red-500 dark:bg-none' />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
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