"use client";

import { saveAs } from "file-saver";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";  // <-- We’ll use this for table export
import { useState } from "react";

interface ExportButtonsProps {
  data: object[];
  tableId: string;
}

export const ExportButtons = ({ data }: ExportButtonsProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "campaign-performance.csv");
  };

  const exportPDF = () => {
    setIsExporting(true);

    const doc = new jsPDF("landscape");

    doc.setFontSize(18);
    doc.text("Campaign Performance Report", 14, 22);

    const tableHeaders = [["Campaign", "Impressions", "Clicks", "Conversions"]];
    const tableRows = data.map((item: any) => [
      item.campaign,
      item.impressions,
      item.clicks,
      item.conversions,
    ]);

    autoTable(doc, {
      head: tableHeaders,
      body: tableRows,
      startY: 30,
      styles: {
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [22, 160, 133],  // Teal header
      },
    });

    doc.save("campaign-performance.pdf");

    setIsExporting(false);
  };

  return (
    <div className="flex gap-3 mb-4">
      <button
        onClick={exportCSV}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Export CSV
      </button>
      <button
        onClick={exportPDF}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={isExporting}
      >
        {isExporting ? "Exporting..." : "Export PDF"}
      </button>
    </div>
  );
};

