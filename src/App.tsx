import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ResumeProvider } from './contexts/ResumeContext';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import DashboardLayout from './components/layouts/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import CreateResume from './pages/dashboard/CreateResume';
import EditResume from './pages/dashboard/EditResume';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="create" element={<CreateResume />} />
              {/* Add the edit route to the router configuration */}
              <Route path="edit/:id" element={<EditResume />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
