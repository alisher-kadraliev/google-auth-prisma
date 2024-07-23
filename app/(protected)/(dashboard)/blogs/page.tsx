import { Button } from '@/components/ui/button'
import React from 'react'
import { DataTable } from './data-table'
import { Blogs, columns } from './column'
import db from '@/lib/db'

export async function getData(): Promise<Blogs[]> {
    const data = await db.post.findMany()
    return data
}
const BlogsPage = async () => {
    const posts = await getData()
    const data = posts.map((item) => { return { ...item, title: item.title, published: item.published } });
    return (
        <div
            className="flex h-full justify-center rounded-lg border-2 p-6 shadow-sm"
        >
            {data.length > 0 ? (
                <DataTable columns={columns} data={data} />
            ) : (
                <div className="flex flex-col justify-center items-center gap-1 text-center">
                    <h3 className="text-3xl mb-3 font-bold tracking-tight">
                        You have no posts
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        You can add a new post by clicking the button below
                    </p>
                    <Button className="mt-4">Add Product</Button>
                </div>
            )}
        </div>
    )
}

export default BlogsPage