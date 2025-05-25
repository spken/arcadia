import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Library, 
  BarChart3, 
  Settings,
  PanelLeftOpen,
  PanelLeftClose
} from 'lucide-react';

interface SideNavProps {
  currentView: string;
  onChange: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'library', label: 'Library', icon: Library },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const SideNav = ({ currentView, onChange }: SideNavProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ease-in-out`}>
      <div className="p-4">
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`${isCollapsed ? 'w-8 h-8 p-0 flex items-center justify-center mx-auto' : 'w-full justify-start gap-3'} mb-4 transition-all duration-200`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </Button>
        
        {/* Navigation Items */}
        <div className="space-y-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? "secondary" : "ghost"}
                className={`${isCollapsed ? 'w-8 h-8 p-0 flex items-center justify-center mx-auto' : 'w-full justify-start gap-3'} transition-all duration-200`}
                onClick={() => onChange(item.id)}
                title={isCollapsed ? item.label : undefined}
              >
                <IconComponent className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
