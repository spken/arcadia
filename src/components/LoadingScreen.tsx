export const LoadingScreen = () => (
  <div className="h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold">Loading...</h2>
      <div className="animate-pulse">Please wait</div>
    </div>
  </div>
);
