
import React from 'react';
import { ResumeData } from '@/types';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { v4 as uuidv4 } from 'uuid';

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
  const renderTechnicalSkills = () => {
    const skills = resumeData.technicalCategories.technicalSkills;

    const handleAddSkill = () => {
      const newSkills = [
        ...skills,
        { id: uuidv4(), name: '', type: '', proficiency: 0 }
      ];
      updateResumeData('technicalCategories', {
        ...resumeData.technicalCategories,
        technicalSkills: newSkills
      });
    };

    const handleRemoveSkill = (id: string) => {
      const newSkills = skills.filter(skill => skill.id !== id);
      updateResumeData('technicalCategories', {
        ...resumeData.technicalCategories,
        technicalSkills: newSkills
      });
    };

    const handleSkillChange = (id: string, field: string, value: string | number) => {
      const newSkills = skills.map(skill => {
        if (skill.id === id) {
          return { ...skill, [field]: field === 'proficiency' ? Number(value) : value };
        }
        return skill;
      });
      updateResumeData('technicalCategories', {
        ...resumeData.technicalCategories,
        technicalSkills: newSkills
      });
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Habilidades Técnicas</h3>
        {skills.map((skill, index) => (
          <Card key={skill.id} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`skill-name-${index}`}>Nome</Label>
                <Input
                  id={`skill-name-${index}`}
                  value={skill.name}
                  onChange={(e) => handleSkillChange(skill.id, 'name', e.target.value)}
                  placeholder="Ex: React, Python, Adobe Photoshop"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`skill-type-${index}`}>Tipo</Label>
                <Input
                  id={`skill-type-${index}`}
                  value={skill.type}
                  onChange={(e) => handleSkillChange(skill.id, 'type', e.target.value)}
                  placeholder="Ex: Linguagem de Programação, Ferramenta, Software"
                />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor={`skill-proficiency-${index}`}>Proficiência ({skill.proficiency})</Label>
              <input
                id={`skill-proficiency-${index}`}
                type="range"
                min="0"
                max="100"
                value={skill.proficiency}
                onChange={(e) => handleSkillChange(skill.id, 'proficiency', e.target.value)}
                className="w-full"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveSkill(skill.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remover
            </Button>
          </Card>
        ))}
        <Button type="button" onClick={handleAddSkill} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Habilidade Técnica
        </Button>
      </div>
    );
  };

  const renderExtendedCertifications = () => {
    const certifications = resumeData.technicalCategories.certifications;

    const handleAddCertification = () => {
      const newCertifications = [
        ...certifications,
        { id: uuidv4(), name: '', issuer: '', platform: '', date: '', description: '', url: '' }
      ];
      updateResumeData('technicalCategories', {
        ...resumeData.technicalCategories,
        certifications: newCertifications
      });
    };

    const handleRemoveCertification = (id: string) => {
      const newCertifications = certifications.filter(cert => cert.id !== id);
      updateResumeData('technicalCategories', {
        ...resumeData.technicalCategories,
        certifications: newCertifications
      });
    };

    const handleCertificationChange = (id: string, field: string, value: string) => {
      const newCertifications = certifications.map(cert => {
        if (cert.id === id) {
          return { ...cert, [field]: value };
        }
        return cert;
      });
      updateResumeData('technicalCategories', {
        ...resumeData.technicalCategories,
        certifications: newCertifications
      });
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Certificações Detalhadas</h3>
        {certifications.map((cert, index) => (
          <Card key={cert.id} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`cert-name-${index}`}>Nome</Label>
                <Input
                  id={`cert-name-${index}`}
                  value={cert.name}
                  onChange={(e) => handleCertificationChange(cert.id, 'name', e.target.value)}
                  placeholder="Ex: AWS Certified Developer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`cert-issuer-${index}`}>Emissor</Label>
                <Input
                  id={`cert-issuer-${index}`}
                  value={cert.issuer}
                  onChange={(e) => handleCertificationChange(cert.id, 'issuer', e.target.value)}
                  placeholder="Ex: Amazon Web Services"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`cert-platform-${index}`}>Plataforma</Label>
                <Input
                  id={`cert-platform-${index}`}
                  value={cert.platform}
                  onChange={(e) => handleCertificationChange(cert.id, 'platform', e.target.value)}
                  placeholder="Ex: Coursera, Udemy, Diretamente"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`cert-date-${index}`}>Data</Label>
                <Input
                  id={`cert-date-${index}`}
                  type="date"
                  value={cert.date}
                  onChange={(e) => handleCertificationChange(cert.id, 'date', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor={`cert-description-${index}`}>Descrição</Label>
              <Textarea
                id={`cert-description-${index}`}
                value={cert.description}
                onChange={(e) => handleCertificationChange(cert.id, 'description', e.target.value)}
                placeholder="Descreva brevemente o que aprendeu ou conquistou com esta certificação"
              />
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor={`cert-url-${index}`}>URL</Label>
              <Input
                id={`cert-url-${index}`}
                value={cert.url}
                onChange={(e) => handleCertificationChange(cert.id, 'url', e.target.value)}
                placeholder="Ex: https://www.credential.net/..."
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveCertification(cert.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remover
            </Button>
          </Card>
        ))}
        <Button type="button" onClick={handleAddCertification} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Certificação
        </Button>
      </div>
    );
  };

  // Add more section renderers as needed based on the section types
  // This is just a starting point with two example sections

  // Map the section type to the appropriate renderer
  const renderSection = () => {
    switch (sectionType) {
      case 'technicalSkills':
        return renderTechnicalSkills();
      case 'extendedCertifications':
        return renderExtendedCertifications();
      // Add more cases for other section types
      default:
        return <p>Formulário para {sectionType} ainda não implementado.</p>;
    }
  };

  return <div className="space-y-6">{renderSection()}</div>;
};
