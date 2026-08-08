import { createRoot } from 'react-dom/client';
import { Team } from './pages/Team';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorPage } from './components/ErrorPage';
import { ToastProvider } from './components/Toast';
import './styles/shared.css';
import './styles/team.css';
import './styles/error.css';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<ErrorPage kind="error" />}>
    <ToastProvider>
      <Team />
    </ToastProvider>
  </ErrorBoundary>
);
