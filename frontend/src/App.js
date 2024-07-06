import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterForm from './components/Register'
import LoginForm from './components/Login'
import Dashboard from './components/Dashboard'
import ProjectDetail from './components/ProjectDetail';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />

        
      </Routes>
    </Router>
  );
}

export default App;
