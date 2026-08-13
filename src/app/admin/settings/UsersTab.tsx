'use client';
import { useState, useEffect } from 'react';

type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  permissions: string | null;
  isActive: boolean;
  createdAt: string;
};

const MODULES = [
  { id: 'inmuebles', label: 'Inmuebles' },
  { id: 'leads', label: 'Leads' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'blog', label: 'Blog' },
  { id: 'reportes', label: 'Reportes' },
  { id: 'configuracion', label: 'Configuración' }
];

export default function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('AGENT');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openNewUserModal = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setPassword('');
    setRole('AGENT');
    setSelectedPermissions([]);
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setName(user.name || '');
    setEmail(user.email);
    setPassword(''); // blank means keep current
    setRole(user.role);
    try {
      setSelectedPermissions(user.permissions ? JSON.parse(user.permissions) : []);
    } catch (e) {
      setSelectedPermissions([]);
    }
    setIsModalOpen(true);
  };

  const togglePermission = (moduleId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(moduleId) 
        ? prev.filter(p => p !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const isNew = !editingUser;
      const url = '/api/users';
      const method = isNew ? 'POST' : 'PUT';
      
      const payload: any = {
        name,
        email,
        role,
        permissions: selectedPermissions
      };
      
      if (password) payload.password = password;
      if (!isNew) payload.id = editingUser.id;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchUsers();
      } else {
        const err = await res.json();
        alert(err.error || "Error al guardar");
      }
    } catch (err) {
      alert("Error de red");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (user: User) => {
    const actionStr = user.isActive ? 'deshabilitar' : 'habilitar';
    if (!confirm(`¿Seguro que deseas ${actionStr} a este usuario?`)) return;
    
    try {
      const res = await fetch(`/api/users`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, isActive: !user.isActive })
      });
      
      if (res.ok) {
        fetchUsers();
      } else {
        const err = await res.json();
        alert(err.error || "Error al actualizar");
      }
    } catch (err) {
      alert("Error de red");
    }
  };

  return (
    <div className="space-y-6 fade-in p-6 bg-surface-container-lowest rounded-xl border border-secondary-fixed-dim/30 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-headline-md text-on-background">Usuarios y Asesores</h3>
          <p className="text-sm text-on-surface-variant mt-1">Gestiona quién puede acceder a la plataforma y qué módulos pueden ver.</p>
        </div>
        <button 
          onClick={openNewUserModal}
          className="bg-primary text-on-primary font-label-md px-6 py-2 rounded-lg hover:opacity-90 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Crear Usuario
        </button>
      </div>

      {loading ? (
        <p className="text-center py-8 text-on-surface-variant">Cargando usuarios...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant font-label-md text-[12px] uppercase tracking-wider">
                <th className="pb-4 font-semibold">Usuario</th>
                <th className="pb-4 font-semibold hidden md:table-cell">Rol</th>
                <th className="pb-4 font-semibold">Permisos</th>
                <th className="pb-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md">
              {users.map(user => {
                let perms = [];
                try { perms = user.permissions ? JSON.parse(user.permissions) : []; } catch(e) {}
                
                return (
                  <tr key={user.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface">{user.name || 'Sin Nombre'}</span>
                        <span className="text-xs text-on-surface-variant">{user.email}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${user.role === 'ADMIN' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-variant text-on-surface-variant'}`}>
                          {user.role}
                        </span>
                        {!user.isActive && (
                          <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-error-container text-on-error-container">
                            INACTIVO
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4">
                      {user.role === 'ADMIN' ? (
                        <span className="text-xs text-on-surface-variant">Acceso Total</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {perms.length === 0 ? <span className="text-xs text-error">Sin accesos</span> : 
                           perms.map((p: string) => (
                            <span key={p} className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[10px] capitalize">
                              {p}
                            </span>
                           ))
                          }
                        </div>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(user)} className="text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-surface-variant transition-colors">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        {user.role !== 'ADMIN' && (
                          <button 
                            onClick={() => handleToggleActive(user)} 
                            className={`p-2 rounded-full transition-colors ${user.isActive ? 'text-on-surface-variant hover:text-error hover:bg-error-container' : 'text-on-surface-variant hover:text-green-600 hover:bg-green-50'}`}
                            title={user.isActive ? 'Deshabilitar' : 'Habilitar'}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {user.isActive ? 'block' : 'check_circle'}
                            </span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Crear/Editar Usuario */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="font-headline-md text-primary mb-6">
              {editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
            </h2>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-label-md text-on-surface mb-1">Nombre Completo</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border border-outline-variant rounded-lg px-4 py-2" />
              </div>
              
              <div>
                <label className="block text-sm font-label-md text-on-surface mb-1">Correo Electrónico (Para Login)</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={!!editingUser} className={`w-full border border-outline-variant rounded-lg px-4 py-2 ${editingUser ? 'bg-surface-container cursor-not-allowed' : ''}`} />
              </div>

              <div>
                <label className="block text-sm font-label-md text-on-surface mb-1">
                  Contraseña {editingUser && <span className="text-xs font-normal text-on-surface-variant">(Dejar en blanco para no cambiarla)</span>}
                </label>
                <input required={!editingUser} type="text" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-outline-variant rounded-lg px-4 py-2" placeholder="Ej: temporal123" />
              </div>

              <div className="pt-4 border-t border-outline-variant/30">
                <label className="block text-sm font-label-md text-on-surface mb-3">Rol del Usuario</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="role" checked={role === 'ADMIN'} onChange={() => setRole('ADMIN')} />
                    <span>Administrador <span className="text-xs text-on-surface-variant block">Acceso total a todo</span></span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="role" checked={role === 'AGENT'} onChange={() => setRole('AGENT')} />
                    <span>Asesor / Agente <span className="text-xs text-on-surface-variant block">Acceso restringido</span></span>
                  </label>
                </div>
              </div>

              {role === 'AGENT' && (
                <div className="pt-4 border-t border-outline-variant/30">
                  <label className="block text-sm font-label-md text-on-surface mb-3">Permisos de Módulos</label>
                  <div className="grid grid-cols-2 gap-3">
                    {MODULES.map(mod => (
                      <label key={mod.id} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-surface-container-low transition-colors">
                        <input 
                          type="checkbox" 
                          className="rounded text-primary"
                          checked={selectedPermissions.includes(mod.id)}
                          onChange={() => togglePermission(mod.id)}
                        />
                        <span className="text-sm">{mod.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-outline-variant/30">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="bg-primary text-on-primary px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                  {saving ? 'Guardando...' : 'Guardar Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
