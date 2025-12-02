import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import type { TelegramTheme } from "@/hooks/useTelegramTheme";

const initialProjects: Project[] = [
  {
    id: 1,
    title: 'Удвоить вовлечённость в блоге',
    date: '15 янв',
    progress: 25,
    isStarted: false,
    isCompleted: false,
    subtasks: [
      { title: 'Анализ текущей аудитории', completed: true },
      { title: 'Создание контент-плана', completed: false },
      { title: 'Настройка аналитики', completed: false },
      { title: 'Запуск А/Б тестов', completed: false },
    ]
  },
  {
    id: 2,
    title: 'Запустить новый продукт',
    date: '1 фев',
    progress: 50,
    isStarted: false,
    isCompleted: false,
    subtasks: [
      { title: 'Исследование рынка', completed: true },
      { title: 'Прототипирование MVP', completed: false },
    ]
  },
  {
    id: 3,
    title: 'Сэкономить 50 000 ₽',
    date: '31 дек',
    progress: 100,
    isStarted: true,
    isCompleted: true,
    subtasks: [
      { title: 'Аудит расходов', completed: true },
      { title: 'Открытие накопительного счета', completed: true },
    ]
  }
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const { theme } = useOutletContext<{ theme: TelegramTheme }>();

  const calculateProgress = (subtasks: { completed: boolean }[]) => {
    if (subtasks.length === 0) return 0;
    const completedCount = subtasks.filter(t => t.completed).length;
    return Math.round((completedCount / subtasks.length) * 100);
  };

  const handleSubtaskToggle = (projectId: number, subtaskIndex: number) => {
    setProjects(prev => prev.map(project => {
      if (project.id !== projectId) return project;

      const newSubtasks = [...project.subtasks];
      newSubtasks[subtaskIndex] = {
        ...newSubtasks[subtaskIndex],
        completed: !newSubtasks[subtaskIndex].completed
      };

      return {
        ...project,
        subtasks: newSubtasks,
        progress: calculateProgress(newSubtasks)
      };
    }));
  };

  const handleStartWork = (projectId: number) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId ? { ...project, isStarted: true } : project
    ));
  };

  const handleCompleteProject = (projectId: number) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? {
            ...project,
            isCompleted: true,
            progress: 100,
            subtasks: project.subtasks.map(t => ({ ...t, completed: true }))
          }
        : project
    ));
  };

  return (
    <div className="flex flex-col h-full px-4 pt-8 pb-24" style={{ color: theme.text_color }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Проекты & Роадмапы</h1>
        <p className="text-xs" style={{ color: theme.hint_color }}>
          Управляйте целями и декомпозируйте шаги
        </p>
      </div>

      <div className="overflow-y-auto no-scrollbar pb-10">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            expanded={expandedId === project.id}
            onToggle={() => setExpandedId(expandedId === project.id ? null : project.id)}
            onToggleSubtask={handleSubtaskToggle}
            onStartWork={handleStartWork}
            onCompleteProject={handleCompleteProject}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}
