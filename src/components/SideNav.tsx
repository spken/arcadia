import { Button } from '@/components/ui/button';

interface SideNavProps {
  currentView: string;
  onChange: (view: string) => void;
}

export const SideNav = ({ currentView, onChange }: SideNavProps) => (
  <div className="w-64 h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
    <div className="p-4 space-y-1">
      {['dashboard', 'library', 'analytics', 'settings'].map((item) => (
        <Button
          key={item}
          variant={currentView === item ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onChange(item)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Button>
      ))}
    </div>
  </div>
);
