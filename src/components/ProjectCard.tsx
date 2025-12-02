import { useState, useRef } from "react";
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Play,
  Loader2,
  CheckCheck
} from "lucide-react";
import { triggerHaptic, type TelegramTheme } from "@/hooks/useTelegramTheme";

export interface Subtask {
  title: string;
  completed: boolean;
}

export interface Project {
  id: number;
  title: string;
  date: string;
  progress: number;
  isStarted: boolean;
  isCompleted: boolean;
  subtasks: Subtask[];
}

interface ProjectCardProps {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
  onToggleSubtask: (projectId: number, subtaskIndex: number) => void;
  onStartWork: (projectId: number) => void;
  onCompleteProject: (projectId: number) => void;
  theme: TelegramTheme;
}

const GREEN_COLOR = '#10B981';

export default function ProjectCard({
  project,
  expanded,
  onToggle,
  onToggleSubtask,
  onStartWork,
  onCompleteProject,
  theme,
}: ProjectCardProps) {
  const [isPressing, setIsPressing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startPress = () => {
    if (!project.isStarted || project.isCompleted) return;
    setIsPressing(true);
    timerRef.current = setTimeout(() => {
      onCompleteProject(project.id);
      setIsPressing(false);
      triggerHaptic('success');
    }, 3000);
  };

  const cancelPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPressing(false);
  };

  const handleSubtaskClick = (idx: number) => {
    if (!project.isCompleted) {
      onToggleSubtask(project.id, idx);
      triggerHaptic('light');
    }
  };

  return (
    <div
      className={`rounded-2xl p-4 mb-4 border border-white/5 transition-all duration-300 ${
        expanded ? 'ring-1 ring-blue-500/30' : ''
      }`}
      style={{ 
        backgroundColor: theme.secondary_bg_color, 
        borderColor: expanded ? theme.link_color : 'rgba(255,255,255,0.05)' 
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start cursor-pointer" onClick={onToggle}>
        <div className="flex-1">
          <h3
            className="font-bold mb-2 text-[15px] transition-colors"
            style={{ color: project.isCompleted ? GREEN_COLOR : theme.text_color }}
          >
            {project.title}
          </h3>

          <div className="flex items-center gap-3 text-xs mb-3">
            <span className="flex items-center gap-1" style={{ color: theme.hint_color }}>
              🗓 {project.date}
            </span>
            <span
              className="font-medium"
              style={{ 
                color: project.isCompleted 
                  ? GREEN_COLOR 
                  : (project.progress > 40 ? theme.link_color : theme.hint_color) 
              }}
            >
              {project.progress}% выполнено
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-[#2C2C2E] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${project.progress}%`,
                backgroundColor: project.isCompleted ? GREEN_COLOR : theme.link_color,
              }}
            />
          </div>
        </div>

        <div className="ml-4 mt-1" style={{ color: theme.hint_color }}>
          {expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-6 pt-4 border-t border-white/5 animate-fade-in">
          <div className="space-y-4 mb-6">
            {project.subtasks.map((task, idx) => (
              <div
                key={idx}
                onClick={() => handleSubtaskClick(idx)}
                className={`flex items-start gap-3 group p-2 rounded-lg transition-colors -mx-2 ${
                  !project.isCompleted ? 'cursor-pointer hover:bg-white/5' : 'cursor-default opacity-60'
                }`}
              >
                {task.completed ? (
                  <CheckCircle2 size={20} className="shrink-0 mt-0.5" style={{ color: GREEN_COLOR }} />
                ) : (
                  <Circle size={20} className="shrink-0 mt-0.5" style={{ color: theme.hint_color }} />
                )}
                <span
                  className={`text-sm transition-all ${task.completed ? 'line-through' : ''}`}
                  style={{ color: task.completed ? theme.hint_color : theme.text_color }}
                >
                  {task.title}
                </span>
              </div>
            ))}
          </div>

          {/* Action Button with Long Press Animation */}
          <div className="relative w-full h-12 rounded-xl overflow-hidden touch-none select-none">
            <div
              className="absolute top-0 left-0 h-full transition-all ease-linear z-0"
              style={{
                width: isPressing ? '100%' : '0%',
                transitionDuration: isPressing ? '3000ms' : '200ms',
                backgroundColor: 'rgba(16, 185, 129, 0.4)',
              }}
            />

            <button
              onClick={() => !project.isStarted && onStartWork(project.id)}
              onMouseDown={project.isStarted ? startPress : undefined}
              onMouseUp={project.isStarted ? cancelPress : undefined}
              onMouseLeave={project.isStarted ? cancelPress : undefined}
              onTouchStart={project.isStarted ? startPress : undefined}
              onTouchEnd={project.isStarted ? cancelPress : undefined}
              className="absolute inset-0 w-full font-medium flex items-center justify-center gap-2 transition-all duration-300 z-10"
              style={{
                backgroundColor: project.isCompleted
                  ? GREEN_COLOR
                  : project.isStarted
                    ? 'rgba(16, 185, 129, 0.1)'
                    : theme.link_color,
                color: project.isCompleted
                  ? theme.text_color
                  : project.isStarted
                    ? GREEN_COLOR
                    : theme.text_color,
                cursor: project.isCompleted ? 'default' : (project.isStarted ? 'grab' : 'pointer'),
              }}
            >
              {project.isCompleted ? (
                <>
                  <CheckCheck size={18} />
                  Завершено
                </>
              ) : project.isStarted ? (
                <>
                  <Loader2 size={16} className={isPressing ? 'animate-spin' : ''} />
                  {isPressing ? 'Удерживайте...' : 'В работе'}
                </>
              ) : (
                <>
                  <Play size={16} fill="currentColor" />
                  Начать работу
                </>
              )}
            </button>
          </div>
          
          {project.isStarted && !project.isCompleted && (
            <div className="text-center mt-2 text-[10px]" style={{ color: theme.hint_color }}>
              Удерживайте 3 сек. для завершения
            </div>
          )}
        </div>
      )}
    </div>
  );
}
