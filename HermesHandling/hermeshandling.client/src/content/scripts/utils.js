import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import jsPDF from "jspdf";
import "jspdf-autotable";

//Script para exportar a Excel y PDF

export function exportToExcel(data, fileName = "reportes.xlsx") {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reportes");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
}

export function exportToPDF(data, fileName = "reportes.pdf") {
    const doc = new jsPDF();
    const columns = [
        { header: "ID", dataKey: "id" },
        { header: "Título", dataKey: "titulo" },
        { header: "Fecha", dataKey: "fecha" },
        { header: "Estado", dataKey: "estado" }
        // Añade más columnas según tu estructura
    ];
    doc.autoTable({
        columns,
        body: data,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] },
        margin: { top: 20 }
    });
    doc.save(fileName);
}
