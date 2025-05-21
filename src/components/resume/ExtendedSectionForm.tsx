
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ResumeData, TechnicalSkill, ExtendedCertification, Project, Language, ExtracurricularCourse, Publication } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Trash2, X } from "lucide-react";

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
  // Determinar qual formulário exibir com base no tipo de seção
  switch (sectionType) {
    case "technicalSkills":
      return <TechnicalSkillsForm resumeData={resumeData} updateResumeData={updateResumeData} sectionType={sectionType} />;
    case "extendedCertifications":
      return <ExtendedCertificationsForm resumeData={resumeData} updateResumeData={updateResumeData} sectionType={sectionType} />;
    case "projects":
      return <ProjectsForm resumeData={resumeData} updateResumeData={updateResumeData} sectionType={sectionType} />;
    case "languages":
      return <LanguagesForm resumeData={resumeData} updateResumeData={updateResumeData} sectionType={sectionType} />;
    case "volunteerWork":
      return <VolunteerWorkForm resumeData={resumeData} updateResumeData={updateResumeData} sectionType={sectionType} />;
    default:
      return (
        <div className="p-4 border rounded-md bg-gray-50">
          <p>Formulário para {sectionType} - Em desenvolvimento</p>
          <p className="text-sm text-gray-500 mt-2">
            Esta seção será implementada em breve. Por favor, use as seções padrão por enquanto.
          </p>
        </div>
      );
  }
};

// Formulário para Habilidades Técnicas
const TechnicalSkillsForm: React.FC<ExtendedSectionFormProps> = ({ resumeData, updateResumeData }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  // Obtém as habilidades técnicas do resumeData
  const technicalSkills = resumeData.technicalCategories.technicalSkills || [];

  // Adiciona uma nova habilidade técnica
  const addTechnicalSkill = () => {
    const newSkill: TechnicalSkill = {
      id: uuidv4(),
      name: "",
      type: "",
    };
    
    const updatedSkills = [...technicalSkills, newSkill];
    updateResumeData("technicalCategories", {
      ...resumeData.technicalCategories,
      technicalSkills: updatedSkills
    });
  };

  // Atualiza uma habilidade técnica existente
  const updateSkill = (index: number, field: keyof TechnicalSkill, value: any) => {
    const updatedSkills = [...technicalSkills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    
    updateResumeData("technicalCategories", {
      ...resumeData.technicalCategories,
      technicalSkills: updatedSkills
    });
  };

  // Remove uma habilidade técnica
  const removeSkill = (index: number) => {
    const updatedSkills = [...technicalSkills];
    updatedSkills.splice(index, 1);
    
    updateResumeData("technicalCategories", {
      ...resumeData.technicalCategories,
      technicalSkills: updatedSkills
    });
  };

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-4"
      >
        {technicalSkills.map((skill, index) => (
          <AccordionItem key={skill.id} value={skill.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {skill.name || `Habilidade Técnica ${index + 1}`}
              </AccordionTrigger>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  removeSkill(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nome da Habilidade*</label>
                  <Input
                    value={skill.name}
                    onChange={(e) => updateSkill(index, "name", e.target.value)}
                    placeholder="Ex: React, Java, Photoshop"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Tipo*</label>
                  <Select 
                    value={skill.type} 
                    onValueChange={(value) => updateSkill(index, "type", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione o tipo de habilidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="programming">Linguagem de Programação</SelectItem>
                      <SelectItem value="framework">Framework/Biblioteca</SelectItem>
                      <SelectItem value="tool">Ferramenta</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="database">Banco de Dados</SelectItem>
                      <SelectItem value="cloud">Cloud/DevOps</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Nível de Proficiência (Opcional)</label>
                  <div className="flex items-center mt-1">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={skill.proficiency || 3}
                      onChange={(e) => updateSkill(index, "proficiency", parseInt(e.target.value))}
                      className="w-full"
                    />
                    <span className="ml-2">{skill.proficiency || 3}/5</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={addTechnicalSkill}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Habilidade Técnica
      </Button>
    </div>
  );
};

// Placeholder para os outros formulários de seções estendidas
const ExtendedCertificationsForm: React.FC<ExtendedSectionFormProps> = ({ resumeData, updateResumeData, sectionType }) => {
  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <p>Formulário para Certificações Detalhadas - Em desenvolvimento</p>
      <p className="text-sm text-gray-500 mt-2">
        Esta funcionalidade será implementada em breve.
      </p>
    </div>
  );
};

const ProjectsForm: React.FC<ExtendedSectionFormProps> = ({ resumeData, updateResumeData, sectionType }) => {
  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <p>Formulário para Projetos - Em desenvolvimento</p>
      <p className="text-sm text-gray-500 mt-2">
        Esta funcionalidade será implementada em breve.
      </p>
    </div>
  );
};

const LanguagesForm: React.FC<ExtendedSectionFormProps> = ({ resumeData, updateResumeData, sectionType }) => {
  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <p>Formulário para Idiomas - Em desenvolvimento</p>
      <p className="text-sm text-gray-500 mt-2">
        Esta funcionalidade será implementada em breve.
      </p>
    </div>
  );
};

const VolunteerWorkForm: React.FC<ExtendedSectionFormProps> = ({ resumeData, updateResumeData, sectionType }) => {
  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <p>Formulário para Trabalho Voluntário - Em desenvolvimento</p>
      <p className="text-sm text-gray-500 mt-2">
        Esta funcionalidade será implementada em breve.
      </p>
    </div>
  );
};
