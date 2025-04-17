
import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  jobTitle: z.string().min(1, "Cargo desejado é obrigatório"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal(""))
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Nome da instituição é obrigatório"),
  degree: z.string().min(1, "Nome do curso é obrigatório"),
  startDate: z.string().min(1, "Data de início é obrigatória"),
  endDate: z.string().optional().or(z.literal("")),
  current: z.boolean().default(false),
  description: z.string().optional().or(z.literal(""))
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Nome da empresa é obrigatório"),
  position: z.string().min(1, "Cargo é obrigatório"),
  startDate: z.string().min(1, "Data de início é obrigatória"),
  endDate: z.string().optional().or(z.literal("")),
  current: z.boolean().default(false),
  description: z.string().min(1, "Descrição é obrigatória")
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome da habilidade é obrigatório"),
  level: z.number().optional(),
  category: z.string().optional().or(z.literal(""))
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome da certificação é obrigatório"),
  issuer: z.string().min(1, "Emissor é obrigatório"),
  date: z.string().min(1, "Data é obrigatória"),
  description: z.string().optional().or(z.literal("")),
  url: z.string().url("URL inválida").optional().or(z.literal(""))
});

export const linkSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome do link é obrigatório"),
  url: z.string().url("URL inválida").min(1, "URL é obrigatória")
});

export const resumeDataSchema = z.object({
  personalInfo: personalInfoSchema,
  objective: z.string().min(1, "Objetivo profissional é obrigatório"),
  education: z.array(educationSchema),
  experience: z.array(experienceSchema),
  skills: z.array(skillSchema),
  certifications: z.array(certificationSchema),
  links: z.array(linkSchema)
});

export const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
});

export const signUpSchema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirmação de senha é obrigatória")
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
});

export const createResumeSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  template: z.enum(["modern", "classic", "minimal"])
});
