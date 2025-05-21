
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ResumeProvider } from "./contexts/ResumeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CreditsProvider } from "./contexts/CreditsContext";
import MainLayout from "./components/layouts/MainLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateResume from "./pages/dashboard/CreateResume";
import EditResume from "./pages/dashboard/EditResume";
import Credits from "./pages/dashboard/Credits";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CreditsProvider>
        <ResumeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Index />} />
                </Route>

                {/* Auth Routes */}
                <Route path="/auth/sign-in" element={<Navigate to="/dashboard" replace />} />
                <Route path="/auth/sign-up" element={<Navigate to="/dashboard" replace />} />
                
                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="create" element={<CreateResume />} />
                  <Route path="edit/:id" element={<EditResume />} />
                  <Route path="credits" element={<Credits />} />
                  <Route path="profile" element={<div className="page-container"><h1>Perfil</h1><p>Página em construção</p></div>} />
                  <Route path="settings" element={<div className="page-container"><h1>Configurações</h1><p>Página em construção</p></div>} />
                </Route>

                {/* Redirect auth routes to dashboard */}
                <Route path="/auth/*" element={<Navigate to="/dashboard" replace />} />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ResumeProvider>
      </CreditsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
