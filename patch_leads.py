import re

with open("src/app/admin/leads/LeadsTable.tsx", "r") as f:
    content = f.read()

# Add states
state_block = """  // Detail modal
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
  };"""

content = content.replace("  // Detail modal\n  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);", state_block)

# Fix onClick for modal close
content = content.replace("onClick={() => setSelectedLead(null)}", "onClick={() => { setSelectedLead(null); setIsEditingLead(false); }}")

# Replace Detail Modal content
modal_start_token = '<div className="flex items-start justify-between">'
modal_end_token = '{/* Create Lead Modal */}'

start_idx = content.find(modal_start_token)
end_idx = content.find(modal_end_token)

new_modal = """<div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xl font-bold relative group overflow-visible">
                  {isEditingLead ? (
                    editLeadData.avatar ? <img src={editLeadData.avatar} className="w-full h-full object-cover rounded-full" alt="avatar" /> : selectedLead.name.substring(0, 2).toUpperCase()
                  ) : (
                    selectedLead.avatar ? <img src={selectedLead.avatar} className="w-full h-full object-cover rounded-full" alt="avatar" /> : selectedLead.name.substring(0, 2).toUpperCase()
                  )}
                  
                  {isEditingLead ? (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setShowAvatarSelector(!showAvatarSelector); }}
                        className="absolute -bottom-2 -right-2 bg-primary text-on-primary rounded-full p-1 shadow-md hover:bg-primary/90"
                      >
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                      </button>
                      {showAvatarSelector && (
                        <div className="absolute top-16 left-0 bg-surface rounded-xl shadow-xl border border-outline-variant p-3 w-48 z-50 flex flex-wrap gap-2">
                          <p className="w-full text-xs font-label-sm text-on-surface-variant mb-1">Elige un avatar o sube foto</p>
                          {AVATARS.map(av => (
                            <img key={av} src={av} onClick={() => { setEditLeadData({...editLeadData, avatar: av}); setShowAvatarSelector(false); }} className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-primary object-cover" />
                          ))}
                          <label className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center cursor-pointer hover:bg-surface-container-high transition-colors">
                            <span className="material-symbols-outlined text-sm">upload</span>
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
                      <span className="material-symbols-outlined text-white text-sm">upload</span>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => { if(e.target.files) handleAvatarUpload(selectedLead.id, e.target.files[0]) }} />
                    </label>
                  )}
                </div>
                <div>
                  {isEditingLead ? (
                    <input 
                      type="text" 
                      value={editLeadData.name || ""} 
                      onChange={e => setEditLeadData({...editLeadData, name: e.target.value})}
                      className="font-headline-md text-headline-md text-primary bg-surface-container-low border border-outline-variant rounded px-2 py-1 outline-none w-full max-w-[200px]"
                    />
                  ) : (
                    <h3 className="font-headline-md text-headline-md text-primary">{selectedLead.name}</h3>
                  )}
                  <p className="text-[12px] text-on-surface-variant mt-1">{timeAgo(selectedLead.createdAt)}</p>
                </div>
              </div>
              <button onClick={() => { setSelectedLead(null); setIsEditingLead(false); }} className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
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

      """

content = content[:start_idx] + new_modal + content[end_idx:]

with open("src/app/admin/leads/LeadsTable.tsx", "w") as f:
    f.write(content)
