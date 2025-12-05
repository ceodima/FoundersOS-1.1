import { createContext, useContext, useState, ReactNode } from "react";
import type { Project } from "@/components/ProjectCard";

interface ProjectsContextType {
  projects: Project[];
  addProject: (goal: string) => void;
  toggleSubtask: (projectId: number, subtaskIndex: number) => void;
  startWork: (projectId: number) => void;
  completeProject: (projectId: number) => void;
  deleteProject: (projectId: number) => void;
  updateSubtask: (projectId: number, subtaskIndex: number, title: string) => void;
  addSubtask: (projectId: number) => void;
  deleteSubtask: (projectId: number, subtaskIndex: number) => void;
}

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
];

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const calculateProgress = (subtasks: { completed: boolean }[]) => {
    if (subtasks.length === 0) return 0;
    const completedCount = subtasks.filter(t => t.completed).length;
    return Math.round((completedCount / subtasks.length) * 100);
  };

  const addProject = (goal: string) => {
    const newProject: Project = {
      id: Date.now(),
      title: goal,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      progress: 0,
      isStarted: false,
      isCompleted: false,
      subtasks: [
        { title: '', completed: false },
        { title: '', completed: false },
        { title: '', completed: false },
      ]
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const toggleSubtask = (projectId: number, subtaskIndex: number) => {
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

  const startWork = (projectId: number) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId ? { ...project, isStarted: true } : project
    ));
  };

  const completeProject = (projectId: number) => {
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

  const updateSubtask = (projectId: number, subtaskIndex: number, title: string) => {
    setProjects(prev => prev.map(project => {
      if (project.id !== projectId) return project;
      const newSubtasks = [...project.subtasks];
      newSubtasks[subtaskIndex] = { ...newSubtasks[subtaskIndex], title };
      return { ...project, subtasks: newSubtasks };
    }));
  };

  const addSubtask = (projectId: number) => {
    setProjects(prev => prev.map(project => {
      if (project.id !== projectId) return project;
      return {
        ...project,
        subtasks: [...project.subtasks, { title: '', completed: false }],
        progress: calculateProgress([...project.subtasks, { completed: false }])
      };
    }));
  };

  const deleteSubtask = (projectId: number, subtaskIndex: number) => {
    setProjects(prev => prev.map(project => {
      if (project.id !== projectId) return project;
      const newSubtasks = project.subtasks.filter((_, idx) => idx !== subtaskIndex);
      return {
        ...project,
        subtasks: newSubtasks,
        progress: calculateProgress(newSubtasks)
      };
    }));
  };

  const deleteProject = (projectId: number) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  return (
    <ProjectsContext.Provider value={{ 
      projects, 
      addProject, 
      toggleSubtask, 
      startWork, 
      completeProject,
      deleteProject,
      updateSubtask,
      addSubtask,
      deleteSubtask
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }
  return context;
}
