import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import Teachings from "@/pages/Teachings";
import Calendar from "@/pages/Calendar";
import Prayers from "@/pages/Prayers";
import Churches from "@/pages/Churches";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
// Import Inter font with multiple weights
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";
import { NotificationProvider } from "@/lib/NotificationContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import ReloadPrompt from "@/components/ReloadPrompt";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/teachings" component={Teachings} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/prayers" component={Prayers} />
      <Route path="/churches" component={Churches} />
      <Route path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <AuthProvider>
          <SidebarProvider>
            <div className="font-body text-offblack bg-white min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Router />
              </main>
              <Footer />
              <ReloadPrompt />
            </div>
          </SidebarProvider>
        </AuthProvider>
      </NotificationProvider>
    </LanguageProvider>
  );
}

export default App;
