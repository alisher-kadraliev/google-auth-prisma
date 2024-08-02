import { Button } from '@/components/ui/button'
import React from 'react'
import { DataTable } from './data-table'
import { columns } from './column'
import db from '@/lib/db'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card";
import { ContentLayout } from '@/components/admin-panel/content-layout'

const BlogsPage = async () => {
    const data = await db.category.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return (
        <ContentLayout>
            <Card className="rounded-lg border-none mt-6">
                <CardContent>
                    {data.length > 0 ? (
                        <DataTable columns={columns} data={data} />
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-1 text-center">
                            <h3 className="text-3xl mb-3 font-bold tracking-tight">
                                You have no category
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                You can add a new category by clicking the button below
                            </p>
                            <Link href={'/blogs/create'}>
                                <Button className="mt-4">Add category</Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default BlogsPage