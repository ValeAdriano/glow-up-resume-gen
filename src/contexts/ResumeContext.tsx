
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Resume, ResumeData, Template } from "../types";
import { useAuth } from "./AuthContext";
import { v4 as uuidv4 } from "uuid";

interface ResumeContextType {
  resumes: Resume[];
  currentResume: Resume | null;
  loading: boolean;
  createResume: (title: string, template: Template) => Promise<Resume>;
  updateResume: (id: string, data: ResumeData) => Promise<void>;
  updateResumeTemplate: (id: string, template: Template) => Promise<void>;
  deleteResume: (id: string) => Promise<void>;
  loadResume: (id: string) => Promise<void>;
  saveCurrentResume: () => Promise<void>;
}

// Função auxiliar para criar um currículo vazio
const createEmptyResume = (userId: string, title: string, template: Template): Resume => {
  const now = new Date().toISOString();
  return {
    id: uuidv4(),
    userId,
    title,
    createdAt: now,
    updatedAt: now,
    template,
    data: {
      personalInfo: {
        fullName: "",
        jobTitle: ""
      },
      objective: "",
      education: [],
      experience: [],
      skills: [],
      certifications: [],
      links: []
    }
  };
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Carrega os currículos do usuário quando ele faz login
  useEffect(() => {
    if (user) {
      loadUserResumes();
    } else {
      setResumes([]);
      setCurrentResume(null);
    }
  }, [user]);

  // Função para carregar os currículos do usuário
  const loadUserResumes = async () => {
    setLoading(true);
    try {
      // Aqui você implementará a lógica para buscar currículos do Supabase
      // Por enquanto, vamos usar o localStorage para simular
      const storedResumes = localStorage.getItem(`resumes_${user?.id}`);
      if (storedResumes) {
        setResumes(JSON.parse(storedResumes));
      } else {
        setResumes([]);
      }
    } catch (error) {
      console.error("Error loading resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Funções de gerenciamento de currículos
  const createResume = async (title: string, template: Template): Promise<Resume> => {
    if (!user) throw new Error("User must be logged in to create a resume");

    setLoading(true);
    try {
      const newResume = createEmptyResume(user.id, title, template);
      
      // Adiciona o novo currículo à lista
      const updatedResumes = [...resumes, newResume];
      setResumes(updatedResumes);
      setCurrentResume(newResume);
      
      // Salva no localStorage (temporário até integrar com Supabase)
      localStorage.setItem(`resumes_${user.id}`, JSON.stringify(updatedResumes));
      
      return newResume;
    } catch (error) {
      console.error("Error creating resume:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateResume = async (id: string, data: ResumeData): Promise<void> => {
    if (!user) throw new Error("User must be logged in to update a resume");

    setLoading(true);
    try {
      const updatedResumes = resumes.map(resume => {
        if (resume.id === id) {
          const updatedResume = {
            ...resume,
            data,
            updatedAt: new Date().toISOString()
          };
          
          if (currentResume?.id === id) {
            setCurrentResume(updatedResume);
          }
          
          return updatedResume;
        }
        return resume;
      });
      
      setResumes(updatedResumes);
      localStorage.setItem(`resumes_${user.id}`, JSON.stringify(updatedResumes));
    } catch (error) {
      console.error("Error updating resume:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateResumeTemplate = async (id: string, template: Template): Promise<void> => {
    if (!user) throw new Error("User must be logged in to update a resume");

    setLoading(true);
    try {
      const updatedResumes = resumes.map(resume => {
        if (resume.id === id) {
          const updatedResume = {
            ...resume,
            template,
            updatedAt: new Date().toISOString()
          };
          
          if (currentResume?.id === id) {
            setCurrentResume(updatedResume);
          }
          
          return updatedResume;
        }
        return resume;
      });
      
      setResumes(updatedResumes);
      localStorage.setItem(`resumes_${user.id}`, JSON.stringify(updatedResumes));
    } catch (error) {
      console.error("Error updating resume template:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id: string): Promise<void> => {
    if (!user) throw new Error("User must be logged in to delete a resume");

    setLoading(true);
    try {
      const updatedResumes = resumes.filter(resume => resume.id !== id);
      
      setResumes(updatedResumes);
      
      if (currentResume?.id === id) {
        setCurrentResume(null);
      }
      
      localStorage.setItem(`resumes_${user.id}`, JSON.stringify(updatedResumes));
    } catch (error) {
      console.error("Error deleting resume:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadResume = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      const resume = resumes.find(r => r.id === id);
      if (resume) {
        setCurrentResume(resume);
      } else {
        throw new Error("Resume not found");
      }
    } catch (error) {
      console.error("Error loading resume:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const saveCurrentResume = async (): Promise<void> => {
    if (!currentResume || !user) return;
    
    setLoading(true);
    try {
      const updatedResumes = resumes.map(resume => {
        if (resume.id === currentResume.id) {
          return {
            ...currentResume,
            updatedAt: new Date().toISOString()
          };
        }
        return resume;
      });
      
      setResumes(updatedResumes);
      localStorage.setItem(`resumes_${user.id}`, JSON.stringify(updatedResumes));
    } catch (error) {
      console.error("Error saving resume:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResumeContext.Provider value={{
      resumes,
      currentResume,
      loading,
      createResume,
      updateResume,
      updateResumeTemplate,
      deleteResume,
      loadResume,
      saveCurrentResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
