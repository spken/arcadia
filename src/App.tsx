import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/electron-vite.animate.svg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="container max-w-md space-y-8">
        <div className="flex justify-center gap-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://electron-vite.github.io" target="_blank">
                  <img src={viteLogo} className="h-12 w-12 transition-transform hover:scale-110" alt="Vite logo" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Learn about Electron-Vite</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="h-12 w-12 animate-spin-slow transition-transform hover:scale-110" alt="React logo" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Learn about React</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-foreground">
          Vite + React
        </h1>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Counter Demo</CardTitle>
              <Badge variant="secondary">shadcn/ui</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="text-5xl font-bold">{count}</div>
            <Button 
              onClick={() => setCount((count) => count + 1)}
              size="default"
            >
              Increment Counter
            </Button>
            <p className="text-muted-foreground text-sm text-center">
              Edit <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">src/App.tsx</code> and save to test HMR
            </p>
          </CardContent>
          <Separator />
          <CardFooter className="justify-center py-4">
            <p className="text-sm text-muted-foreground">
              Click on the logos to learn more
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default App;