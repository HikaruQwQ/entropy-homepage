import { createRoot } from 'react-dom/client';
import { Team } from './pages/Team';
import './styles/shared.css';
import './styles/team.css';

createRoot(document.getElementById('root')!).render(<Team />);
