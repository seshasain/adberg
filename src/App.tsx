import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Studio from "./pages/Studio";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import StudioDashboard from "./pages/StudioDashboard";
import ProjectsPage from "./pages/ProjectsPage";
import SkinRealismPage from "./pages/tools/SkinRealismPage";
import ImageUpscalerPage from "./pages/tools/ImageUpscalerPage";
import SkinRefinerPage from "./pages/tools/SkinRefinerPage";
import { AppLayout } from './components/layout/AppLayout';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public marketing pages */}
            <Route path="/" element={<Studio />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Protected App Layout */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Outlet />
                  </AppLayout>
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<StudioDashboard />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="tools/image-studio" element={<SkinRealismPage />} />
              <Route path="tools/image-upscaler" element={<ImageUpscalerPage />} />
              <Route path="tools/skin-refiner" element={<SkinRefinerPage />} />
            </Route>
            
            {/* Catch-all Not Found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
