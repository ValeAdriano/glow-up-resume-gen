
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlusCircle, Trash2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  TechnicalSkill, Project, Language, ExtracurricularCourse,
  Publication, VolunteerWork, AcademicActivity, Event,
  InternationalExperience, AwardRecognition, SoftSkill, 
  Reference, Availability
} from "@/types";
import { ResumeData } from "@/types";

interface ExtendedSectionFormProps {
  sectionType: string;
  resumeData: ResumeData;
  updateResumeData: (type: string, data: any) => void;
}

export const ExtendedSectionForm = ({ sectionType, resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  switch (sectionType) {
    case "technicalSkills":
      return <TechnicalSkillsForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "projects":
      return <ProjectsForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "languages":
      return <LanguagesForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "extracurricularCourses":
      return <ExtracurricularCoursesForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "publications":
      return <PublicationsForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "volunteerWork":
      return <VolunteerWorkForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "academicActivities":
      return <AcademicActivitiesForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "events":
      return <EventsForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "internationalExperience":
      return <InternationalExperienceForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "awardsRecognitions":
      return <AwardsRecognitionsForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "professionalInterests":
      return <ProfessionalInterestsForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "softSkills":
      return <SoftSkillsForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "availability":
      return <AvailabilityForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    case "references":
      return <ReferencesForm resumeData={resumeData} updateResumeData={updateResumeData} />;
    default:
      return <div>Componente não implementado para este tipo de seção</div>;
  }
};

// Technical Skills Form
const TechnicalSkillsForm = ({ resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  const skills = resumeData.technicalCategories?.technicalSkills || [];

  const addSkill = () => {
    const newSkill: TechnicalSkill = {
      id: uuidv4(),
      name: "",
      type: "",
      proficiency: 0,
    };
    updateResumeData("technicalCategories.technicalSkills", [...skills, newSkill]);
  };

  const updateSkill = (index: number, field: keyof TechnicalSkill, value: any) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value,
    };
    updateResumeData("technicalCategories.technicalSkills", updatedSkills);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    updateResumeData("technicalCategories.technicalSkills", updatedSkills);
  };

  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <div key={skill.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
          <Input
            value={skill.name}
            onChange={(e) => updateSkill(index, "name", e.target.value)}
            placeholder="Nome da habilidade"
          />
          <Input
            value={skill.type}
            onChange={(e) => updateSkill(index, "type", e.target.value)}
            placeholder="Tipo (Linguagem, Ferramenta, etc)"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => removeSkill(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={addSkill}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Habilidade Técnica
      </Button>
    </div>
  );
};

// Projects Form
const ProjectsForm = ({ resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const projects = resumeData.technicalCategories?.projects || [];

  const addProject = () => {
    const newId = uuidv4();
    const newProject: Project = {
      id: newId,
      name: "",
      description: "",
      technologies: [],
      startDate: "",
      current: false,
    };
    updateResumeData("technicalCategories.projects", [...projects, newProject]);
    setOpenItems([...openItems, newId]);
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...projects];
    
    if (field === "technologies" && typeof value === "string") {
      // Handle technologies as comma-separated string
      updatedProjects[index] = {
        ...updatedProjects[index],
        technologies: value.split(',').map(tech => tech.trim()).filter(Boolean),
      };
    } else {
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };
    }
    
    updateResumeData("technicalCategories.projects", updatedProjects);
  };

  const removeProject = (index: number) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    updateResumeData("technicalCategories.projects", updatedProjects);
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
                    placeholder="Nome do projeto"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Descrição*</label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, "description", e.target.value)}
                    placeholder="Descrição do projeto"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Tecnologias utilizadas</label>
                  <Input
                    value={project.technologies.join(', ')}
                    onChange={(e) => updateProject(index, "technologies", e.target.value)}
                    placeholder="React, Node.js, MongoDB, etc. (separados por vírgula)"
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Data de início*</label>
                    <Input
                      type="month"
                      value={project.startDate}
                      onChange={(e) => updateProject(index, "startDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Data de conclusão</label>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={project.current}
                          onCheckedChange={(checked) => updateProject(index, "current", checked)}
                        />
                        <span className="text-xs">Em andamento</span>
                      </div>
                    </div>
                    <Input
                      type="month"
                      value={project.endDate || ""}
                      onChange={(e) => updateProject(index, "endDate", e.target.value)}
                      disabled={project.current}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">URL do projeto (opcional)</label>
                  <Input
                    value={project.url || ""}
                    onChange={(e) => updateProject(index, "url", e.target.value)}
                    placeholder="https://..."
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
        onClick={addProject}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Projeto
      </Button>
    </div>
  );
};

// Languages Form
const LanguagesForm = ({ resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  const languages = resumeData.technicalCategories?.languages || [];

  const addLanguage = () => {
    const newLanguage: Language = {
      id: uuidv4(),
      name: "",
      proficiency: "intermediário",
    };
    updateResumeData("technicalCategories.languages", [...languages, newLanguage]);
  };

  const updateLanguage = (index: number, field: keyof Language, value: any) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value,
    };
    updateResumeData("technicalCategories.languages", updatedLanguages);
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    updateResumeData("technicalCategories.languages", updatedLanguages);
  };

  const proficiencyLevels = [
    { value: "básico", label: "Básico" },
    { value: "intermediário", label: "Intermediário" },
    { value: "avançado", label: "Avançado" },
    { value: "fluente", label: "Fluente" },
    { value: "nativo", label: "Nativo" }
  ];

  return (
    <div className="space-y-4">
      {languages.map((language, index) => (
        <div key={language.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
          <Input
            value={language.name}
            onChange={(e) => updateLanguage(index, "name", e.target.value)}
            placeholder="Nome do idioma"
          />
          <Select
            value={language.proficiency}
            onValueChange={(value: any) => updateLanguage(index, "proficiency", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent>
              {proficiencyLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => removeLanguage(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={addLanguage}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Idioma
      </Button>
    </div>
  );
};

// Extracurricular Courses Form
const ExtracurricularCoursesForm = ({ resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const courses = resumeData.technicalCategories?.extracurricularCourses || [];

  const addCourse = () => {
    const newId = uuidv4();
    const newCourse: ExtracurricularCourse = {
      id: newId,
      name: "",
      institution: "",
      date: "",
    };
    updateResumeData("technicalCategories.extracurricularCourses", [...courses, newCourse]);
    setOpenItems([...openItems, newId]);
  };

  const updateCourse = (index: number, field: keyof ExtracurricularCourse, value: any) => {
    const updatedCourses = [...courses];
    updatedCourses[index] = {
      ...updatedCourses[index],
      [field]: value,
    };
    updateResumeData("technicalCategories.extracurricularCourses", updatedCourses);
  };

  const removeCourse = (index: number) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    updateResumeData("technicalCategories.extracurricularCourses", updatedCourses);
  };

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-4"
      >
        {courses.map((course, index) => (
          <AccordionItem key={course.id} value={course.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {course.name || `Curso ${index + 1}`}
              </AccordionTrigger>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCourse(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nome do Curso*</label>
                  <Input
                    value={course.name}
                    onChange={(e) => updateCourse(index, "name", e.target.value)}
                    placeholder="Nome do curso"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Instituição*</label>
                  <Input
                    value={course.institution}
                    onChange={(e) => updateCourse(index, "institution", e.target.value)}
                    placeholder="Nome da instituição"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Data de conclusão*</label>
                  <Input
                    type="month"
                    value={course.date}
                    onChange={(e) => updateCourse(index, "date", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Descrição (opcional)</label>
                  <Textarea
                    value={course.description || ""}
                    onChange={(e) => updateCourse(index, "description", e.target.value)}
                    placeholder="Descrição do curso"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">URL (opcional)</label>
                  <Input
                    value={course.url || ""}
                    onChange={(e) => updateCourse(index, "url", e.target.value)}
                    placeholder="https://..."
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
        onClick={addCourse}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Curso Extracurricular
      </Button>
    </div>
  );
};

// Publications Form
const PublicationsForm = ({ resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const publications = resumeData.technicalCategories?.publications || [];

  const addPublication = () => {
    const newId = uuidv4();
    const newPublication: Publication = {
      id: newId,
      title: "",
      publisher: "",
      date: "",
      type: "article",
    };
    updateResumeData("technicalCategories.publications", [...publications, newPublication]);
    setOpenItems([...openItems, newId]);
  };

  const updatePublication = (index: number, field: keyof Publication, value: any) => {
    const updatedPublications = [...publications];
    updatedPublications[index] = {
      ...updatedPublications[index],
      [field]: value,
    };
    updateResumeData("technicalCategories.publications", updatedPublications);
  };

  const removePublication = (index: number) => {
    const updatedPublications = [...publications];
    updatedPublications.splice(index, 1);
    updateResumeData("technicalCategories.publications", updatedPublications);
  };

  const publicationTypes = [
    { value: "article", label: "Artigo Científico" },
    { value: "blog", label: "Post de Blog" },
    { value: "book", label: "Livro" },
    { value: "other", label: "Outro" },
  ];

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-4"
      >
        {publications.map((publication, index) => (
          <AccordionItem key={publication.id} value={publication.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {publication.title || `Publicação ${index + 1}`}
              </AccordionTrigger>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  removePublication(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Título*</label>
                  <Input
                    value={publication.title}
                    onChange={(e) => updatePublication(index, "title", e.target.value)}
                    placeholder="Título da publicação"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Tipo de Publicação*</label>
                  <Select
                    value={publication.type}
                    onValueChange={(value: any) => updatePublication(index, "type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de publicação" />
                    </SelectTrigger>
                    <SelectContent>
                      {publicationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Editora/Publisher*</label>
                  <Input
                    value={publication.publisher}
                    onChange={(e) => updatePublication(index, "publisher", e.target.value)}
                    placeholder="Nome da editora ou publisher"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Data de Publicação*</label>
                  <Input
                    type="month"
                    value={publication.date}
                    onChange={(e) => updatePublication(index, "date", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Descrição (opcional)</label>
                  <Textarea
                    value={publication.description || ""}
                    onChange={(e) => updatePublication(index, "description", e.target.value)}
                    placeholder="Breve descrição da publicação"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">URL (opcional)</label>
                  <Input
                    value={publication.url || ""}
                    onChange={(e) => updatePublication(index, "url", e.target.value)}
                    placeholder="https://..."
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
        onClick={addPublication}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Publicação
      </Button>
    </div>
  );
};

// Volunteer Work Form
const VolunteerWorkForm = ({ resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const volunteerWork = resumeData.personalCategories?.volunteerWork || [];

  const addVolunteerWork = () => {
    const newId = uuidv4();
    const newVolunteerWork: VolunteerWork = {
      id: newId,
      organization: "",
      role: "",
      startDate: "",
      current: false,
    };
    updateResumeData("personalCategories.volunteerWork", [...volunteerWork, newVolunteerWork]);
    setOpenItems([...openItems, newId]);
  };

  const updateVolunteerWork = (index: number, field: keyof VolunteerWork, value: any) => {
    const updatedVolunteerWork = [...volunteerWork];
    updatedVolunteerWork[index] = {
      ...updatedVolunteerWork[index],
      [field]: value,
    };
    updateResumeData("personalCategories.volunteerWork", updatedVolunteerWork);
  };

  const removeVolunteerWork = (index: number) => {
    const updatedVolunteerWork = [...volunteerWork];
    updatedVolunteerWork.splice(index, 1);
    updateResumeData("personalCategories.volunteerWork", updatedVolunteerWork);
  };

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-4"
      >
        {volunteerWork.map((work, index) => (
          <AccordionItem key={work.id} value={work.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {work.organization || `Trabalho voluntário ${index + 1}`}
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
                    placeholder="Nome da organização"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Cargo/Função*</label>
                  <Input
                    value={work.role}
                    onChange={(e) => updateVolunteerWork(index, "role", e.target.value)}
                    placeholder="Sua função"
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Data de início*</label>
                    <Input
                      type="month"
                      value={work.startDate}
                      onChange={(e) => updateVolunteerWork(index, "startDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Data de término</label>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={work.current}
                          onCheckedChange={(checked) => updateVolunteerWork(index, "current", checked)}
                        />
                        <span className="text-xs">Atual</span>
                      </div>
                    </div>
                    <Input
                      type="month"
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
                    placeholder="Descreva suas atividades e resultados"
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
        onClick={addVolunteerWork}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Trabalho Voluntário
      </Button>
    </div>
  );
};

// Academic Activities Form
const AcademicActivitiesForm = ({ resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const academicActivities = resumeData.personalCategories?.academicActivities || [];

  const addAcademicActivity = () => {
    const newId = uuidv4();
    const newActivity: AcademicActivity = {
      id: newId,
      name: "",
      type: "monitoria",
      institution: "",
      startDate: "",
      current: false,
    };
    updateResumeData("personalCategories.academicActivities", [...academicActivities, newActivity]);
    setOpenItems([...openItems, newId]);
  };

  const updateAcademicActivity = (index: number, field: keyof AcademicActivity, value: any) => {
    const updatedActivities = [...academicActivities];
    updatedActivities[index] = {
      ...updatedActivities[index],
      [field]: value,
    };
    updateResumeData("personalCategories.academicActivities", updatedActivities);
  };

  const removeAcademicActivity = (index: number) => {
    const updatedActivities = [...academicActivities];
    updatedActivities.splice(index, 1);
    updateResumeData("personalCategories.academicActivities", updatedActivities);
  };

  const activityTypes = [
    { value: "monitoria", label: "Monitoria" },
    { value: "pesquisa", label: "Pesquisa" },
    { value: "iniciação científica", label: "Iniciação Científica" },
    { value: "outro", label: "Outro" },
  ];

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-4"
      >
        {academicActivities.map((activity, index) => (
          <AccordionItem key={activity.id} value={activity.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {activity.name || `Atividade acadêmica ${index + 1}`}
              </AccordionTrigger>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  removeAcademicActivity(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nome da Atividade*</label>
                  <Input
                    value={activity.name}
                    onChange={(e) => updateAcademicActivity(index, "name", e.target.value)}
                    placeholder="Nome da atividade"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Tipo de Atividade*</label>
                  <Select
                    value={activity.type}
                    onValueChange={(value: any) => updateAcademicActivity(index, "type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de atividade" />
                    </SelectTrigger>
                    <SelectContent>
                      {activityTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Instituição*</label>
                  <Input
                    value={activity.institution}
                    onChange={(e) => updateAcademicActivity(index, "institution", e.target.value)}
                    placeholder="Nome da instituição"
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Data de início*</label>
                    <Input
                      type="month"
                      value={activity.startDate}
                      onChange={(e) => updateAcademicActivity(index, "startDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Data de término</label>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={activity.current}
                          onCheckedChange={(checked) => updateAcademicActivity(index, "current", checked)}
                        />
                        <span className="text-xs">Atual</span>
                      </div>
                    </div>
                    <Input
                      type="month"
                      value={activity.endDate || ""}
                      onChange={(e) => updateAcademicActivity(index, "endDate", e.target.value)}
                      disabled={activity.current}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Descrição (opcional)</label>
                  <Textarea
                    value={activity.description || ""}
                    onChange={(e) => updateAcademicActivity(index, "description", e.target.value)}
                    placeholder="Descreva sua participação e resultados"
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
        onClick={addAcademicActivity}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Atividade Acadêmica
      </Button>
    </div>
  );
};

// Events Form
const EventsForm = ({ resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const events = resumeData.personalCategories?.events || [];

  const addEvent = () => {
    const newId = uuidv4();
    const newEvent: Event = {
      id: newId,
      name: "",
      type: "feira",
      location: "",
      date: "",
      role: "",
    };
    updateResumeData("personalCategories.events", [...events, newEvent]);
    setOpenItems([...openItems, newId]);
  };

  const updateEvent = (index: number, field: keyof Event, value: any) => {
    const updatedEvents = [...events];
    updatedEvents[index] = {
      ...updatedEvents[index],
      [field]: value,
    };
    updateResumeData("personalCategories.events", updatedEvents);
  };

  const removeEvent = (index: number) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    updateResumeData("personalCategories.events", updatedEvents);
  };

  const eventTypes = [
    { value: "feira", label: "Feira" },
    { value: "congresso", label: "Congresso" },
    { value: "hackathon", label: "Hackathon" },
    { value: "palestra", label: "Palestra" },
    { value: "outro", label: "Outro" },
  ];

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-4"
      >
        {events.map((event, index) => (
          <AccordionItem key={event.id} value={event.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {event.name || `Evento ${index + 1}`}
              </AccordionTrigger>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  removeEvent(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nome do Evento*</label>
                  <Input
                    value={event.name}
                    onChange={(e) => updateEvent(index, "name", e.target.value)}
                    placeholder="Nome do evento"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Tipo de Evento*</label>
                  <Select
                    value={event.type}
                    onValueChange={(value: any) => updateEvent(index, "type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de evento" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Local*</label>
                  <Input
                    value={event.location}
                    onChange={(e) => updateEvent(index, "location", e.target.value)}
                    placeholder="Local do evento"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Data*</label>
                  <Input
                    type="month"
                    value={event.date}
                    onChange={(e) => updateEvent(index, "date", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Papel/Função*</label>
                  <Input
                    value={event.role}
                    onChange={(e) => updateEvent(index, "role", e.target.value)}
                    placeholder="Participante, Palestrante, Organizador, etc."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Descrição (opcional)</label>
                  <Textarea
                    value={event.description || ""}
                    onChange={(e) => updateEvent(index, "description", e.target.value)}
                    placeholder="Descreva sua participação e realizações"
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
        onClick={addEvent}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Evento
      </Button>
    </div>
  );
};

// Remaining forms implementation follows similar patterns...

// This is just a sample of the first few forms, the others can be implemented following the same pattern.
// To avoid making this file too large, I'll provide just these forms as examples.

// International Experience Form
const InternationalExperienceForm = ({ resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const experiences = resumeData.personalCategories?.internationalExperience || [];

  const addExperience = () => {
    const newId = uuidv4();
    const newExperience: InternationalExperience = {
      id: newId,
      country: "",
      type: "estudo",
      startDate: "",
      current: false,
    };
    updateResumeData("personalCategories.internationalExperience", [...experiences, newExperience]);
    setOpenItems([...openItems, newId]);
  };

  const updateExperience = (index: number, field: keyof InternationalExperience, value: any) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };
    updateResumeData("personalCategories.internationalExperience", updatedExperiences);
  };

  const removeExperience = (index: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    updateResumeData("personalCategories.internationalExperience", updatedExperiences);
  };

  const experienceTypes = [
    { value: "estudo", label: "Estudo" },
    { value: "trabalho", label: "Trabalho" },
    { value: "voluntariado", label: "Voluntariado" },
    { value: "outro", label: "Outro" },
  ];

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-4"
      >
        {experiences.map((experience, index) => (
          <AccordionItem key={experience.id} value={experience.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {experience.country || `Experiência ${index + 1}`}
              </AccordionTrigger>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  removeExperience(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">País*</label>
                  <Input
                    value={experience.country}
                    onChange={(e) => updateExperience(index, "country", e.target.value)}
                    placeholder="Nome do país"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Tipo de Experiência*</label>
                  <Select
                    value={experience.type}
                    onValueChange={(value: any) => updateExperience(index, "type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de experiência" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Instituição (opcional)</label>
                  <Input
                    value={experience.institution || ""}
                    onChange={(e) => updateExperience(index, "institution", e.target.value)}
                    placeholder="Nome da instituição"
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Data de início*</label>
                    <Input
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Data de término</label>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={experience.current}
                          onCheckedChange={(checked) => updateExperience(index, "current", checked)}
                        />
                        <span className="text-xs">Atual</span>
                      </div>
                    </div>
                    <Input
                      type="month"
                      value={experience.endDate || ""}
                      onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                      disabled={experience.current}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Descrição (opcional)</label>
                  <Textarea
                    value={experience.description || ""}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    placeholder="Descreva sua experiência e aprendizados"
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
        onClick={addExperience}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Experiência Internacional
      </Button>
    </div>
  );
};

// Awards and Recognitions Form
const AwardsRecognitionsForm = ({ resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const awards = resumeData.personalCategories?.awardsRecognitions || [];

  const addAward = () => {
    const newId = uuidv4();
    const newAward: AwardRecognition = {
      id: newId,
      title: "",
      issuer: "",
      date: "",
    };
    updateResumeData("personalCategories.awardsRecognitions", [...awards, newAward]);
    setOpenItems([...openItems, newId]);
  };

  const updateAward = (index: number, field: keyof AwardRecognition, value: any) => {
    const updatedAwards = [...awards];
    updatedAwards[index] = {
      ...updatedAwards[index],
      [field]: value,
    };
    updateResumeData("personalCategories.awardsRecognitions", updatedAwards);
  };

  const removeAward = (index: number) => {
    const updatedAwards = [...awards];
    updatedAwards.splice(index, 1);
    updateResumeData("personalCategories.awardsRecognitions", updatedAwards);
  };

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-4"
      >
        {awards.map((award, index) => (
          <AccordionItem key={award.id} value={award.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {award.title || `Prêmio ${index + 1}`}
              </AccordionTrigger>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  removeAward(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Título do Prêmio*</label>
                  <Input
                    value={award.title}
                    onChange={(e) => updateAward(index, "title", e.target.value)}
                    placeholder="Nome do prêmio ou reconhecimento"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Concedido por*</label>
                  <Input
                    value={award.issuer}
                    onChange={(e) => updateAward(index, "issuer", e.target.value)}
                    placeholder="Nome da instituição ou organização"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Data*</label>
                  <Input
                    type="month"
                    value={award.date}
                    onChange={(e) => updateAward(index, "date", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Descrição (opcional)</label>
                  <Textarea
                    value={award.description || ""}
                    onChange={(e) => updateAward(index, "description", e.target.value)}
                    placeholder="Descreva o prêmio e sua relevância"
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
        onClick={addAward}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Prêmio ou Reconhecimento
      </Button>
    </div>
  );
};

// Professional Interests Form
const ProfessionalInterestsForm = ({ resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  const interests = resumeData.strategicCategories?.professionalInterests || [];

  const handleInterestsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const interestsList = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
    updateResumeData("strategicCategories.professionalInterests", interestsList);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">
          Interesses Profissionais (separados por vírgula)
        </label>
        <Textarea
          placeholder="Desenvolvimento Web, Inteligência Artificial, Design UX, etc."
          value={interests.join(', ')}
          onChange={handleInterestsChange}
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Liste áreas em que você tem interesse em atuar ou se especializar.
        </p>
      </div>
    </div>
  );
};

// Soft Skills Form
const SoftSkillsForm = ({ resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  const softSkills = resumeData.strategicCategories?.softSkills || [];

  const addSoftSkill = () => {
    const newSkill: SoftSkill = {
      id: uuidv4(),
      name: "",
    };
    updateResumeData("strategicCategories.softSkills", [...softSkills, newSkill]);
  };

  const updateSoftSkill = (index: number, field: keyof SoftSkill, value: any) => {
    const updatedSkills = [...softSkills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value,
    };
    updateResumeData("strategicCategories.softSkills", updatedSkills);
  };

  const removeSoftSkill = (index: number) => {
    const updatedSkills = [...softSkills];
    updatedSkills.splice(index, 1);
    updateResumeData("strategicCategories.softSkills", updatedSkills);
  };

  return (
    <div className="space-y-4">
      {softSkills.map((skill, index) => (
        <div key={skill.id} className="grid grid-cols-[1fr_auto] gap-2">
          <Input
            value={skill.name}
            onChange={(e) => updateSoftSkill(index, "name", e.target.value)}
            placeholder="Nome da habilidade interpessoal"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => removeSoftSkill(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={addSoftSkill}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Soft Skill
      </Button>
    </div>
  );
};

// Availability Form
const AvailabilityForm = ({ resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  const availability = resumeData.strategicCategories?.availability || {
    relocation: false,
    travel: false,
    remoteWork: false,
    workHours: 'integral',
    additionalInfo: ''
  };

  const updateAvailabilityField = (field: keyof Availability, value: any) => {
    updateResumeData("strategicCategories.availability", {
      ...availability,
      [field]: value,
    });
  };

  const workHoursOptions = [
    { value: "integral", label: "Período Integral" },
    { value: "meio período", label: "Meio Período" },
    { value: "flexível", label: "Horário Flexível" },
    { value: "outro", label: "Outro" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Disponibilidade para mudança</label>
        <Switch 
          checked={availability.relocation}
          onCheckedChange={(checked) => updateAvailabilityField("relocation", checked)}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Disponibilidade para viagens</label>
        <Switch 
          checked={availability.travel}
          onCheckedChange={(checked) => updateAvailabilityField("travel", checked)}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Disponibilidade para trabalho remoto</label>
        <Switch 
          checked={availability.remoteWork}
          onCheckedChange={(checked) => updateAvailabilityField("remoteWork", checked)}
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Preferência de jornada</label>
        <Select
          value={availability.workHours}
          onValueChange={(value: any) => updateAvailabilityField("workHours", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Escolha uma opção" />
          </SelectTrigger>
          <SelectContent>
            {workHoursOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium">Informações Adicionais</label>
        <Textarea
          placeholder="Outras informações sobre sua disponibilidade"
          value={availability.additionalInfo || ""}
          onChange={(e) => updateAvailabilityField("additionalInfo", e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};

// References Form
const ReferencesForm = ({ resumeData, updateResumeData }: ExtendedSectionFormProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const references = resumeData.strategicCategories?.references || [];

  const addReference = () => {
    const newId = uuidv4();
    const newReference: Reference = {
      id: newId,
      name: "",
      relationship: "",
      contact: "",
      available: true,
    };
    updateResumeData("strategicCategories.references", [...references, newReference]);
    setOpenItems([...openItems, newId]);
  };

  const updateReference = (index: number, field: keyof Reference, value: any) => {
    const updatedReferences = [...references];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value,
    };
    updateResumeData("strategicCategories.references", updatedReferences);
  };

  const removeReference = (index: number) => {
    const updatedReferences = [...references];
    updatedReferences.splice(index, 1);
    updateResumeData("strategicCategories.references", updatedReferences);
  };

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-4"
      >
        {references.map((reference, index) => (
          <AccordionItem key={reference.id} value={reference.id} className="border rounded-md">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="py-2 hover:no-underline">
                {reference.name || `Referência ${index + 1}`}
              </AccordionTrigger>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  removeReference(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nome*</label>
                  <Input
                    value={reference.name}
                    onChange={(e) => updateReference(index, "name", e.target.value)}
                    placeholder="Nome da referência"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Relacionamento*</label>
                  <Input
                    value={reference.relationship}
                    onChange={(e) => updateReference(index, "relationship", e.target.value)}
                    placeholder="Ex: Supervisor, Gerente, Professor, etc."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Empresa (opcional)</label>
                  <Input
                    value={reference.company || ""}
                    onChange={(e) => updateReference(index, "company", e.target.value)}
                    placeholder="Nome da empresa"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Contato*</label>
                  <Input
                    value={reference.contact}
                    onChange={(e) => updateReference(index, "contact", e.target.value)}
                    placeholder="Email ou telefone"
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Disponível mediante solicitação</label>
                  <Switch 
                    checked={reference.available}
                    onCheckedChange={(checked) => updateReference(index, "available", checked)}
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
        onClick={addReference}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Referência
      </Button>
    </div>
  );
};

export default ExtendedSectionForm;
