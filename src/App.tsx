import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
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
import HolidayCalendarPage from "./pages/HolidayCalendarPage.tsx";
import ExpresswayCamerasPage from "./pages/ExpresswayCamerasPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import { CALENDAR_PAGES } from "./data/public-holidays";
import { EXPRESSWAYS } from "./data/expressway-cameras";

const queryClient = new QueryClient();

/** Routes /holidays/:slug to calendar page or holiday detail page */
const HolidayRouter = () => {
  const { slug } = useParams<{ slug: string }>();
  if (slug && slug in CALENDAR_PAGES) return <HolidayCalendarPage />;
  return <HolidayDetailPage />;
};

/** Routes /cameras/:checkpoint to expressway page or checkpoint camera page */
const CameraRouter = () => {
  const { checkpoint } = useParams<{ checkpoint: string }>();
  if (checkpoint && checkpoint in EXPRESSWAYS) return <ExpresswayCamerasPage />;
  return <CamerasCheckpointPage />;
};

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <BreadcrumbNav />
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
            <Route path="/holidays/:slug" element={<HolidayRouter />} />
            <Route path="/live" element={<LivePage />} />
            <Route path="/rts-link" element={<RTSLinkPage />} />
            <Route path="/cameras" element={<CamerasPage />} />
            <Route path="/cameras/:checkpoint" element={<CameraRouter />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/about" element={<AboutPage />} />
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
