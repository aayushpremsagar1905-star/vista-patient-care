import { Activity, Users, FileText, Search, UserPlus, Clipboard } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigationItems = [
  { icon: Activity, label: "Dashboard", href: "/" },
  { icon: UserPlus, label: "New Patient", href: "/new-patient" },
  { icon: Users, label: "Patient Management", href: "/patients" },
  { icon: FileText, label: "Lab Reports", href: "/lab-reports" },
  { icon: Clipboard, label: "Audit", href: "/audit" },
  { icon: Search, label: "API Docs", href: "/api-docs" },
];

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-accent to-accent/80 border-r border-border fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-semibold text-foreground mb-8">Health Hub</h1>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                  )
                }
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}