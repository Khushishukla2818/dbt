import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import { LanguageSelector } from "@/components/language-selector";
import { Navigation } from "@/components/navigation";
import { ChatbotWidget } from "@/components/chatbot-widget";
import Dashboard from "@/pages/dashboard";
import StatusChecker from "@/pages/status-checker";
import Awareness from "@/pages/awareness";
import Quiz from "@/pages/quiz";
import Analytics from "@/pages/analytics";
import NotFound from "@/pages/not-found";

function AppHeader() {
  return (
    <header className="gradient-bg text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-lg">🏛️</span>
            </div>
            <h1 className="text-xl font-bold" data-testid="app-title">
              DBT Awareness Hub
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/status" component={StatusChecker} />
      <Route path="/awareness" component={Awareness} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/analytics" component={Analytics} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <AppHeader />
            <Navigation />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Router />
            </main>
            
            <ChatbotWidget />
            <Toaster />
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
