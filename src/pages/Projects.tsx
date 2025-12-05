import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProjectCard from "@/components/ProjectCard";
import { useProjects } from "@/context/ProjectsContext";
import type { TelegramTheme } from "@/hooks/useTelegramTheme";

export default function Projects() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { theme } = useOutletContext<{ theme: TelegramTheme }>();
  const { projects, toggleSubtask, startWork, completeProject, updateSubtask, addSubtask, deleteSubtask } = useProjects();

  return (
    <div className="flex flex-col h-full px-4 pt-8 pb-24" style={{ color: theme.text_color }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Проекты & Роадмапы</h1>
        <p className="text-xs" style={{ color: theme.hint_color }}>
          Управляйте целями и декомпозируйте шаги
        </p>
      </div>

      <div className="overflow-y-auto no-scrollbar pb-10">
        {projects.length === 0 ? (
          <div className="text-center py-12" style={{ color: theme.hint_color }}>
            <p className="text-sm">Нет проектов</p>
            <p className="text-xs mt-1">Создайте первый проект во вкладке "Создать"</p>
          </div>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              expanded={expandedId === project.id}
              onToggle={() => setExpandedId(expandedId === project.id ? null : project.id)}
              onToggleSubtask={toggleSubtask}
              onStartWork={startWork}
              onCompleteProject={completeProject}
              onUpdateSubtask={updateSubtask}
              onAddSubtask={addSubtask}
              onDeleteSubtask={deleteSubtask}
              theme={theme}
            />
          ))
        )}
      </div>
    </div>
  );
}
