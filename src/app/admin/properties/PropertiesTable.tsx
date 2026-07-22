"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Property = {
  id: string;
  title: string;
  city: string;
  propertyType: string;
  modality: string;
  price: number;
  status: string;
  mainImage: string | null;
  isFeatured: boolean;
};

interface PropertiesTableProps {
  initialProperties: Property[];
  totalVisits: number;
}

export default function PropertiesTable({ initialProperties, totalVisits }: PropertiesTableProps) {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [typeFilter, setTypeFilter] = useState("Todos");
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Stats
  const total = properties.length;
  const available = properties.filter(p => p.status === 'DISPONIBLE').length;
  const sold = properties.filter(p => p.status === 'VENDIDO' || p.status === 'ARRENDADO').length;
  const featured = properties.filter(p => p.isFeatured).length;

  // Filters
  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "Todos" || 
                          (statusFilter === "Disponible" && p.status === "DISPONIBLE") ||
                          (statusFilter === "Vendido" && p.status === "VENDIDO") ||
                          (statusFilter === "Arrendado" && p.status === "ARRENDADO");

    const matchesType = typeFilter === "Todos" || p.propertyType.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    // Optimistic UI
    setProperties(prev => prev.map(p => p.id === id ? { ...p, isFeatured: !currentFeatured } : p));
    
    try {
      await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !currentFeatured })
      });
      router.refresh();
    } catch (e) {
      // Revert on error
      setProperties(prev => prev.map(p => p.id === id ? { ...p, isFeatured: currentFeatured } : p));
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este inmueble?")) return;
    
    try {
      await fetch(`/api/properties/${id}`, { method: "DELETE" });
      setProperties(prev => prev.filter(p => p.id !== id));
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Error al eliminar");
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`¿Estás seguro de eliminar ${selectedIds.length} inmuebles seleccionados?`)) return;
    setIsDeleting(true);
    
    try {
      await Promise.all(selectedIds.map(id => fetch(`/api/properties/${id}`, { method: "DELETE" })));
      setProperties(prev => prev.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Error al eliminar los inmuebles");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredProperties.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats / Quick Insights (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant font-label-md text-label-md">Total Inmuebles</span>
            <span className="material-symbols-outlined text-primary-container">home</span>
          </div>
          <span className="text-display-lg font-display-lg text-primary">{total}</span>
          <span className="text-[12px] text-secondary font-medium">En base de datos</span>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant font-label-md text-label-md">Disponibles</span>
            <span className="material-symbols-outlined text-green-700">check_circle</span>
          </div>
          <span className="text-display-lg font-display-lg text-primary">{available}</span>
          <span className="text-[12px] text-on-surface-variant font-medium">{total > 0 ? Math.round((available/total)*100) : 0}% del inventario</span>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant font-label-md text-label-md">Vendidos / Arrendados</span>
            <span className="material-symbols-outlined text-secondary">sell</span>
          </div>
          <span className="text-display-lg font-display-lg text-primary">{sold}</span>
          <span className="text-[12px] text-on-surface-variant font-medium">Histórico anual</span>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant font-label-md text-label-md">Visitas Totales</span>
            <span className="material-symbols-outlined text-tertiary-fixed-dim">event</span>
          </div>
          <span className="text-display-lg font-display-lg text-primary">{totalVisits}</span>
          <span className="text-[12px] text-secondary font-medium">Agendadas en sistema</span>
        </div>
      </section>

      {/* Action Bar */}
      <section className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col md:flex-row items-center gap-gutter">
        <div className="relative flex-1 group w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-body-md transition-all" 
            placeholder="Buscar por código, título o ciudad..." 
            type="text"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container-low border-none rounded-lg py-3 px-4 text-label-md font-label-md text-on-surface-variant min-w-[140px] focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="Todos">Estado: Todos</option>
            <option value="Disponible">Disponible</option>
            <option value="Vendido">Vendido</option>
            <option value="Arrendado">Arrendado</option>
          </select>
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-surface-container-low border-none rounded-lg py-3 px-4 text-label-md font-label-md text-on-surface-variant min-w-[140px] focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="Todos">Tipo: Todos</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Finca">Finca</option>
            <option value="Lote">Lote</option>
            <option value="Local">Local</option>
          </select>
        </div>
      </section>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden relative">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/20">
                <th className="p-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-outline-variant text-primary focus:ring-primary/40 cursor-pointer"
                    onChange={toggleSelectAll}
                    checked={filteredProperties.length > 0 && selectedIds.length === filteredProperties.length}
                  />
                </th>
                <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Imagen</th>
                <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Código</th>
                <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Inmueble</th>
                <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Tipo / Operación</th>
                <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Precio</th>
                <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Estado</th>
                <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px] text-center">Destacado</th>
                <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px] text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredProperties.map(p => (
                <tr key={p.id} className="property-row transition-colors group hover:bg-surface-container-low">
                  <td className="p-4 text-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-outline-variant text-primary focus:ring-primary/40 cursor-pointer"
                      checked={selectedIds.includes(p.id)}
                      onChange={() => toggleSelect(p.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="w-16 h-12 rounded-lg overflow-hidden shadow-sm">
                      <img 
                        className="w-full h-full object-cover" 
                        alt={p.title} 
                        src={p.mainImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"}
                      />
                    </div>
                  </td>
                  <td className="p-4 font-label-md text-on-surface-variant">IM-{p.id.substring(0, 4).toUpperCase()}</td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <Link href={`/propiedades/${p.id}`} className="font-body-md font-bold text-on-surface group-hover:text-primary transition-colors hover:underline">
                        {p.title}
                      </Link>
                      <span className="text-[12px] text-on-surface-variant">{p.city}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-body-md">{p.propertyType}</span>
                      <span className="text-[12px] text-secondary-fixed-variant font-medium capitalize">{p.modality.toLowerCase()}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-on-surface">${p.price.toLocaleString('es-CO')}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${p.status === 'DISPONIBLE' ? 'bg-green-100 text-green-800' : p.status === 'VENDIDO' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleToggleFeatured(p.id, p.isFeatured)}
                      className={`w-10 h-6 rounded-full relative inline-flex items-center px-1 transition-all ${p.isFeatured ? 'bg-primary' : 'bg-surface-container-highest'}`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full transition-transform ${p.isFeatured ? 'translate-x-4' : 'translate-x-0'}`}></span>
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/propiedades/${p.id}`} className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-all" title="Ver Público">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </Link>
                      <Link href={`/admin/properties/${p.id}/edit`} className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-all" title="Editar">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </Link>
                      <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-error-container/20 rounded-lg text-error transition-all" title="Eliminar">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProperties.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-0">
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-surface">
                      <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-[48px] text-primary/40">home_work</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-primary mb-2">
                        {properties.length === 0 ? 'No hay inmuebles publicados' : 'No se encontraron resultados'}
                      </h3>
                      <p className="text-on-surface-variant font-body-md max-w-md mb-8">
                        {properties.length === 0 
                          ? 'Comienza a construir tu catálogo inmobiliario. Registra tu primera propiedad para mostrarla a tus clientes.' 
                          : 'Intenta cambiar los filtros de búsqueda o el tipo de operación.'}
                      </p>
                      {properties.length === 0 && (
                        <Link 
                          href="/admin/properties/new" 
                          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[20px]">add_home</span>
                          Crear primer inmueble
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between bg-surface-container-low/50 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-on-surface-variant">Mostrando {filteredProperties.length} resultados</span>
          </div>
        </div>

        {/* Bulk Actions Floating Bar */}
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-8 py-4 rounded-full shadow-xl flex items-center gap-8 z-50 transform transition-transform duration-300 ${selectedIds.length > 0 ? 'translate-y-0' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
          <span className="font-label-md"><span>{selectedIds.length}</span> inmuebles seleccionados</span>
          <div className="h-6 w-[1px] bg-outline-variant/30"></div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBulkDelete} 
              disabled={isDeleting}
              className="flex items-center gap-2 hover:text-error transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
              <span className="text-label-md">{isDeleting ? "Eliminando..." : "Eliminar"}</span>
            </button>
          </div>
          <button className="p-1 hover:bg-white/10 rounded-full" onClick={() => setSelectedIds([])}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
