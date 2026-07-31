import Link from "next/link";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { PrismaClient } from '@prisma/client';
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await prisma.blogPost.findUnique({
    where: { slug }
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <>
      <PublicNavbar />
      <main className="w-full flex-grow bg-surface pb-24">
        {/* Article Header */}
        <section className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop pt-16 pb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:underline mb-8">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Volver al Blog
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            {post.category && (
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-label-md text-[12px]">
                {post.category}
              </span>
            )}
            <span className="font-label-md text-[12px] text-on-surface-variant">
              {new Date(post.createdAt).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg text-on-surface mb-6">
            {post.title}
          </h1>

          {post.summary && (
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {post.summary}
            </p>
          )}
        </section>

        {/* Featured Image */}
        {post.mainImage && (
          <section className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop mb-12">
            <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden ambient-shadow">
              <img 
                src={post.mainImage} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop prose prose-lg prose-headings:font-headline-md prose-headings:text-on-surface prose-p:font-body-md prose-p:text-on-surface-variant prose-a:text-primary hover:prose-a:text-surface-tint">
          {/* We use a simple whitespace pre-wrap for plain text if they didn't use HTML, or dangerouslySetInnerHTML if we expect HTML. Assuming they might type markdown but we don't have a parser, we'll just render it as white-space: pre-wrap for now. */}
          <div className="whitespace-pre-wrap font-body-md text-on-surface-variant leading-relaxed text-[17px]">
            {post.content}
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
export const dynamic = 'force-dynamic';
