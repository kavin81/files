import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Mail, 
  Settings,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Email Templates", href: "/templates", icon: Mail },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <div className="w-64 bg-gradient-card border-r border-border/50 h-screen flex flex-col backdrop-blur-xl">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-border/50">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">SimpleConnect</h1>
        <p className="text-sm text-muted-foreground">AI-Powered CRM</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "nav-link group",
                isActive && "nav-link-active"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-surface/50 to-surface/30 backdrop-blur-sm border border-border/20 hover:bg-surface/60 transition-all duration-300">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-[var(--shadow-primary)] glow-primary">
            <span className="text-sm font-semibold text-primary-foreground">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@company.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};