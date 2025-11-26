import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Lightbulb, Rocket, Wallet, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { path: "/", icon: Lightbulb, label: "Создать" },
  { path: "/projects", icon: Rocket, label: "Проекты" },
  { path: "/finance", icon: Wallet, label: "Финансы" },
  { path: "/habits", icon: Target, label: "Привычки" },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border backdrop-blur-lg bg-opacity-80 z-50">
        <div className="flex justify-around items-center h-16 max-w-2xl mx-auto px-2">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 min-w-[70px]",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon
                  className={cn(
                    "w-5 h-5 transition-all duration-300",
                    isActive && "scale-110"
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-medium transition-all duration-300",
                    isActive && "font-semibold"
                  )}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-primary rounded-t-full" />
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
