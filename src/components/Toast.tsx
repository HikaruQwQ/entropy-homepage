import * as React from 'react';
import * as ToastPrimitive from 'radix-ui/toast';

interface ToastItem {
  id: string;
  message: string;
  open: boolean;
}

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const showToast = React.useCallback((message: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, open: true }]);
  }, []);

  const closeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, open: false } : t)));
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastPrimitive.Provider swipeDirection="down" duration={2200}>
        {toasts.map((toast) => (
          <ToastPrimitive.Root
            key={toast.id}
            className="toast-root"
            open={toast.open}
            onOpenChange={(open) => {
              if (!open) closeToast(toast.id);
            }}
            onSwipeEnd={() => { closeToast(toast.id); }}
            onAnimationEnd={() => {
              if (!toast.open) removeToast(toast.id);
            }}
          >
            <ToastPrimitive.Title className="toast-title">{toast.message}</ToastPrimitive.Title>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="toast-viewport" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
