import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Agreements from "./pages/Agreements";
import Compare from "./pages/Compare";
import AISearch from "./pages/AISearch";
import Analytics from "./pages/Analytics";
import CostCalculator from "./pages/CostCalculator";
import Alerts from "./pages/Alerts";
import RiskMonitor from "./pages/RiskMonitor";
import SettingsPage from "./pages/Settings";
import AgreementDetail from "./pages/AgreementDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agreements" element={<Agreements />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/search" element={<AISearch />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/calculator" element={<CostCalculator />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/risk" element={<RiskMonitor />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
