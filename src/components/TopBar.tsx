import { Badge } from '@/components/ui/badge';

export const TopBar = () => (
  <div className="h-14 border-b flex items-center px-4 bg-background">
    <div className="flex items-center space-x-2">
      <div className="h-6 w-6 bg-primary rounded-sm flex items-center justify-center">
          <span className="text-primary-foreground text-xs font-bold">A</span>
      </div>
      <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Arcadia</h1>
    </div>
    <div className="ml-auto">
      <Badge variant="outline">Beta v1.0</Badge>
    </div>
  </div>
);
