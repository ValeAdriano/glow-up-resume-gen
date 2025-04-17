
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ResumeData } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GripVertical, PlusCircle } from "lucide-react";
import SectionForm from "./SectionForm";

interface SortableSectionProps {
  id: string;
  name: string;
  type: string;
  resumeData: ResumeData;
  updateResumeData: (type: keyof ResumeData, data: any) => void;
}

const SortableSection = ({ id, name, type, resumeData, updateResumeData }: SortableSectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className="mb-4 transition-shadow hover:shadow-md"
    >
      <CardHeader className="flex flex-row items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <div
            className="cursor-grab p-1 text-gray-500 hover:text-gray-700 transition-colors"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5" />
          </div>
          <CardTitle className="text-base">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <SectionForm 
          sectionType={type as keyof ResumeData} 
          resumeData={resumeData}
          updateResumeData={updateResumeData}
        />
      </CardContent>
    </Card>
  );
};

interface ResumeEditorProps {
  sections: Array<{ id: string; name: string; type: string }>;
  resumeData: ResumeData;
  updateResumeData: (type: keyof ResumeData, data: any) => void;
}

const ResumeEditor = ({ sections, resumeData, updateResumeData }: ResumeEditorProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-muted/50 border-b">
        <h3 className="font-medium text-sm">Conteúdo do Currículo</h3>
        <p className="text-xs text-muted-foreground">Arraste as seções para reordenar</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {sections.map((section) => (
            <SortableSection
              key={section.id}
              id={section.id}
              name={section.name}
              type={section.type}
              resumeData={resumeData}
              updateResumeData={updateResumeData}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ResumeEditor;
