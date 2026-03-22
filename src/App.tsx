import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import Index from "./pages/Index.tsx";
import BusHub from "./pages/BusHub.tsx";
import BusRoutePage from "./pages/BusRoutePage.tsx";
import Calculator from "./pages/Calculator.tsx";

import GuidesIndex from "./pages/GuidesIndex.tsx";
import GuidePage from "./pages/GuidePage.tsx";
import WoodlandsPage from "./pages/WoodlandsPage.tsx";
import TuasPage from "./pages/TuasPage.tsx";
import HolidaysPage from "./pages/HolidaysPage.tsx";
import HolidayDetailPage from "./pages/HolidayDetailPage.tsx";
import LivePage from "./pages/LivePage.tsx";
import RTSLinkPage from "./pages/RTSLinkPage.tsx";
import CamerasPage from "./pages/CamerasPage.tsx";
import CamerasCheckpointPage from "./pages/CamerasCheckpointPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <main className="min-h-[calc(100vh-3.5rem)]">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bus" element={<BusHub />} />
            <Route path="/bus/:service" element={<BusRoutePage />} />
            <Route path="/calculator" element={<Calculator />} />

            <Route path="/guides" element={<GuidesIndex />} />
            <Route path="/guides/:slug" element={<GuidePage />} />
            <Route path="/woodlands" element={<WoodlandsPage />} />
            <Route path="/tuas" element={<TuasPage />} />
            <Route path="/holidays" element={<HolidaysPage />} />
            <Route path="/holidays/:slug" element={<HolidayDetailPage />} />
            <Route path="/live" element={<LivePage />} />
            <Route path="/rts-link" element={<RTSLinkPage />} />
            <Route path="/cameras" element={<CamerasPage />} />
            <Route path="/cameras/:checkpoint" element={<CamerasCheckpointPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <MobileNav />
      </BrowserRouter>
    </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
