
import { ResumeData } from "@/types";

interface ModernTemplateProps {
  resumeData: ResumeData;
}

const ModernTemplate = ({ resumeData }: ModernTemplateProps) => {
  const { 
    personalInfo, objective, education, experience, skills, certifications, links,
    technicalCategories, personalCategories, strategicCategories 
  } = resumeData;
  
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

      {/* Habilidades Técnicas */}
      {technicalCategories?.technicalSkills?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Habilidades Técnicas
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {technicalCategories.technicalSkills.map((skill) => (
              <span 
                key={skill.id} 
                className="px-3 py-1 rounded-full text-sm" 
                style={{ 
                  backgroundColor: "var(--resume-modern-secondary, #f3f4f6)",
                  color: "var(--resume-modern-accent, #1e3a8a)"
                }}
              >
                {skill.name} {skill.type && `(${skill.type})`}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Idiomas */}
      {technicalCategories?.languages?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Idiomas
          </h3>
          
          <ul className="list-disc pl-5">
            {technicalCategories.languages.map((language) => (
              <li key={language.id} className="mb-1">
                <span className="font-medium">{language.name}</span>
                <span className="ml-2">({language.proficiency})</span>
              </li>
            ))}
          </ul>
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

      {/* Soft Skills */}
      {strategicCategories?.softSkills?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Soft Skills
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {strategicCategories.softSkills.map((skill) => (
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

      {/* Projetos */}
      {technicalCategories?.projects?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Projetos
          </h3>
          
          {technicalCategories.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{project.name}</h4>
                <span className="text-sm" style={{ color: "var(--resume-modern-accent, #1e3a8a)" }}>
                  {formatDate(project.startDate)} - {project.current ? "Atual" : formatDate(project.endDate)}
                </span>
              </div>
              <p className="text-sm mb-1">{project.description}</p>
              {project.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 rounded">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Cursos Extracurriculares */}
      {technicalCategories?.extracurricularCourses?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Cursos Extracurriculares
          </h3>
          
          {technicalCategories.extracurricularCourses.map((course) => (
            <div key={course.id} className="mb-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{course.name}</h4>
                <span className="text-sm" style={{ color: "var(--resume-modern-accent, #1e3a8a)" }}>
                  {formatDate(course.date)}
                </span>
              </div>
              <div className="text-sm">{course.institution}</div>
              {course.description && <p className="text-sm">{course.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Publicações */}
      {technicalCategories?.publications?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Publicações
          </h3>
          
          {technicalCategories.publications.map((publication) => (
            <div key={publication.id} className="mb-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{publication.title}</h4>
                <span className="text-sm" style={{ color: "var(--resume-modern-accent, #1e3a8a)" }}>
                  {formatDate(publication.date)}
                </span>
              </div>
              <div className="text-sm">{publication.publisher}</div>
              {publication.description && <p className="text-sm">{publication.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Voluntariado */}
      {personalCategories?.volunteerWork?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Trabalho Voluntário
          </h3>
          
          {personalCategories.volunteerWork.map((volunteer) => (
            <div key={volunteer.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{volunteer.role}</h4>
                <span className="text-sm" style={{ color: "var(--resume-modern-accent, #1e3a8a)" }}>
                  {formatDate(volunteer.startDate)} - {volunteer.current ? "Atual" : formatDate(volunteer.endDate)}
                </span>
              </div>
              <div className="text-sm mb-1">{volunteer.organization}</div>
              {volunteer.description && <p className="text-sm">{volunteer.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Atividades Acadêmicas */}
      {personalCategories?.academicActivities?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Atividades Acadêmicas
          </h3>
          
          {personalCategories.academicActivities.map((activity) => (
            <div key={activity.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{activity.name}</h4>
                <span className="text-sm" style={{ color: "var(--resume-modern-accent, #1e3a8a)" }}>
                  {formatDate(activity.startDate)} - {activity.current ? "Atual" : formatDate(activity.endDate)}
                </span>
              </div>
              <div className="text-sm mb-1">
                {activity.type} | {activity.institution}
              </div>
              {activity.description && <p className="text-sm">{activity.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Eventos */}
      {personalCategories?.events?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Eventos e Participações
          </h3>
          
          {personalCategories.events.map((event) => (
            <div key={event.id} className="mb-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{event.name}</h4>
                <span className="text-sm" style={{ color: "var(--resume-modern-accent, #1e3a8a)" }}>
                  {formatDate(event.date)}
                </span>
              </div>
              <div className="text-sm">
                {event.role} | {event.location}
              </div>
              {event.description && <p className="text-sm">{event.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Experiência Internacional */}
      {personalCategories?.internationalExperience?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Experiência Internacional
          </h3>
          
          {personalCategories.internationalExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{exp.country}</h4>
                <span className="text-sm" style={{ color: "var(--resume-modern-accent, #1e3a8a)" }}>
                  {formatDate(exp.startDate)} - {exp.current ? "Atual" : formatDate(exp.endDate)}
                </span>
              </div>
              <div className="text-sm mb-1">
                {exp.type} {exp.institution && `| ${exp.institution}`}
              </div>
              {exp.description && <p className="text-sm">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Prêmios e Reconhecimentos */}
      {personalCategories?.awardsRecognitions?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Prêmios e Reconhecimentos
          </h3>
          
          {personalCategories.awardsRecognitions.map((award) => (
            <div key={award.id} className="mb-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{award.title}</h4>
                <span className="text-sm" style={{ color: "var(--resume-modern-accent, #1e3a8a)" }}>
                  {formatDate(award.date)}
                </span>
              </div>
              <div className="text-sm">{award.issuer}</div>
              {award.description && <p className="text-sm">{award.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Interesses Profissionais */}
      {strategicCategories?.professionalInterests?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Interesses Profissionais
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {strategicCategories.professionalInterests.map((interest, index) => (
              <span 
                key={index} 
                className="px-3 py-1 rounded-full text-sm" 
                style={{ 
                  backgroundColor: "var(--resume-modern-secondary, #f3f4f6)",
                  color: "var(--resume-modern-accent, #1e3a8a)"
                }}
              >
                {interest}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Disponibilidade */}
      {strategicCategories?.availability && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Disponibilidade
          </h3>
          
          <ul className="list-disc pl-5">
            {strategicCategories.availability.relocation && (
              <li className="mb-1">Disponível para mudança</li>
            )}
            {strategicCategories.availability.travel && (
              <li className="mb-1">Disponível para viagens</li>
            )}
            {strategicCategories.availability.remoteWork && (
              <li className="mb-1">Disponível para trabalho remoto</li>
            )}
            <li className="mb-1">Jornada: {strategicCategories.availability.workHours}</li>
            {strategicCategories.availability.additionalInfo && (
              <li className="mb-1">{strategicCategories.availability.additionalInfo}</li>
            )}
          </ul>
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

      {/* Referências */}
      {strategicCategories?.references?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-medium mb-2 pb-1 border-b" style={{ borderColor: "var(--resume-modern-primary, #3b82f6)" }}>
            Referências
          </h3>
          
          {strategicCategories.references.some(ref => ref.available) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strategicCategories.references
                .filter(ref => ref.available)
                .map((reference) => (
                  <div key={reference.id} className="mb-3">
                    <div className="font-medium">{reference.name}</div>
                    <div className="text-sm">{reference.relationship}</div>
                    {reference.company && (
                      <div className="text-sm">{reference.company}</div>
                    )}
                    <div className="text-sm">{reference.contact}</div>
                  </div>
                ))
              }
            </div>
          ) : (
            <p className="text-sm italic">Referências disponíveis sob solicitação.</p>
          )}
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
