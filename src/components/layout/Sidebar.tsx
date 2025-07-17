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
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">SimpleConnect</h1>
        <p className="text-sm text-muted-foreground">CRM Platform</p>
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
                "nav-link",
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
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-surface">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-primary-foreground">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@company.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};