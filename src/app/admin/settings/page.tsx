'use client';

import { useState } from 'react';
import SettingsForm from "./SettingsForm";
import UsersTab from "./UsersTab";
import WebsiteTab from "./WebsiteTab";

export default function Page() {
  const [activeTab, setActiveTab] = useState('empresa');

  return (
    <>
      <header className="mb-section-gap max-w-container-max mx-auto">
        <h2 className="font-display-lg text-display-lg text-on-background mb-2">Configuración</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Gestiona los Ajustes generales de la plataforma y el perfil público.</p>
      </header>
<div className="max-w-container-max mx-auto">

<div className="flex border-b border-surface-dim mb-8 overflow-x-auto hide-scrollbar">
<button 
  onClick={() => setActiveTab('empresa')}
  className={`px-6 py-4 font-label-md text-label-md border-b-2 whitespace-nowrap transition-colors ${activeTab === 'empresa' ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant hover:text-primary'}`}
>
                    Perfil de Empresa
                </button>
<button 
  onClick={() => setActiveTab('sitio')}
  className={`px-6 py-4 font-label-md text-label-md border-b-2 whitespace-nowrap transition-colors ${activeTab === 'sitio' ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant hover:text-primary'}`}
>
                    Configuración del Sitio
                </button>
<button 
  onClick={() => setActiveTab('usuarios')}
  className={`px-6 py-4 font-label-md text-label-md border-b-2 whitespace-nowrap transition-colors ${activeTab === 'usuarios' ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant hover:text-primary'}`}
>
                    Usuarios y Roles
                </button>
</div>

{activeTab === 'empresa' && <SettingsForm />}
{activeTab === 'sitio' && <WebsiteTab />}
{activeTab === 'usuarios' && <UsersTab />}

</div>
    </>
  );
}
    