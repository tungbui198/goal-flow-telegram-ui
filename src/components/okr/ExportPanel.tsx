
import React from 'react';
import { Button } from '@/components/ui/button';
import { OKRState } from '@/types/okr';
import { FileDown } from 'lucide-react';

interface ExportPanelProps {
  okrState: OKRState;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ okrState }) => {
  const exportAsPDF = () => {
    // This would typically use a PDF generation library like jspdf
    // For now, just showing a mock implementation
    alert("PDF export functionality would be implemented here");
    // In a real implementation, we'd generate the PDF and trigger a download
  };

  const exportAsCSV = () => {
    // Create headers
    let csvContent = "Objective,Start Date,End Date,Status,Progress,Key Results,Tasks\n";
    
    // Add data rows
    okrState.objectives.forEach(obj => {
      obj.keyResults.forEach(kr => {
        kr.tasks.forEach(task => {
          csvContent += `"${obj.title}","${obj.startDate}","${obj.endDate}","${obj.status}",${calculateObjectiveProgress(obj.keyResults)},"${kr.title}","${task.title}"\n`;
        });
        
        // If no tasks, still include the KR
        if (kr.tasks.length === 0) {
          csvContent += `"${obj.title}","${obj.startDate}","${obj.endDate}","${obj.status}",${calculateObjectiveProgress(obj.keyResults)},"${kr.title}",""\n`;
        }
      });
      
      // If no KRs, still include the objective
      if (obj.keyResults.length === 0) {
        csvContent += `"${obj.title}","${obj.startDate}","${obj.endDate}","${obj.status}",${calculateObjectiveProgress(obj.keyResults)},"",""\n`;
      }
    });
    
    // Create a download link
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `okr_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper function for CSV export
  const calculateObjectiveProgress = (keyResults: any[]) => {
    if (keyResults.length === 0) return 0;
    const totalProgress = keyResults.reduce((acc, kr) => acc + kr.progress, 0);
    return Math.round(totalProgress / keyResults.length);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FileDown className="h-5 w-5" /> Export Data
      </h3>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={exportAsCSV}
        >
          Export as CSV
        </Button>
        <Button 
          variant="outline"
          className="flex-1"
          onClick={exportAsPDF}
        >
          Export as PDF
        </Button>
      </div>
    </div>
  );
};

export default ExportPanel;
