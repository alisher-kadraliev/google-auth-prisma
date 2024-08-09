import React from 'react'
import db from '@/lib/db'
import Header from '../../components/header'
import { format } from 'date-fns';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import Image from 'next/image'; import ContentArea from '@/app/(protected)/(dashboard)/blogs/[slug]/contentArea';
import Link from 'next/link';

const PostPage = async ({ params }: { params: any }) => {
    const { slug } = params
    const post = await db.post.findUnique({
        where: {
            slug: slug
        }
    })
    const authorPost = await db.user.findUnique({
        where: {
            id: post?.authorId
        }
    })
    const category = await db.category.findUnique({
        where: {
            id: post?.categoryId ?? undefined
        }
    })
    const formattedDate = post ? format(new Date(post.createdAt), 'MMMM dd, yyyy') : '';

    return (
        <div className="bg-white">
            <Header />
            <div className="relative isolate px-6 pt-16 lg:px-8">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff622d] to-[#ff622d] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>

                <div className="max-w-[1300px] flex flex-col mx-auto mt-10">
                    <div className='flex gap-10'>
                        <div className='flex flex-col justify-center w-1/2'>
                            <div className='flex gap-3'>
                                <Link href="" className='font-bold text-xl'>
                                    {category?.title}
                                </Link>
                                <div>*</div>
                                <div>
                                    {post?.readingTime} min read
                                </div>
                                <div>*</div>
                                <div>
                                    {formattedDate}
                                </div>
                            </div>
                            <div className='py-5'>
                                <h1 className='font-bold text-[3rem] max-lg:text-xl'>{post?.title} </h1>
                            </div>
                            <div className='flex items-center  gap-4'>
                                <div>
                                    {authorPost && <AnimatedTooltip item={authorPost} />}
                                </div>
                                <div className='flex flex-col gap-2 pl-5'>
                                    <div>
                                        <div className="flex flex-col">
                                            {authorPost?.name}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <Image className='border-2 border-black rounded-xl' src={post?.image ?? ""} width={600} height={500} alt={post?.imageAlt || "image alt"} />
                        </div>
                    </div>
                    <div className='mt-16'>
                        <div>
                            
                            <ContentArea dbContent={post?.content} />
                        </div>
                    </div>
                </div>

                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff622d] to-[#ff622d] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    />
                </div>
            </div>
        </div>
    )
}

export default PostPage