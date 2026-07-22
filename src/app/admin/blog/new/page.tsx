import BlogForm from "@/components/BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Nuevo Artículo</h1>
        <p className="font-body-md text-on-surface-variant">Crea un nuevo artículo para tu blog inmobiliario.</p>
      </div>
      
      <BlogForm />
    </div>
  );
}
