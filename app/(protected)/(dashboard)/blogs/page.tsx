import { Button } from '@/components/ui/button'
import React from 'react'
import { DataTable } from './data-table'
import { columns } from './column'
import db from '@/lib/db'

const BlogsPage = async () => {
    const data = await db.post.findMany();
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