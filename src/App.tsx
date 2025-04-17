
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ResumeProvider } from './contexts/ResumeContext';
import DashboardLayout from './components/layouts/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import CreateResume from './pages/dashboard/CreateResume';
import EditResume from './pages/dashboard/EditResume';
import NotFound from './pages/NotFound';
import './index.css';
import { Toaster } from 'sonner';

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="create" element={<CreateResume />} />
              <Route path="edit/:id" element={<EditResume />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
