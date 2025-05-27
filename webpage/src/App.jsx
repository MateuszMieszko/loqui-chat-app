import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './components/pages/LoginSignup';
import Messages from './components/pages/Messages';
import Settings from './components/pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Messages />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App
