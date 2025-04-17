
import { ResumeData } from "@/types";

interface MinimalTemplateProps {
  resumeData: ResumeData;
}

const MinimalTemplate = ({ resumeData }: MinimalTemplateProps) => {
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
    <div className="p-8 font-sans" style={{ color: "var(--resume-minimal-text, #27272a)" }}>
      {/* Cabeçalho */}
      <header className="mb-10">
        <h1 className="text-4xl font-normal tracking-tight mb-1" style={{ color: "var(--resume-minimal-primary, #18181b)" }}>
          {personalInfo.fullName || "Nome Completo"}
        </h1>
        <h2 className="text-xl mb-4" style={{ color: "var(--resume-minimal-accent, #71717a)" }}>
          {personalInfo.jobTitle || "Cargo Desejado"}
        </h2>
        
        <div className="flex flex-wrap gap-4 text-sm" style={{ color: "var(--resume-minimal-accent, #71717a)" }}>
          {personalInfo.email && (
            <div>{personalInfo.email}</div>
          )}
          {personalInfo.phone && (
            <div>{personalInfo.phone}</div>
          )}
          {personalInfo.location && (
            <div>{personalInfo.location}</div>
          )}
        </div>
      </header>

      {/* Objetivo */}
      {objective && (
        <section className="mb-10">
          <h3 className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "var(--resume-minimal-primary, #18181b)" }}>
            Objetivo
          </h3>
          <p>{objective}</p>
        </section>
      )}

      {/* Experiência */}
      {experience.length > 0 && (
        <section className="mb-10">
          <h3 className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "var(--resume-minimal-primary, #18181b)" }}>
            Experiência
          </h3>
          
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="mb-1">
                <span className="font-medium">{exp.position}</span>
                <span className="mx-2">·</span>
                <span>{exp.company}</span>
              </div>
              <div className="text-sm mb-2" style={{ color: "var(--resume-minimal-accent, #71717a)" }}>
                {formatDate(exp.startDate)} - {exp.current ? "Atual" : formatDate(exp.endDate)}
              </div>
              <p className="text-sm">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Formação */}
      {education.length > 0 && (
        <section className="mb-10">
          <h3 className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "var(--resume-minimal-primary, #18181b)" }}>
            Formação
          </h3>
          
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="mb-1">
                <span className="font-medium">{edu.degree}</span>
                <span className="mx-2">·</span>
                <span>{edu.institution}</span>
              </div>
              <div className="text-sm mb-1" style={{ color: "var(--resume-minimal-accent, #71717a)" }}>
                {formatDate(edu.startDate)} - {edu.current ? "Atual" : formatDate(edu.endDate)}
              </div>
              {edu.description && <p className="text-sm">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Habilidades */}
      {skills.length > 0 && (
        <section className="mb-10">
          <h3 className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "var(--resume-minimal-primary, #18181b)" }}>
            Habilidades
          </h3>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {skills.map((skill) => (
              <span key={skill.id}>{skill.name}</span>
            ))}
          </div>
        </section>
      )}

      {/* Certificações */}
      {certifications.length > 0 && (
        <section className="mb-10">
          <h3 className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "var(--resume-minimal-primary, #18181b)" }}>
            Certificações
          </h3>
          
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-3">
              <div className="mb-1">
                <span className="font-medium">{cert.name}</span>
                <span className="mx-2">·</span>
                <span>{cert.issuer}</span>
              </div>
              <div className="text-sm mb-1" style={{ color: "var(--resume-minimal-accent, #71717a)" }}>
                {formatDate(cert.date)}
              </div>
              {cert.description && <p className="text-sm">{cert.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Links */}
      {links.length > 0 && (
        <section className="mb-10">
          <h3 className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "var(--resume-minimal-primary, #18181b)" }}>
            Links
          </h3>
          
          <div className="flex flex-wrap gap-4">
            {links.map((link) => (
              <a 
                key={link.id} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm"
                style={{ color: "var(--resume-minimal-primary, #18181b)" }}
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

export default MinimalTemplate;
