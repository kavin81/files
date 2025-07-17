import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppLayout } from "./components/layout/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { Contacts } from "./pages/Contacts";
import { ContactDetail } from "./pages/ContactDetail";
import { LeadGeneration } from "./pages/LeadGeneration";
import { Tasks } from "./pages/Tasks";
import { EmailTemplates } from "./pages/EmailTemplates";
import { EmailIntelligence } from "./pages/EmailIntelligence";
import { Deals } from "./pages/Deals";
import { Reports } from "./pages/Reports";
import { Communications } from "./pages/Communications";
import { ContactImportPage } from "./pages/ContactImport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="contacts/:id" element={<ContactDetail />} />
            <Route path="lead-generation" element={<LeadGeneration />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="templates" element={<EmailTemplates />} />
            <Route path="email-intelligence" element={<EmailIntelligence />} />
            <Route path="deals" element={<Deals />} />
            <Route path="reports" element={<Reports />} />
            <Route path="communications" element={<Communications />} />
            <Route path="contacts/import" element={<ContactImportPage />} />
            <Route path="analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics - Coming Soon</h1></div>} />
            <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
