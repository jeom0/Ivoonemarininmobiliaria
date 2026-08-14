import BlogForm from "@/components/BlogForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const post = await prisma.blogPost.findUnique({
    where: { id }
  });

  if (!post) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Editar Artículo</h1>
        <p className="font-body-md text-on-surface-variant">Modifica los detalles del artículo.</p>
      </div>
      
      <BlogForm initialData={post} />
    </div>
  );
}
