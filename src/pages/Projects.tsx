import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight,
  Calendar,
  Play,
  CheckCircle2,
  Circle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockProjects = [
  {
    id: 1,
    title: "Удвоить вовлечённость в блоге",
    progress: 45,
    deadline: "15 янв",
    status: "active",
    steps: [
      { title: "Анализ текущей аудитории", status: "completed" },
      { title: "Создание контент-плана", status: "in-progress" },
      { title: "Настройка аналитики", status: "pending" },
      { title: "Запуск А/Б тестов", status: "pending" },
    ],
  },
  {
    id: 2,
    title: "Запустить новый продукт",
    progress: 20,
    deadline: "1 фев",
    status: "active",
    steps: [
      { title: "Исследование рынка", status: "completed" },
      { title: "Разработка MVP", status: "in-progress" },
      { title: "Тестирование с пользователями", status: "pending" },
    ],
  },
  {
    id: 3,
    title: "Сэкономить 50 000 ₽",
    progress: 65,
    deadline: "31 дек",
    status: "active",
    steps: [
      { title: "Аудит расходов", status: "completed" },
      { title: "Оптимизация подписок", status: "completed" },
      { title: "Создание бюджета", status: "in-progress" },
    ],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleDecompose = (stepIndex: number) => {
    // Simulate AI decomposition
    console.log("Decomposing step", stepIndex);
  };

  return (
    <div className="min-h-screen p-4 pt-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Проекты & Роадмапы</h1>
          <p className="text-muted-foreground">
            Управляйте целями и декомпозируйте шаги
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-3">
          {mockProjects.map((project) => (
            <Card
              key={project.id}
              className={cn(
                "p-5 bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer",
                selectedProject === project.id && "border-primary/50 bg-card"
              )}
              onClick={() =>
                setSelectedProject(
                  selectedProject === project.id ? null : project.id
                )
              }
            >
              {/* Project Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.deadline}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-primary">
                          {project.progress}%
                        </span>
                        <span>выполнено</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform duration-300",
                      selectedProject === project.id && "rotate-90"
                    )}
                  />
                </div>

                <Progress value={project.progress} className="h-2" />

                {/* Expanded Steps */}
                {selectedProject === project.id && (
                  <div className="space-y-3 pt-2 animate-in slide-in-from-top-2 duration-300">
                    {project.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 group p-3 rounded-lg hover:bg-secondary/50 transition-all"
                      >
                        <div className="flex-shrink-0 pt-0.5">
                          {step.status === "completed" ? (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          ) : step.status === "in-progress" ? (
                            <div className="w-5 h-5 rounded-full border-2 border-accent bg-accent/20 animate-pulse" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={cn(
                              "text-sm font-medium",
                              step.status === "completed" &&
                                "text-muted-foreground line-through"
                            )}
                          >
                            {step.title}
                          </p>
                        </div>
                        {step.status === "in-progress" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-7 text-accent hover:text-accent hover:bg-accent/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecompose(idx);
                            }}
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            Разложить
                          </Button>
                        )}
                      </div>
                    ))}

                    <Button
                      className="w-full mt-4 bg-gradient-accent hover:opacity-90 text-background font-semibold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Начать работу
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
