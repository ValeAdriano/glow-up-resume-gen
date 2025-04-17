
import { ResumeData } from "@/types";

interface ClassicTemplateProps {
  resumeData: ResumeData;
}

const ClassicTemplate = ({ resumeData }: ClassicTemplateProps) => {
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
    <div className="p-8 font-serif" style={{ color: "var(--resume-classic-text, #0f172a)" }}>
      {/* Cabeçalho */}
      <header className="text-center mb-8 pb-4 border-b-2" style={{ borderColor: "var(--resume-classic-primary, #334155)" }}>
        <h1 className="text-3xl font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--resume-classic-primary, #334155)" }}>
          {personalInfo.fullName || "Nome Completo"}
        </h1>
        <h2 className="text-xl mb-4">
          {personalInfo.jobTitle || "Cargo Desejado"}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm">
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
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-3 uppercase tracking-wider text-center" style={{ color: "var(--resume-classic-primary, #334155)" }}>
            Objetivo Profissional
          </h3>
          <p className="text-center">{objective}</p>
        </section>
      )}

      {/* Experiência */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-center" style={{ color: "var(--resume-classic-primary, #334155)" }}>
            Experiência Profissional
          </h3>
          
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold">{exp.position}</h4>
                <span className="italic" style={{ color: "var(--resume-classic-accent, #64748b)" }}>
                  {formatDate(exp.startDate)} - {exp.current ? "Atual" : formatDate(exp.endDate)}
                </span>
              </div>
              <div className="font-bold mb-2" style={{ color: "var(--resume-classic-accent, #64748b)" }}>{exp.company}</div>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Formação */}
      {education.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-center" style={{ color: "var(--resume-classic-primary, #334155)" }}>
            Formação Acadêmica
          </h3>
          
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold">{edu.degree}</h4>
                <span className="italic" style={{ color: "var(--resume-classic-accent, #64748b)" }}>
                  {formatDate(edu.startDate)} - {edu.current ? "Atual" : formatDate(edu.endDate)}
                </span>
              </div>
              <div className="mb-1">{edu.institution}</div>
              {edu.description && <p>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Habilidades */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-3 uppercase tracking-wider text-center" style={{ color: "var(--resume-classic-primary, #334155)" }}>
            Habilidades
          </h3>
          
          <ul className="list-disc pl-5 grid grid-cols-2 gap-1">
            {skills.map((skill) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Certificações */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-3 uppercase tracking-wider text-center" style={{ color: "var(--resume-classic-primary, #334155)" }}>
            Certificações
          </h3>
          
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold">{cert.name}</h4>
                <span className="italic" style={{ color: "var(--resume-classic-accent, #64748b)" }}>
                  {formatDate(cert.date)}
                </span>
              </div>
              <div className="mb-1">{cert.issuer}</div>
              {cert.description && <p>{cert.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Links */}
      {links.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-3 uppercase tracking-wider text-center" style={{ color: "var(--resume-classic-primary, #334155)" }}>
            Links
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link) => (
              <a 
                key={link.id} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: "var(--resume-classic-primary, #334155)" }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </section>
      )}
      
      <footer className="text-center pt-4 border-t-2 text-sm" style={{ borderColor: "var(--resume-classic-primary, #334155)" }}>
        <p>Currículo gerado por GlowUp Resume</p>
      </footer>
    </div>
  );
};

export default ClassicTemplate;
