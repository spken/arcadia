import * as React from "react"
import { X, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const ToastProvider = React.createContext<{
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {}
})

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'warning' | 'success'
  action?: React.ReactNode
  duration?: number
}

export const useToast = () => {
  const context = React.useContext(ToastProvider)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...toast, id }
    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto remove toast after duration (default 5 seconds)
    const duration = toast.duration ?? 5000
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
      }, duration)
    }
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastProvider.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastViewport />
    </ToastProvider.Provider>
  )
}

const ToastViewport = () => {
  const { toasts } = useToast()

  if (toasts.length === 0) return null

  return (
    <>
      {/* Backdrop overlay */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[99]" />
      
      {/* Toast container */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] flex flex-col gap-2 max-w-md">
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} {...toast} />
        ))}
      </div>
    </>
  )
}

const ToastComponent = ({ id, title, description, variant = 'default', action }: Toast) => {
  const { removeToast } = useToast()

  const variantStyles = {
    default: 'bg-background/95 backdrop-blur-sm border border-border shadow-xl text-foreground',
    destructive: 'bg-background/95 backdrop-blur-sm border-red-500/50 text-foreground shadow-xl',
    warning: 'bg-background/95 backdrop-blur-sm border-orange-500/50 text-foreground shadow-xl',
    success: 'bg-background/95 backdrop-blur-sm border-green-500/50 text-foreground shadow-xl'
  }

  return (    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg p-6 pr-8 transition-all animate-in slide-in-from-top-full min-w-[400px]",
        variantStyles[variant]
      )}    >
      <div className="flex items-start gap-3">
        {variant === 'warning' && <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />}
        {variant === 'destructive' && <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />}
        {variant === 'success' && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />}
        {variant === 'default' && <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />}
        <div className="grid gap-1">
          {title && (
            <div className="text-sm font-semibold [&+div]:text-xs">
              {title}
            </div>
          )}
          {description && (
            <div className="text-sm opacity-90">
              {description}
            </div>
          )}
        </div>
      </div>
      {action}<button
        className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
        onClick={() => removeToast(id)}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
