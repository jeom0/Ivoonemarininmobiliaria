'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function ReportsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentFilter = searchParams.get('filter') || 'all';
  const currentRange = searchParams.get('range') || 'all';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-sm">
      <div className="flex-1">
        <label className="block text-xs font-label-md text-on-surface-variant mb-2">Módulo</label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'General' },
            { id: 'leads', label: 'Leads' },
            { id: 'visits', label: 'Visitas' },
            { id: 'properties', label: 'Inmuebles' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => updateFilters('filter', f.id)}
              className={`px-4 py-2 rounded-full text-sm font-label-md transition-colors ${
                currentFilter === f.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="md:w-[250px]">
        <label className="block text-xs font-label-md text-on-surface-variant mb-2">Período de Tiempo</label>
        <select
          value={currentRange}
          onChange={(e) => updateFilters('range', e.target.value)}
          className="w-full bg-surface-container rounded-lg border-none px-4 py-2.5 text-sm font-body-md text-on-surface focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="all">Histórico Completo</option>
          <option value="7d">Últimos 7 días</option>
          <option value="30d">Últimos 30 días</option>
          <option value="this_month">Este Mes</option>
        </select>
      </div>
    </div>
  );
}
