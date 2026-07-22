"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BlogPost } from "@prisma/client";

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este artículo?")) return;
    
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline-lg text-headline-lg text-primary">Blog</h1>
        <Link 
          href="/admin/blog/new" 
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md hover:bg-surface-tint transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nuevo Artículo
        </Link>
      </div>

      <div className="bg-surface-bright rounded-xl border border-outline-variant/50 overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-on-surface-variant font-body-md">Cargando artículos...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center bg-surface">
            <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[48px] text-primary/40">article</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">No hay artículos publicados</h3>
            <p className="text-on-surface-variant font-body-md max-w-md mb-8">Aún no has creado ningún artículo para tu blog. Comienza a compartir contenido con tus clientes.</p>
            <Link 
              href="/admin/blog/new" 
              className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Crear primer artículo
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant/50">
                  <th className="p-4 font-label-md text-on-surface-variant font-medium">Título</th>
                  <th className="p-4 font-label-md text-on-surface-variant font-medium">Categoría</th>
                  <th className="p-4 font-label-md text-on-surface-variant font-medium">Estado</th>
                  <th className="p-4 font-label-md text-on-surface-variant font-medium">Fecha</th>
                  <th className="p-4 font-label-md text-on-surface-variant font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="p-4 font-body-md text-on-surface">{post.title}</td>
                    <td className="p-4 font-body-md text-on-surface-variant">{post.category || "-"}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-[12px] font-label-md ${post.status === 'PUBLISHED' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-highest text-on-surface'}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4 font-body-md text-on-surface-variant">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          href={`/admin/blog/${post.id}`}
                          className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </Link>
                        <button 
                          onClick={() => deletePost(post.id)}
                          className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-error transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
