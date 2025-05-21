import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ResumeData, TechnicalSkill, ExtendedCertification, Project, Language, ExtracurricularCourse, Publication, VolunteerWork } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Trash2, X, Briefcase, Handshake } from "lucide-react";

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

// Implementação do formulário para Certificações Detalhadas
const ExtendedCertificationsForm: React.FC<ExtendedSectionFormProps> = ({ resumeData, updateResumeData }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  // Obtém as certificações detalhadas do resumeData
  const certifications = resumeData.technicalCategories.certifications || [];

  // Adiciona uma nova certificação
  const addCertification = () => {
    const newCertification: ExtendedCertification = {
      id: uuidv4(),
      name: "",
      issuer: "",
      platform: "",
      date: "",
      description: "",
      url: "",
    };
    
    const updatedCertifications = [...certifications, newCertification];
    updateResumeData("technicalCategories", {
      ...resumeData.technicalCategories,
      certifications: updatedCertifications
    });
  };

  // Atualiza uma certificação existente
  const updateCertification = (index: number, field: keyof ExtendedCertification, value: any) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value
    };
    
    updateResumeData("technicalCategories", {
      ...resumeData.technicalCategories,
      certifications: updatedCertifications
    });
  };

  // Remove uma certificação
  const removeCertification = (index: number) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    
    updateResumeData("technicalCategories", {
      ...resumeData.technicalCategories,
      certifications: updatedCertifications
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
        {certifications.map((certification, index) => (
          <AccordionItem key={certification.id} value={certification.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {certification.name || `Certificação ${index + 1}`}
              </AccordionTrigger>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCertification(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nome da Certificação*</label>
                  <Input
                    value={certification.name}
                    onChange={(e) => updateCertification(index, "name", e.target.value)}
                    placeholder="Ex: AWS Certified Solutions Architect"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Emissor*</label>
                  <Input
                    value={certification.issuer}
                    onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                    placeholder="Ex: Amazon Web Services"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Plataforma</label>
                  <Input
                    value={certification.platform}
                    onChange={(e) => updateCertification(index, "platform", e.target.value)}
                    placeholder="Ex: Coursera, Udemy, etc."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Data de Emissão*</label>
                  <Input
                    type="date"
                    value={certification.date}
                    onChange={(e) => updateCertification(index, "date", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Descrição (opcional)</label>
                  <Textarea
                    value={certification.description || ""}
                    onChange={(e) => updateCertification(index, "description", e.target.value)}
                    placeholder="Descreva brevemente a certificação e o que você aprendeu"
                    className="mt-1"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">URL (opcional)</label>
                  <Input
                    value={certification.url || ""}
                    onChange={(e) => updateCertification(index, "url", e.target.value)}
                    placeholder="https://exemplo.com/certificado"
                    className="mt-1"
                  />
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
        onClick={addCertification}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Certificação
      </Button>
    </div>
  );
};

const ProjectsForm: React.FC<ExtendedSectionFormProps> = ({ resumeData, updateResumeData }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  // Obtém os projetos do resumeData
  const projects = resumeData.technicalCategories.projects || [];

  // Adiciona um novo projeto
  const addProject = () => {
    const newProject: Project = {
      id: uuidv4(),
      name: "",
      description: "",
      technologies: [],
      startDate: "",
      current: false,
    };
    
    const updatedProjects = [...projects, newProject];
    updateResumeData("technicalCategories", {
      ...resumeData.technicalCategories,
      projects: updatedProjects
    });
  };

  // Atualiza um projeto existente
  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    
    updateResumeData("technicalCategories", {
      ...resumeData.technicalCategories,
      projects: updatedProjects
    });
  };

  // Adicionar ou remover tecnologia de um projeto
  const handleTechnologyChange = (index: number, value: string, isAdding: boolean) => {
    const updatedProjects = [...projects];
    const project = updatedProjects[index];
    let technologies = [...(project.technologies || [])];
    
    if (isAdding && value.trim()) {
      technologies.push(value.trim());
    } else {
      technologies = technologies.filter(tech => tech !== value);
    }
    
    updatedProjects[index] = {
      ...project,
      technologies
    };
    
    updateResumeData("technicalCategories", {
      ...resumeData.technicalCategories,
      projects: updatedProjects
    });
  };

  // Remove um projeto
  const removeProject = (index: number) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    
    updateResumeData("technicalCategories", {
      ...resumeData.technicalCategories,
      projects: updatedProjects
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
        {projects.map((project, index) => (
          <AccordionItem key={project.id} value={project.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {project.name || `Projeto ${index + 1}`}
              </AccordionTrigger>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  removeProject(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nome do Projeto*</label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                    placeholder="Ex: Sistema de Gestão de Projetos"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Descrição*</label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, "description", e.target.value)}
                    placeholder="Descreva brevemente o projeto e suas responsabilidades"
                    className="mt-1"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Seu Papel (opcional)</label>
                  <Input
                    value={project.role || ""}
                    onChange={(e) => updateProject(index, "role", e.target.value)}
                    placeholder="Ex: Desenvolvedor Frontend, Líder Técnico"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Tecnologias Utilizadas</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies && project.technologies.map((tech, techIndex) => (
                      <div 
                        key={techIndex} 
                        className="flex items-center bg-muted px-3 py-1 rounded-full text-sm"
                      >
                        <span>{tech}</span>
                        <button 
                          type="button"
                          onClick={() => handleTechnologyChange(index, tech, false)}
                          className="ml-2 text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    
                    <Input
                      placeholder="Adicionar tecnologia"
                      className="w-full mt-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          handleTechnologyChange(index, input.value, true);
                          input.value = '';
                        }
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Digite e pressione Enter para adicionar
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium">URL (opcional)</label>
                  <Input
                    value={project.url || ""}
                    onChange={(e) => updateProject(index, "url", e.target.value)}
                    placeholder="https://exemplo.com/projeto"
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Data de Início*</label>
                    <Input
                      type="date"
                      value={project.startDate}
                      onChange={(e) => updateProject(index, "startDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Data de Conclusão</label>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`current-project-${index}`}
                          checked={project.current}
                          onCheckedChange={(checked) => {
                            updateProject(index, "current", checked);
                            if (checked) {
                              updateProject(index, "endDate", "");
                            }
                          }}
                        />
                        <label 
                          htmlFor={`current-project-${index}`}
                          className="text-xs text-muted-foreground"
                        >
                          Em andamento
                        </label>
                      </div>
                    </div>
                    <Input
                      type="date"
                      value={project.endDate || ""}
                      onChange={(e) => updateProject(index, "endDate", e.target.value)}
                      disabled={project.current}
                      className="mt-1"
                    />
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
        onClick={addProject}
      >
        <Briefcase className="mr-2 h-4 w-4" />
        Adicionar Projeto
      </Button>
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

// Implementação do formulário para Trabalho Voluntário
const VolunteerWorkForm: React.FC<ExtendedSectionFormProps> = ({ resumeData, updateResumeData }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  // Obtém os trabalhos voluntários do resumeData
  const volunteerWorks = resumeData.personalCategories.volunteerWork || [];

  // Adiciona um novo trabalho voluntário
  const addVolunteerWork = () => {
    const newVolunteerWork: VolunteerWork = {
      id: uuidv4(),
      organization: "",
      role: "",
      startDate: "",
      current: false,
      description: "",
    };
    
    const updatedVolunteerWorks = [...volunteerWorks, newVolunteerWork];
    updateResumeData("personalCategories", {
      ...resumeData.personalCategories,
      volunteerWork: updatedVolunteerWorks
    });
  };

  // Atualiza um trabalho voluntário existente
  const updateVolunteerWork = (index: number, field: keyof VolunteerWork, value: any) => {
    const updatedVolunteerWorks = [...volunteerWorks];
    updatedVolunteerWorks[index] = {
      ...updatedVolunteerWorks[index],
      [field]: value
    };
    
    updateResumeData("personalCategories", {
      ...resumeData.personalCategories,
      volunteerWork: updatedVolunteerWorks
    });
  };

  // Remove um trabalho voluntário
  const removeVolunteerWork = (index: number) => {
    const updatedVolunteerWorks = [...volunteerWorks];
    updatedVolunteerWorks.splice(index, 1);
    
    updateResumeData("personalCategories", {
      ...resumeData.personalCategories,
      volunteerWork: updatedVolunteerWorks
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
        {volunteerWorks.map((work, index) => (
          <AccordionItem key={work.id} value={work.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {work.organization || `Trabalho Voluntário ${index + 1}`}
              </AccordionTrigger>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  removeVolunteerWork(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Organização*</label>
                  <Input
                    value={work.organization}
                    onChange={(e) => updateVolunteerWork(index, "organization", e.target.value)}
                    placeholder="Ex: Cruz Vermelha, ONG Amigos da Vida"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Função*</label>
                  <Input
                    value={work.role}
                    onChange={(e) => updateVolunteerWork(index, "role", e.target.value)}
                    placeholder="Ex: Organizador de Eventos, Tutor"
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Data de Início*</label>
                    <Input
                      type="date"
                      value={work.startDate}
                      onChange={(e) => updateVolunteerWork(index, "startDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Data de Término</label>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`current-volunteer-${index}`}
                          checked={work.current}
                          onCheckedChange={(checked) => {
                            updateVolunteerWork(index, "current", checked);
                            if (checked) {
                              updateVolunteerWork(index, "endDate", "");
                            }
                          }}
                        />
                        <label 
                          htmlFor={`current-volunteer-${index}`}
                          className="text-xs text-muted-foreground"
                        >
                          Atual
                        </label>
                      </div>
                    </div>
                    <Input
                      type="date"
                      value={work.endDate || ""}
                      onChange={(e) => updateVolunteerWork(index, "endDate", e.target.value)}
                      disabled={work.current}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Descrição (opcional)</label>
                  <Textarea
                    value={work.description || ""}
                    onChange={(e) => updateVolunteerWork(index, "description", e.target.value)}
                    placeholder="Descreva suas atividades e realizações neste trabalho voluntário"
                    className="mt-1"
                    rows={3}
                  />
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
        onClick={addVolunteerWork}
      >
        <Handshake className="mr-2 h-4 w-4" />
        Adicionar Trabalho Voluntário
      </Button>
    </div>
  );
};
