import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import TeachingsSection from "@/components/sections/TeachingsSection";
import CalendarSection from "@/components/sections/CalendarSection";
import PrayersSection from "@/components/sections/PrayersSection";
import ChurchesSection from "@/components/sections/ChurchesSection";
import CallToActionSection from "@/components/sections/CallToActionSection";
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Ethiopian Orthodox Spiritual Portal - Ancient Faith Traditions & Teachings</title>
        <meta name="description" content="Explore the rich traditions, teachings, and practices of the Ethiopian Orthodox Tewahedo Church. Access prayers, calendar, religious content, and more." />
      </Helmet>
      <div>
        <HeroSection />
        <IntroSection />
        <TeachingsSection />
        <CalendarSection />
        <PrayersSection />
        <ChurchesSection />
        <CallToActionSection />
      </div>
    </>
  );
};

export default Home;
