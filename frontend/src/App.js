import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/accueil';  
import Menu from './pages/menu';
import Dressing from './pages/dressing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/dressing" element={<Dressing />} />
      </Routes>
    </Router>
  );
}

export default App;
