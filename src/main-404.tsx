import { createRoot } from 'react-dom/client';
import { ErrorPage } from './components/ErrorPage';
import './styles/shared.css';
import './styles/error.css';

createRoot(document.getElementById('root')!).render(<ErrorPage kind="notfound" />);
