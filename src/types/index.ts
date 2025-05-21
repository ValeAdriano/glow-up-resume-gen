
export type Template = "modern" | "classic" | "minimal";

export interface Resume {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  template: Template;
  data: ResumeData;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  objective: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  certifications: Certification[];
  links: Link[];
  technicalCategories: TechnicalCategory;
  personalCategories: PersonalCategory;
  strategicCategories: StrategicCategory;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email?: string;
  phone?: string;
  location?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: number;
  category?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
  url?: string;
}

export interface Link {
  id: string;
  name: string;
  url: string;
}

// New Technical and Complementary Categories
export interface TechnicalCategory {
  technicalSkills: TechnicalSkill[];
  certifications: ExtendedCertification[];
  projects: Project[];
  languages: Language[];
  extracurricularCourses: ExtracurricularCourse[];
  publications: Publication[];
}

export interface TechnicalSkill {
  id: string;
  name: string;
  type: string; // Tool, Programming Language, Software, etc.
  proficiency?: number;
}

export interface ExtendedCertification {
  id: string;
  name: string;
  issuer: string;
  platform: string;
  date: string;
  description?: string;
  url?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  role?: string;
  technologies: string[];
  url?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'básico' | 'intermediário' | 'avançado' | 'fluente' | 'nativo';
}

export interface ExtracurricularCourse {
  id: string;
  name: string;
  institution: string;
  date: string;
  description?: string;
  url?: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  type: 'article' | 'blog' | 'book' | 'other';
  url?: string;
  description?: string;
}

// New Personal and Academic Highlight Categories
export interface PersonalCategory {
  volunteerWork: VolunteerWork[];
  academicActivities: AcademicActivity[];
  events: Event[];
  internationalExperience: InternationalExperience[];
  awardsRecognitions: AwardRecognition[];
}

export interface VolunteerWork {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface AcademicActivity {
  id: string;
  name: string;
  type: 'monitoria' | 'pesquisa' | 'iniciação científica' | 'outro';
  institution: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Event {
  id: string;
  name: string;
  type: 'feira' | 'congresso' | 'hackathon' | 'palestra' | 'outro';
  location: string;
  date: string;
  role: string;
  description?: string;
}

export interface InternationalExperience {
  id: string;
  country: string;
  institution?: string;
  type: 'estudo' | 'trabalho' | 'voluntariado' | 'outro';
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface AwardRecognition {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

// New Optional and Strategic Categories
export interface StrategicCategory {
  professionalInterests: string[];
  softSkills: SoftSkill[];
  availability: Availability;
  references: Reference[];
}

export interface SoftSkill {
  id: string;
  name: string;
  description?: string;
}

export interface Availability {
  relocation: boolean;
  travel: boolean;
  remoteWork: boolean;
  workHours: 'integral' | 'meio período' | 'flexível' | 'outro';
  additionalInfo?: string;
}

export interface Reference {
  id: string;
  name: string;
  relationship: string;
  company?: string;
  contact: string;
  available: boolean;
}
