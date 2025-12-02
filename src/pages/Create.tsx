import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Target, Sparkles } from "lucide-react";
import { useProjects } from "@/context/ProjectsContext";
import type { TelegramTheme } from "@/hooks/useTelegramTheme";

export default function Create() {
  const [goal, setGoal] = useState("");
  const navigate = useNavigate();
  const { theme } = useOutletContext<{ theme: TelegramTheme }>();
  const { addProject } = useProjects();

  const handleGenerate = () => {
    if (!goal.trim()) return;
    addProject(goal.trim());
    setGoal("");
    navigate("/projects");
  };

  return (
    <div className="flex flex-col h-full px-4 pt-8 pb-24 animate-fade-in" style={{ color: theme.text_color }}>
      <div className="text-center mb-8">
        <h1 
          className="text-2xl font-bold mb-2 transition-colors"
          style={{ color: theme.link_color }}
        >
          Creator's OS
        </h1>
        <p className="text-sm transition-colors" style={{ color: theme.hint_color }}>
          Загрузите данные и опишите цель — ИИ создаст роадмап
        </p>
      </div>

      <div 
        className="rounded-2xl p-4 border border-white/5 mb-6 shadow-lg transition-colors"
        style={{ backgroundColor: theme.secondary_bg_color }}
      >
        <div className="flex items-center gap-2 mb-3" style={{ color: theme.link_color }}>
          <Target size={18} />
          <span className="font-medium text-sm">Моя Цель</span>
        </div>
        <textarea
          className="w-full rounded-xl p-3 placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all resize-none h-40"
          style={{ 
            backgroundColor: theme.bg_color, 
            color: theme.text_color,
            borderColor: theme.link_color 
          }}
          placeholder="Например: Удвоить вовлечённость в блоге, Запустить новый продукт, Сэкономить 50 000 ₽"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>

      <div className="mt-auto">
        <button
          onClick={handleGenerate}
          disabled={!goal.trim()}
          className="w-full font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: theme.button_color, color: theme.button_text_color }}
        >
          <Sparkles size={18} />
          Сгенерировать Роадмап
        </button>
      </div>
    </div>
  );
}
