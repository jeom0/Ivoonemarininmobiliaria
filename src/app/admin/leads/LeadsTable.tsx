"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  type: string;
  status: string;
  propertyId: string | null;
  avatar: string | null;
  createdAt: string; // ISO string
};

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-tertiary-container text-on-tertiary",
  CONTACTED: "bg-surface-container-high text-on-surface",
  NEGOTIATING: "bg-secondary-container text-on-secondary-container",
  CLOSED: "bg-outline-variant/30 text-on-surface-variant",
};

const STATUS_LABELS: Record<string, string> = {
  NEW: "Nuevo",
  CONTACTED: "Contactado",
  NEGOTIATING: "En Negociación",
  CLOSED: "Cerrado",
};

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `Hace ${mins} minuto${mins !== 1 ? "s" : ""}`;
  if (hours < 24) return `Hace ${hours} hora${hours !== 1 ? "s" : ""}`;
  if (days < 7) return `Hace ${days} día${days !== 1 ? "s" : ""}`;
  return new Date(isoDate).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });
}

interface LeadsTableProps {
  initialLeads: Lead[];
}

const PAGE_SIZE = 10;

export default function LeadsTable({ initialLeads }: LeadsTableProps) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [newLeadData, setNewLeadData] = useState({ name: '', email: '', phone: '', message: '', type: 'CONTACT', avatar: '' });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const handleBulkDelete = async () => {
    if (!confirm(`¿Estás seguro de que deseas eliminar ${selectedIds.length} leads?`)) return;
    try {
      await Promise.all(selectedIds.map(id => fetch(`/api/leads/${id}`, { method: 'DELETE' })));
      setLeads(prev => prev.filter(l => !selectedIds.includes(l.id)));
      setSelectedIds([]);
      router.refresh();
    } catch (e) {
      alert('Error eliminando leads');
    }
  };

  // Editing status inline
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);

  // Detail modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditingLead, setIsEditingLead] = useState(false);
  const [editLeadData, setEditLeadData] = useState<Partial<Lead>>({});
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  
  const AVATARS = [
    '/avatars/avatar1.png',
    '/avatars/avatar2.png',
    '/avatars/avatar3.png',
    '/avatars/avatar4.png',
    '/avatars/avatar5.png',
  ];

  const handleEditClick = () => {
    setEditLeadData(selectedLead!);
    setIsEditingLead(true);
  };

  const handleSaveLead = async () => {
    try {
      const res = await fetch(`/api/leads/${selectedLead!.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editLeadData),
      });
      if (res.ok) {
        setLeads((prev) => prev.map((l) => (l.id === selectedLead!.id ? { ...l, ...editLeadData } as Lead : l)));
        setSelectedLead({ ...selectedLead!, ...editLeadData } as Lead);
        setIsEditingLead(false);
        // NO router.refresh() to avoid closing the modal unexpectedly
      } else {
        alert("Error al guardar cambios");
      }
    } catch {
      alert("Error de red");
    }
  };

  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.phone || "").includes(searchTerm) ||
      (l.message || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este lead permanentemente?")) return;
    try {
      await fetch(`/api/leads/${id}`, { method: "DELETE" });
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Error al eliminar');
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeadData)
      });
      if (res.ok) {
        const lead = await res.json();
        setLeads([lead, ...leads]);
        setIsCreating(false);
        setNewLeadData({ name: '', email: '', phone: '', message: '', type: 'CONTACT', avatar: '' });
      } else {
        alert('Error al crear lead');
      }
    } catch (error) {
      console.error(error);
      alert('Error de red');
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    setEditingStatusId(null);
    try {
      await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      router.refresh();
    } catch {
      alert("Error al actualizar el estado");
    }
  };

  const handleAvatarUpload = async (id: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        const avatarUrl = data.url;
        await fetch(`/api/leads/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ avatar: avatarUrl }),
        });
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, avatar: avatarUrl } : l)));
        if (selectedLead?.id === id) {
          setSelectedLead({ ...selectedLead, avatar: avatarUrl });
        }
        router.refresh();
      } else {
        alert("Error al subir imagen");
      }
    } catch {
      alert("Error de red");
    }
  };

  // KPIs
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "NEW").length;
  const contactedLeads = leads.filter((l) => l.status === "CONTACTED").length;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant font-label-md text-label-md">Total Leads</span>
            <span className="material-symbols-outlined text-primary-container">groups</span>
          </div>
          <span className="text-display-lg font-display-lg text-primary">{totalLeads}</span>
          <span className="text-[12px] text-secondary font-medium">Histórico en base de datos</span>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant font-label-md text-label-md">Nuevos (Sin contacto)</span>
            <span className="material-symbols-outlined text-error">priority_high</span>
          </div>
          <span className="text-display-lg font-display-lg text-primary">{newLeads}</span>
          <span className="text-[12px] text-on-surface-variant font-medium">Requieren atención inmediata</span>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant font-label-md text-label-md">Contactados</span>
            <span className="material-symbols-outlined text-green-700">check_circle</span>
          </div>
          <span className="text-display-lg font-display-lg text-primary">{contactedLeads}</span>
          <span className="text-[12px] text-secondary font-medium">En seguimiento activo</span>
        </div>
      </section>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/20 items-center justify-between">
        <div className="relative flex-1 min-w-[250px] max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="Buscar por nombre, teléfono, email..."
            type="text"
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value="ALL">Estado: Todos</option>
            <option value="NEW">Nuevo</option>
            <option value="CONTACTED">Contactado</option>
            <option value="NEGOTIATING">En Negociación</option>
            <option value="CLOSED">Cerrado</option>
          </select>
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Nuevo Lead
          </button>
        </div>
      </div>

      
      {selectedIds.length > 0 && (
        <div className="bg-surface-container-high rounded-xl p-4 flex items-center justify-between shadow-sm border border-outline-variant/30 mt-4 mb-4">
          <span className="font-label-md text-on-surface">{selectedIds.length} leads seleccionados</span>
          <button onClick={handleBulkDelete} className="px-4 py-2 bg-error text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[18px]">delete</span> Eliminar Seleccionados
          </button>
        </div>
      )}
      {/* Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-full md:min-w-[800px]">
            <thead className="bg-surface-container-low border-b border-outline-variant/30 sticky top-0 z-10">
              <tr>
                <th className="py-4 px-6 w-12 text-center">
                  <input type="checkbox" checked={selectedIds.length === paginated.length && paginated.length > 0} onChange={(e) => {
                    if (e.target.checked) setSelectedIds(paginated.map(l => l.id));
                    else setSelectedIds([]);
                  }} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary" />
                </th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant">Cliente</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant">Teléfono</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant">Correo Electrónico</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant hidden lg:table-cell">Mensaje</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant hidden md:table-cell">Tipo</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant">Estado</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-body-md text-body-md text-on-surface">
              {paginated.map((lead) => (
                <tr key={lead.id} onClick={() => { setSelectedLead(lead); setIsEditingLead(false); }} className="hover:bg-surface-container-low/50 transition-colors group cursor-pointer">
                  <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={selectedIds.includes(lead.id)} onChange={(e) => {
                      if (e.target.checked) setSelectedIds([...selectedIds, lead.id]);
                      else setSelectedIds(selectedIds.filter(id => id !== lead.id));
                    }} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-sm font-bold flex-shrink-0 overflow-hidden shadow-sm">
                        {lead.avatar ? <img src={lead.avatar} className="w-full h-full object-cover" alt="avatar" /> : lead.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-on-surface text-[15px]">{lead.name}</div>
                        <div className="text-xs text-on-surface-variant mt-1">{timeAgo(lead.createdAt)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {lead.phone ? (
                      <div className="flex items-center gap-2 text-[14px]">
                        <span className="material-symbols-outlined text-[16px] text-secondary">call</span>
                        {lead.phone}
                      </div>
                    ) : (
                      <span className="text-on-surface-variant text-sm italic">Sin teléfono</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-[14px]">
                      <span className="material-symbols-outlined text-[16px] text-secondary">mail</span>
                      <span className="truncate max-w-[200px]" title={lead.email}>{lead.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 hidden lg:table-cell">
                    <span className="text-[13px] text-on-surface-variant line-clamp-2 max-w-[220px]" title={lead.message || ''}>
                      {lead.message || 'Sin mensaje'}
                    </span>
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-sm border border-outline-variant/30">
                      <span className="material-symbols-outlined text-sm">language</span>
                      {lead.type === "VISIT" ? "Visita" : "Contacto"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {editingStatusId === lead.id ? (
                      <select
                        autoFocus
                        defaultValue={lead.status}
                        onBlur={() => setEditingStatusId(null)}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="text-xs border border-primary rounded-lg px-2 py-1 bg-surface focus:outline-none cursor-pointer"
                      >
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditingStatusId(lead.id); }}
                        className={`inline-flex items-center px-2.5 py-1 rounded-full font-label-md text-xs hover:opacity-80 transition-opacity cursor-pointer ${STATUS_STYLES[lead.status] || "bg-surface-container text-on-surface"}`}
                        title="Clic para cambiar estado"
                      >
                        {STATUS_LABELS[lead.status] || lead.status}
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}
                        className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Ver detalle"
                      >
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      {lead.phone && (
                        <a
                          onClick={(e) => e.stopPropagation()}
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=Hola ${lead.name}, te escribo de parte de Ivonne Marin Inmobiliaria.`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors"
                          title="WhatsApp"
                        >
                          <span className="material-symbols-outlined text-[20px]">chat</span>
                        </a>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); setEditLeadData(lead); setIsEditingLead(true); }}
                        className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Editar lead"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }}
                        className="p-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors"
                        title="Eliminar"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-on-surface-variant">
                    {leads.length === 0 ? 'No hay leads registrados aún.' : 'No se encontraron resultados.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-outline-variant/20 p-4 flex justify-between items-center bg-surface-container-lowest flex-wrap gap-3">
          <p className="font-body-md text-sm text-on-surface-variant">
            Mostrando {Math.min((currentPage - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} de {filtered.length} leads
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low disabled:opacity-40 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded border flex items-center justify-center font-label-md text-sm transition-colors ${p === currentPage ? "border-primary bg-primary text-on-primary" : "border-outline-variant text-on-surface hover:bg-surface-container-low"}`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low disabled:opacity-40 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => { setSelectedLead(null); setIsEditingLead(false); }}
        >
          <div
            className="bg-surface w-full max-w-lg rounded-2xl shadow-2xl p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline-md text-headline-md text-primary">{isEditingLead ? "Editar Lead" : "Detalles del Lead"}</h3>
              <button onClick={() => { setSelectedLead(null); setIsEditingLead(false); }} className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-3xl font-bold relative group overflow-visible mb-4 shadow-sm border-2 border-surface-container-high">
                {isEditingLead ? (
                  editLeadData.avatar ? <img src={editLeadData.avatar} className="w-full h-full object-cover rounded-full" alt="avatar" /> : selectedLead.name.substring(0, 2).toUpperCase()
                ) : (
                  selectedLead.avatar ? <img src={selectedLead.avatar} className="w-full h-full object-cover rounded-full" alt="avatar" /> : selectedLead.name.substring(0, 2).toUpperCase()
                )}
                
                {isEditingLead ? (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowAvatarSelector(!showAvatarSelector); }}
                      className="absolute bottom-0 right-0 bg-primary text-on-primary rounded-full p-2 shadow-md hover:bg-primary/90 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                    {showAvatarSelector && (
                      <div className="absolute top-28 bg-surface rounded-xl shadow-xl border border-outline-variant p-4 w-72 z-50 flex flex-wrap gap-3 justify-center">
                        <p className="w-full text-sm font-label-md text-on-surface-variant text-center mb-1">Elige un avatar o sube foto</p>
                        {AVATARS.map(av => (
                          <img key={av} src={av} onClick={() => { setEditLeadData({...editLeadData, avatar: av}); setShowAvatarSelector(false); }} className="w-16 h-16 rounded-full cursor-pointer hover:ring-2 hover:ring-primary object-cover" />
                        ))}
                        <label className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center cursor-pointer hover:bg-surface-container-high transition-colors text-primary hover:text-primary-dark">
                          <span className="material-symbols-outlined text-2xl">upload</span>
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => { 
                            if(e.target.files) {
                              handleAvatarUpload(selectedLead.id, e.target.files[0]).then(() => setShowAvatarSelector(false));
                            }
                          }} />
                        </label>
                      </div>
                    )}
                  </>
                ) : (
                  <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity" title="Cambiar foto">
                    <span className="material-symbols-outlined text-white text-xl">upload</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => { if(e.target.files) handleAvatarUpload(selectedLead.id, e.target.files[0]) }} />
                  </label>
                )}
              </div>
              
              <div className="text-center">
                {isEditingLead ? (
                  <input 
                    type="text" 
                    value={editLeadData.name || ""} 
                    onChange={e => setEditLeadData({...editLeadData, name: e.target.value})}
                    className="font-headline-md text-[22px] text-primary bg-surface-container-low border border-outline-variant rounded px-3 py-2 outline-none w-full max-w-[250px] text-center mb-1"
                    placeholder="Nombre Completo"
                  />
                ) : (
                  <h3 className="font-headline-lg text-[24px] text-primary">{selectedLead.name}</h3>
                )}
                <p className="text-sm text-on-surface-variant mt-1">Registrado {timeAgo(selectedLead.createdAt)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-secondary">mail</span>
                {isEditingLead ? (
                  <input type="email" value={editLeadData.email || ""} onChange={e => setEditLeadData({...editLeadData, email: e.target.value})} className="font-body-md text-on-surface bg-transparent border-b border-outline-variant outline-none flex-1" />
                ) : (
                  <span className="font-body-md text-on-surface">{selectedLead.email}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-secondary">call</span>
                {isEditingLead ? (
                  <input type="tel" value={editLeadData.phone || ""} onChange={e => setEditLeadData({...editLeadData, phone: e.target.value})} className="font-body-md text-on-surface bg-transparent border-b border-outline-variant outline-none flex-1" />
                ) : (
                  <span className="font-body-md text-on-surface">{selectedLead.phone || "No especificado"}</span>
                )}
              </div>
              
              <div className="p-3 bg-surface-container-low rounded-lg">
                <p className="font-label-md text-on-surface-variant mb-1">Mensaje:</p>
                {isEditingLead ? (
                  <textarea value={editLeadData.message || ""} onChange={e => setEditLeadData({...editLeadData, message: e.target.value})} className="font-body-md text-on-surface w-full bg-transparent border border-outline-variant rounded p-2 outline-none resize-none" rows={3}></textarea>
                ) : (
                  <p className="font-body-md text-on-surface">{selectedLead.message || "Sin mensaje"}</p>
                )}
              </div>

              <div className="flex gap-2">
                {isEditingLead ? (
                  <select value={editLeadData.status || "NEW"} onChange={e => setEditLeadData({...editLeadData, status: e.target.value})} className="px-3 py-1 rounded-full text-xs font-bold border border-outline-variant outline-none">
                    <option value="NEW">Nuevo</option>
                    <option value="CONTACTED">Contactado</option>
                    <option value="NEGOTIATING">En Negociación</option>
                    <option value="CLOSED">Cerrado</option>
                  </select>
                ) : (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_STYLES[selectedLead.status]}`}>
                    {STATUS_LABELS[selectedLead.status]}
                  </span>
                )}
                
                {isEditingLead ? (
                  <select value={editLeadData.type || "CONTACT"} onChange={e => setEditLeadData({...editLeadData, type: e.target.value})} className="px-3 py-1 rounded-full text-xs font-bold border border-outline-variant outline-none">
                    <option value="CONTACT">Contacto General</option>
                    <option value="VISIT">Solicitud de Visita</option>
                  </select>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-surface-container text-on-surface border border-outline-variant/30">
                    {selectedLead.type === "VISIT" ? "Solicitud de Visita" : "Contacto General"}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {isEditingLead ? (
                <>
                  <button onClick={() => setIsEditingLead(false)} className="flex-1 py-3 border border-outline-variant text-on-surface font-label-md rounded-xl hover:bg-surface-container transition-colors">
                    Cancelar
                  </button>
                  <button onClick={handleSaveLead} className="flex-1 py-3 bg-primary text-on-primary font-label-md rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <span className="material-symbols-outlined">save</span> Guardar
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleEditClick} className="flex-1 py-3 bg-secondary-container text-on-secondary-container font-label-md rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <span className="material-symbols-outlined">edit</span> Editar Lead
                  </button>
                  {selectedLead.phone && (
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}?text=Hola ${selectedLead.name}, te escribo de parte de Ivonne Marin Inmobiliaria.`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 bg-[#25D366] text-white font-label-md rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <span className="material-symbols-outlined">chat</span> WhatsApp
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(selectedLead.id)}
                    className="px-4 py-3 border border-error/30 text-error font-label-md rounded-xl hover:bg-error-container transition-colors"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Lead Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsCreating(false)}>
          <div className="bg-surface w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-primary">Registrar Lead Manual</h3>
              <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-surface-container rounded-full"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-4xl font-bold relative mb-4 overflow-hidden shadow-sm border-2 border-surface-container-high">
                  {newLeadData.avatar ? (
                    <img src={newLeadData.avatar} className="w-full h-full object-cover" alt="avatar" />
                  ) : (
                    <span className="material-symbols-outlined text-[40px]">person</span>
                  )}
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {AVATARS.map(av => (
                    <img key={av} src={av} onClick={() => setNewLeadData({...newLeadData, avatar: av})} className={`w-16 h-16 rounded-full cursor-pointer hover:ring-2 hover:ring-primary object-cover transition-all ${newLeadData.avatar === av ? 'ring-2 ring-primary scale-110' : ''}`} />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-label-md mb-1">Nombre Completo</label>
                <input required type="text" value={newLeadData.name} onChange={e => setNewLeadData({...newLeadData, name: e.target.value})} className="w-full rounded-lg border-2 border-outline-variant bg-surface-container-low p-3 focus:outline-none focus:border-primary text-on-surface" />
              </div>
              <div>
                <label className="block text-sm font-label-md mb-1">Correo Electrónico</label>
                <input required type="email" value={newLeadData.email} onChange={e => setNewLeadData({...newLeadData, email: e.target.value})} className="w-full rounded-lg border-2 border-outline-variant bg-surface-container-low p-3 focus:outline-none focus:border-primary text-on-surface" />
              </div>
              <div>
                <label className="block text-sm font-label-md mb-1">Teléfono</label>
                <input type="tel" value={newLeadData.phone} onChange={e => setNewLeadData({...newLeadData, phone: e.target.value})} className="w-full rounded-lg border-2 border-outline-variant bg-surface-container-low p-3 focus:outline-none focus:border-primary text-on-surface" />
              </div>
              <div>
                <label className="block text-sm font-label-md mb-1">Tipo</label>
                <select value={newLeadData.type} onChange={e => setNewLeadData({...newLeadData, type: e.target.value})} className="w-full rounded-lg border-2 border-outline-variant bg-surface-container-low p-3 focus:outline-none focus:border-primary text-on-surface">
                  <option value="CONTACT">Contacto General</option>
                  <option value="VISIT">Solicitud de Visita</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 bg-primary text-on-primary rounded-xl font-label-md hover:opacity-90 transition-opacity">
                Guardar Lead
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
