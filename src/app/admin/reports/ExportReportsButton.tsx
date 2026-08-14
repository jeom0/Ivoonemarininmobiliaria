'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ExportReportsButton({ data }: { data: any }) {
  const [exporting, setExporting] = useState(false);

  const exportExcel = () => {
    // Reporte de Balance (Excel)
    const wb = XLSX.utils.book_new();

    // Hoja 1: Resumen
    const summaryData = [
      ["Métrica", "Valor"],
      ["Inmuebles Activos", data.activeProperties],
      ["Inmuebles Vendidos", data.soldProperties],
      ["Total Inmuebles", data.totalProperties],
      ["Leads de Contacto", data.contactLeads],
      ["Visitas Agendadas", data.visitLeads],
      ["Total Leads", data.totalLeads],
    ];
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, "Balance General");

    // Hoja 2: Inmuebles
    const propertiesData = data.allProperties.map((p: any) => ({
      ID: p.id,
      Título: p.title,
      Ciudad: p.city,
      Precio: p.price,
      Estado: p.status
    }));
    const wsProperties = XLSX.utils.json_to_sheet(propertiesData);
    XLSX.utils.book_append_sheet(wb, wsProperties, "Inmuebles");

    // Descargar
    XLSX.writeFile(wb, "Reporte_Balance_Inmobiliaria.xlsx");
  };

  const exportPDF = async () => {
    setExporting(true);
    const element = document.getElementById('pdf-report-template');
    if (!element) return;
    
    // Mostramos el elemento temporalmente para capturarlo
    element.style.display = 'block';

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("Reporte_Ejecutivo_Inmobiliaria.pdf");
    } catch (error) {
      console.error(error);
      alert("Error al generar el PDF");
    } finally {
      element.style.display = 'none';
      setExporting(false);
    }
  };

  return (
    <>
      <div className="flex gap-3 mt-4 md:mt-0">
        <button 
          onClick={exportExcel} 
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-label-md transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">table</span>
          Excel (Balance)
        </button>
        <button 
          onClick={exportPDF}
          disabled={exporting}
          className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg font-label-md transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
          {exporting ? 'Generando...' : 'PDF (Ejecutivo)'}
        </button>
      </div>

      {/* Hidden template for PDF */}
      <div id="pdf-report-template" style={{ display: 'none', width: '800px', padding: '40px', background: 'white', color: 'black' }}>
        <h1 style={{ fontSize: '24px', color: '#5c1212', borderBottom: '2px solid #5c1212', paddingBottom: '10px', marginBottom: '20px' }}>
          Reporte Ejecutivo - Ivonne Marin Inmobiliaria
        </h1>
        <p style={{ fontSize: '14px', marginBottom: '30px' }}>
          Fecha de generación: {new Date().toLocaleDateString('es-CO')}
        </p>
        
        <h2 style={{ fontSize: '18px', color: '#7a5d3f', marginBottom: '10px' }}>Resumen de Actividad</h2>
        <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
          Durante este periodo, la plataforma registra un total de <strong>{data.totalProperties}</strong> inmuebles en portafolio. 
          Actualmente, contamos con <strong>{data.activeProperties}</strong> propiedades disponibles para ofrecer a nuestros clientes, 
          habiendo cerrado exitosamente <strong>{data.soldProperties}</strong> negociaciones.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '30px' }}>
          En cuanto a la captación de clientes, se han registrado un total de <strong>{data.totalLeads}</strong> leads, divididos en 
          <strong> {data.contactLeads}</strong> contactos directos desde la web y <strong>{data.visitLeads}</strong> visitas agendadas.
        </p>

        <h2 style={{ fontSize: '18px', color: '#7a5d3f', marginBottom: '10px' }}>Top 5 Inmuebles Más Valorados</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', fontSize: '12px' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Propiedad</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Ciudad</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Precio</th>
            </tr>
          </thead>
          <tbody>
            {data.allProperties.slice(0, 5).map((p: any) => (
              <tr key={p.id}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{p.title}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{p.city}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(p.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #ddd', fontSize: '10px', textAlign: 'center', color: '#666' }}>
          Generado automáticamente por Ivonne Marin Asesora Inmobiliaria
        </div>
      </div>
    </>
  );
}
