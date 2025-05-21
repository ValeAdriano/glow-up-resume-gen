
import React from "react";
import { ResumeData } from "@/types";

export interface ExtendedSectionFormProps {
  sectionType: string;
  resumeData: ResumeData;
  updateResumeData: (type: string, data: any) => void;
}

export const ExtendedSectionForm: React.FC<ExtendedSectionFormProps> = ({ 
  sectionType, 
  resumeData, 
  updateResumeData 
}) => {
  // This is a placeholder component that will be implemented later
  // For now, it just displays the section type
  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <p>Formulário para {sectionType} - Em desenvolvimento</p>
      <p className="text-sm text-gray-500 mt-2">
        Esta seção será implementada em breve. Por favor, use as seções padrão por enquanto.
      </p>
    </div>
  );
};
