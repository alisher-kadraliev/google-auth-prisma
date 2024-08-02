import db from '@/lib/db'
import { notFound } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { ContentLayout } from '@/components/admin-panel/content-layout'
import Tiptap from '@/components/Tiptap'
import Image from 'next/image'

type BlogPageProps = {
  params: {
    slug: string
  }
}
const Blog = async ({ params }: BlogPageProps) => {
  const post = await db.post.findUnique({
    where: {
      slug: params.slug
    }
  })
  const category = await db.category.findUnique({
    where: {
      id: post?.categoryId ?? undefined
    }
  })
  if (!post) {
    return notFound();
  }
  return (
    <ContentLayout>
      <Card className="rounded-lg border-none mt-6">
        <CardContent>
          <h2>{post.slug} </h2>
          <Image src={post.image || 'no'} alt="test" width={500} height={500} className='w-auto h-auto' />
          <Tiptap editable={false} initialContent={JSON.parse(post.content)} />
          <h2>{category?.title} </h2>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}

export default Blog