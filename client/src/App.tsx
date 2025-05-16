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
import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";

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
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);
  const [, navigate] = require("wouter/use-location")();
  
  useEffect(() => {
    // For development purposes, uncomment to test splash always
    // localStorage.removeItem('splashSeen');
    
    // Check if user has previously seen the splash screen
    const splashSeen = localStorage.getItem('splashSeen');
    
    // Show splash for first-time users, skip for returning users
    if (splashSeen) {
      setShowSplash(false);
      setHasSeenSplash(true);
    } else {
      // For first time users, prepare animation
      setShowSplash(true);
      
      // Add a class to body to prevent scrolling during splash
      document.body.classList.add('overflow-hidden');
      
      // Clean up when splash is done
      return () => {
        document.body.classList.remove('overflow-hidden');
      };
    }
  }, []);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
    // Save that user has seen the splash screen
    localStorage.setItem('splashSeen', 'true');
    setHasSeenSplash(true);
    
    // Ensure we navigate to the home page when splash is complete
    navigate("/");
  };

  return (
    <LanguageProvider>
      <NotificationProvider>
        <AuthProvider>
          <SidebarProvider>
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
            
            <div className={`font-body text-offblack bg-white min-h-screen flex flex-col ${!hasSeenSplash ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
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
