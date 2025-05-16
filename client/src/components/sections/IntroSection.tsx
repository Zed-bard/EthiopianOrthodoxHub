import { useLanguage } from "@/lib/LanguageContext";
import AnimatedImage3D from "@/components/AnimatedImage3D";
import AnimatedIconFeature from "@/components/AnimatedIconFeature";
import { useRef } from "react";

const DecorativeDivider = () => (
  <div className="flex items-center justify-center mb-6 sm:mb-10">
    <div className="h-px bg-gold w-16 sm:w-24"></div>
    <div className="mx-3 sm:mx-4 text-gold">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-xl sm:w-6 sm:h-6">
        <path d="M12 2l2 4h3l-2.5 3 1 4-3.5-2-3.5 2 1-4L7 6h3z"/>
        <path d="M12 14v8"/>
      </svg>
    </div>
    <div className="h-px bg-gold w-16 sm:w-24"></div>
  </div>
);

const Feature = ({ imageUrl, title, description }: { imageUrl: string; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center px-4 sm:px-6">
    <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-4">
      <AnimatedIconFeature imageUrl={imageUrl} alt={title} />
    </div>
    <h3 className="font-heading text-lg sm:text-xl text-burgundy mb-2">{title}</h3>
    <p className="text-sm sm:text-base text-gray-700">{description}</p>
  </div>
);

const AnimatedImages = () => {
  return (
    <AnimatedImage3D 
      image1Url="/Gabre22 (1) copy.png"
      image2Url="/Gabre22 (2) copy.png"
      caption="Misirroo Qulqulluu Gabra Kiristoos"
      direction="horizontal"
    />
  );
};

const IntroSection = () => {
  const { t } = useLanguage();

  const locale: "en" | "am" | "om" | "ti" = "en"; // Change this dynamically
  const sacredTeachings = {
    title: {
      en: "Dubbii Qulqulloota",
      am: " ነገረ ቅዱሳን",
      om: "Dubbii Qulqulloota",
      ti: "ቅዱሳን ምስክር"
    },
    description: {
      en: "Explore the foundational beliefs and sacred teachings of the Ethiopian Orthodox Church.",
      am: "የኢትዮጵያ ኦርቶዶክስ ቤተክርስቲያን መሠረታዊ እምነቶችንና ቅዱሳን ትምህርቶችን ያስሱ።",
      om: "Amantii bu'uuraa fi barsiisaa qulqulluu Ortodoksiin Itoophiyaa qoradhu.",
      ti: "መሰረታዊ እምነታትንን ንቅዱሳን ትምህርቲ ቤተክርስቲያን ኦርቶዶክስ ኢትዮጵያ ምርመራ።"
    },
  };

  return (
    <section id="home" className="py-10 sm:py-16 container mx-auto px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-burgundy text-center mb-6 sm:mb-8 leading-tight">
          {t('introSection', 'Amantaa')}
        </h2>
        
        <DecorativeDivider />
        
        <p className="text-base sm:text-lg text-center mb-8 sm:mb-10 leading-relaxed text-gray-700 max-w-[90%] sm:max-w-full mx-auto">
          {t('introSection', 'Ajaja Waaqayyoo Eegani Jiraachuu')}
        </p>
        
        <AnimatedImages />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mt-8 sm:mt-12">
          <Feature 
            imageUrl="/Book.jpg"
            title={sacredTeachings.title[locale]}
            description={sacredTeachings.description[locale]}
          />
          <Feature 
            imageUrl="/BotBanner.jpg"
            title={t('introSection.features.religiousCalendar', 'Hikkaa Abboomiwwaan kurnanii')}
            description={t('introSection.features.religiousCalendar', 'Yeroo Dhihootti Nu eegaa')}
          />
          
          <Feature 
            imageUrl="/Amantaa.png"
            title={t('introSection.features.prayersHymns', 'Eeyyama Waaqayyoo')}
            description={t('introSection.features.prayersHymns', 'Yaada Waaqayyoo Eenyutu Beekaa?')}
          />
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
