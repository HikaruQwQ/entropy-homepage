import { createRoot } from 'react-dom/client';
import { Home } from './pages/Home';
import './styles/shared.css';
import './styles/home.css';

createRoot(document.getElementById('root')!).render(<Home />);
