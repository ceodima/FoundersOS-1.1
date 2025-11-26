import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload, Sparkles, ImagePlus, FileText, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Create() {
  const [goal, setGoal] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleFileUpload = () => {
    // Simulate file upload
    setUploadedFiles([...uploadedFiles, "analytics.png"]);
    toast.success("Файл загружен");
  };

  const handleGenerate = () => {
    if (!goal.trim()) {
      toast.error("Введите вашу цель");
      return;
    }
    toast.success("Роадмап сгенерирован!");
    navigate("/projects");
  };

  return (
    <div className="min-h-screen p-4 pt-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Creator's OS
          </h1>
          <p className="text-muted-foreground">
            Загрузите данные и опишите цель — ИИ создаст роадмап
          </p>
        </div>

        {/* Upload Section */}
        <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Upload className="w-4 h-4 text-accent" />
              <span>Загрузите материалы</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleFileUpload}
                className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-secondary/30 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:bg-secondary/50 group"
              >
                <TrendingUp className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
                <span className="text-xs text-muted-foreground">Аналитика</span>
              </button>

              <button
                onClick={handleFileUpload}
                className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-secondary/30 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:bg-secondary/50 group"
              >
                <ImagePlus className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
                <span className="text-xs text-muted-foreground">Скриншот</span>
              </button>

              <button
                onClick={handleFileUpload}
                className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-secondary/30 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:bg-secondary/50 group"
              >
                <FileText className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
                <span className="text-xs text-muted-foreground">Документ</span>
              </button>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {uploadedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-lg text-xs text-primary flex items-center gap-2"
                  >
                    <FileText className="w-3 h-3" />
                    {file}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Goal Input */}
        <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-accent/30 transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Моя Цель</span>
            </div>

            <Textarea
              placeholder="Например: Удвоить вовлечённость в блоге, Запустить новый продукт, Сэкономить 50 000 ₽"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="min-h-[120px] bg-secondary/30 border-border focus:border-accent resize-none"
            />
          </div>
        </Card>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!goal.trim()}
          className="w-full h-14 bg-gradient-primary hover:opacity-90 text-white font-semibold text-lg rounded-xl shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Сгенерировать Роадмап
        </Button>

        {/* AI Preview Hint */}
        {uploadedFiles.length > 0 && (
          <Card className="p-4 bg-accent/5 border-accent/20">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-accent">ИИ Анализирует</p>
                <p className="text-xs text-muted-foreground">
                  Извлечены метрики: просмотры +15%, вовлечённость 3.2%, CTR 1.8%
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
