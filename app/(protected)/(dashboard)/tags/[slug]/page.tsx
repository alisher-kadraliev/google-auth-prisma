import db from '@/lib/db'
import { notFound } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { ContentLayout } from '@/components/admin-panel/content-layout'
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
  const tag = await db.tag.findUnique({
    where: {
      slug: params.slug
    }
  })

  if (!tag) {
    return notFound();
  }
  return (
    <ContentLayout>
      <Card className="rounded-lg border-none mt-6">
        <CardContent>
          <h2>{tag.title} </h2>
          <Image src={tag.image || ''} alt="tags" width={300} height={300} />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}

export default Blog