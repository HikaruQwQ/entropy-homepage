import { createRoot } from 'react-dom/client';
import { Home } from './pages/Home';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorPage } from './components/ErrorPage';
import './styles/shared.css';
import './styles/home.css';
import './styles/error.css';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<ErrorPage kind="error" />}>
    <Home />
  </ErrorBoundary>
);
