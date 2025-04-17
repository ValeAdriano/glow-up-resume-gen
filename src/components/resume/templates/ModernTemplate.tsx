
import { ResumeData } from "@/types";

interface ModernTemplateProps {
  resumeData: ResumeData;
}

const ModernTemplate = ({ resumeData }: ModernTemplateProps) => {
  const { personalInfo, objective, education, experience, skills, certifications, links } = resumeData;
  
  // Função para formatar datas
  const formatDate = (dateStr?: string, current?: boolean) => {
    if (!dateStr) return current ? "Atual" : "";
    
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "short",
    }).format(date);
  };

  return (
    <div className="p-8 font-sans" style={{ color: "var(--resume-modern-text, #1f2937)" }}>
      {/* Cabeçalho */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--resume-modern-primary, #3b82f6)" }}>
          {personalInfo.fullName || "Nome Completo"}
        </h1>
        <h2 className="text-xl font-medium mb-4">
          {personalInfo.jobTitle || "Cargo Desejado"}
        </h2>
        
        <div className="flex flex-wrap gap-3 text-sm">
          {personalInfo.email && (
            <div>
              <strong>E-mail:</strong> {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div>
              <strong>Telefone:</strong> {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div>
              <strong>Localização:</strong> {personalInfo.location}
            </div>
          )}
        </div>
      </header>

      {/* Objetivo */}
      {objective && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Objetivo Profissional
          </h3>
          <p>{objective}</p>
        </section>
      )}

      {/* Experiência */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-4 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Experiência Profissional
          </h3>
          
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{exp.position}</h4>
                <span className="text-sm" style={{ color: "var(--resume-modern-accent, #1e3a8a)" }}>
                  {formatDate(exp.startDate)} - {exp.current ? "Atual" : formatDate(exp.endDate)}
                </span>
              </div>
              <div className="text-sm mb-2 font-medium">{exp.company}</div>
              <p className="text-sm">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Formação */}
      {education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-4 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Formação Acadêmica
          </h3>
          
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{edu.degree}</h4>
                <span className="text-sm" style={{ color: "var(--resume-modern-accent, #1e3a8a)" }}>
                  {formatDate(edu.startDate)} - {edu.current ? "Atual" : formatDate(edu.endDate)}
                </span>
              </div>
              <div className="text-sm mb-1">{edu.institution}</div>
              {edu.description && <p className="text-sm">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Habilidades */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Habilidades
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span 
                key={skill.id} 
                className="px-3 py-1 rounded-full text-sm" 
                style={{ 
                  backgroundColor: "var(--resume-modern-secondary, #f3f4f6)",
                  color: "var(--resume-modern-accent, #1e3a8a)"
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certificações */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Certificações
          </h3>
          
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{cert.name}</h4>
                <span className="text-sm" style={{ color: "var(--resume-modern-accent, #1e3a8a)" }}>
                  {formatDate(cert.date)}
                </span>
              </div>
              <div className="text-sm mb-1">{cert.issuer}</div>
              {cert.description && <p className="text-sm">{cert.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Links */}
      {links.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Links
          </h3>
          
          <div className="flex flex-wrap gap-4">
            {links.map((link) => (
              <a 
                key={link.id} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm underline" 
                style={{ color: "var(--resume-modern-primary, #3b82f6)" }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
