import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const Header = () => {
  return (
    <header className="h-16 bg-gradient-surface border-b border-border/50 px-6 flex items-center justify-between backdrop-blur-xl">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts, tasks, or notes..."
            className="pl-10 bg-surface/50 border-border/50 rounded-xl backdrop-blur-sm focus:bg-surface transition-all duration-300"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button size="sm" className="gap-2 bg-gradient-primary hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          Quick Add
        </Button>
        
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full animate-pulse"></span>
        </Button>
        
        <ThemeToggle />
      </div>
    </header>
  );
};