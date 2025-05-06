import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import Teachings from "@/pages/Teachings";
import Calendar from "@/pages/Calendar";
import Prayers from "@/pages/Prayers";
import Churches from "@/pages/Churches";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/teachings" component={Teachings} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/prayers" component={Prayers} />
      <Route path="/churches" component={Churches} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="font-body text-offblack bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Router />
      </main>
      <Footer />
    </div>
  );
}

export default App;
