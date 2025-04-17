
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

export interface User {
  id: string;
  email: string;
  fullName?: string;
}
