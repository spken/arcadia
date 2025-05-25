import { Badge } from '@/components/ui/badge';

export const TopBar = () => (
  <div className="h-14 border-b flex items-center px-4 bg-background">
    <h1 className="text-xl font-bold">Arcadia</h1>
    <div className="ml-auto">
      <Badge variant="outline">Alpha</Badge>
    </div>
  </div>
);
