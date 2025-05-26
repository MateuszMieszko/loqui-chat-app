import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './components/pages/LoginSignup';
import Messages from './components/pages/Messages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Messages />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
}

export default App
