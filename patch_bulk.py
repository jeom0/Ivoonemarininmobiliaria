import re

with open("src/app/admin/leads/LeadsTable.tsx", "r") as f:
    content = f.read()

# 1. Add state and handleBulkDelete
state_str = """  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
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
  };"""

content = content.replace('  // Editing status inline', state_str + '\n\n  // Editing status inline')

# 2. Add Bulk Action Bar
bulk_bar_str = """
      {selectedIds.length > 0 && (
        <div className="bg-surface-container-high rounded-xl p-4 flex items-center justify-between shadow-sm border border-outline-variant/30 mt-4 mb-4">
          <span className="font-label-md text-on-surface">{selectedIds.length} leads seleccionados</span>
          <button onClick={handleBulkDelete} className="px-4 py-2 bg-error text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[18px]">delete</span> Eliminar Seleccionados
          </button>
        </div>
      )}
      {/* Table */}"""
content = content.replace('{/* Table */}', bulk_bar_str)

# 3. Add Header Checkbox
header_tr = """              <tr>
                <th className="py-4 px-6 w-12 text-center">
                  <input type="checkbox" checked={selectedIds.length === paginated.length && paginated.length > 0} onChange={(e) => {
                    if (e.target.checked) setSelectedIds(paginated.map(l => l.id));
                    else setSelectedIds([]);
                  }} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary" />
                </th>"""
content = re.sub(r'<tr>\s*<th className="py-4 px-6 font-label-md', header_tr + '\n                <th className="py-4 px-6 font-label-md', content, 1)

# 4. Add Row Checkbox
row_td = """                <tr key={lead.id} onClick={() => { setSelectedLead(lead); setIsEditingLead(false); }} className="hover:bg-surface-container-low/50 transition-colors group cursor-pointer">
                  <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={selectedIds.includes(lead.id)} onChange={(e) => {
                      if (e.target.checked) setSelectedIds([...selectedIds, lead.id]);
                      else setSelectedIds(selectedIds.filter(id => id !== lead.id));
                    }} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary" />
                  </td>
                  <td className="py-4 px-6">"""
content = re.sub(r'<tr key=\{lead\.id\} onClick=\{[^>]+\}>\s*<td className="py-4 px-6">', row_td, content)

with open("src/app/admin/leads/LeadsTable.tsx", "w") as f:
    f.write(content)
