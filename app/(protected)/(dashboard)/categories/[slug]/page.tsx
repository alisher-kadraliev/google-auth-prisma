import db from '@/lib/db'
import { notFound } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { ContentLayout } from '@/components/admin-panel/content-layout'
import Tiptap from '@/components/Tiptap'
import Image from 'next/image'

type PageProps = {
  params: {
    id: number
    title: string
    slug: string
    image: string
    imagealt: string
  }
}
const Blog = async ({ params }: PageProps) => {
  const category = await db.category.findUnique({
    where: {
      slug: params.slug
    }
  })

  if (!category) {
    return notFound();
  }
  return (
    <ContentLayout>
      <Card className="rounded-lg border-none mt-6">
        <CardContent>
          <h2>{category.title} </h2>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}

export default Blog