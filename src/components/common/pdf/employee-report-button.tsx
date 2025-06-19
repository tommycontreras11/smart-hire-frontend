'use client';

import { IEmployee } from "@/providers/http/employees/interface";
import { pdf } from "@react-pdf/renderer";
import { EmployeeReportDocument } from "./employee-report";

interface Props {
  employees: IEmployee[];
  reportTitle?: string;
  generatedDate?: string;
}

export function EmployeeReportButton({ employees, reportTitle, generatedDate }: Props) {
  const handleGeneratePdf = async () => {
    const blob = await pdf(
      <EmployeeReportDocument
        employees={employees}
        reportTitle={reportTitle}
        generatedDate={generatedDate}
      />
    ).toBlob();

    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

  return (
    <button
      onClick={handleGeneratePdf}
      
      className="bg-transparent hover:bg-blue-700 text-blue-800 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      Report
    </button>
  );
}
