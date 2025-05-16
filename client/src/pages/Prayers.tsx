import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { prayers, PrayerCategory, getPrayersByLanguage, getPrayerCategoriesByLanguage } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";
import { Helmet } from 'react-helmet';
import { PatternBorder } from "@/components/ui/pattern-border";
import { Prayer } from "@/lib/types";

const DecorativeDivider = () => (
  <div className="flex items-center justify-center mb-12">
    <div className="h-px bg-gold w-24"></div>
    <div className="mx-4 text-gold">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-xl">
        <path d="M12 2l2 4h3l-2.5 3 1 4-3.5-2-3.5 2 1-4L7 6h3z"/>
        <path d="M12 14v8"/>
      </svg>
    </div>
    <div className="h-px bg-gold w-24"></div>
  </div>
);

const CategoryButton = ({ 
  category, 
  active, 
  onClick 
}: { 
  category: string; 
  active: boolean; 
  onClick: () => void;
}) => (
  <button 
    className={`px-6 py-2 rounded-full transition duration-300 ${
      active 
        ? "bg-burgundy text-white" 
        : "bg-white text-burgundy hover:bg-burgundy hover:text-white"
    }`}
    onClick={onClick}
  >
    {category}
  </button>
);

const PrayerCard = ({ 
  title,
  originalTitle,
  description,
  category,
  imageUrl,
  slug
}: { 
  title: string;
  originalTitle: string;
  description: string;
  category: string;
  imageUrl: string;
  slug: string;
}) => (
  <div className="prayer-card relative bg-white rounded-lg overflow-hidden shadow-md group">
    <div className="h-48 overflow-hidden">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="prayer-overlay absolute inset-0 bg-burgundy bg-opacity-70 flex items-center justify-center opacity-0 transition-opacity duration-300">
        <Link href={`/prayers/${slug}`}>
          <Button className="bg-white text-burgundy py-2 px-6 rounded-md hover:bg-gold transition duration-300">
            Read Full Prayer
          </Button>
        </Link>
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-heading text-xl text-burgundy">{title}</h3>
        <span className="text-xs bg-gold bg-opacity-20 text-burgundy px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  </div>
);

const Prayers = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { t, language } = useLanguage();
  
  // Get prayers and categories using our helper functions
  const localizedPrayers = getPrayersByLanguage(language);
  const availableCategories = getPrayerCategoriesByLanguage(language);
  
  // Get all unique categories
  const categories = ["All", ...availableCategories];
  
  // Filter prayers by active category
  const filteredPrayers = activeCategory === "All" 
    ? localizedPrayers 
    : localizedPrayers.filter(prayer => prayer.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>{t('prayersSection', 'title')} | Ethiopian Orthodox Portal</title>
        <meta name="description" content={t('prayersSection', 'subtitle')} />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-heading text-burgundy text-center mb-4">
            {t('prayersSection', 'title')}
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('prayersSection', 'subtitle')}
          </p>
          
          <DecorativeDivider />
          
          {/* Prayer Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <CategoryButton 
                key={category}
                category={category} 
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            ))}
          </div>
          
          {/* Prayer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrayers.map((prayer) => (
              <PrayerCard 
                key={prayer.id}
                title={prayer.title}
                originalTitle={prayer.originalTitle}
                description={prayer.description}
                category={prayer.category}
                imageUrl={prayer.imageUrl}
                slug={prayer.slug}
              />
            ))}
          </div>
          
          {/* Prayer Practice Guidelines */}
          <div className="max-w-4xl mx-auto mt-16 bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-heading text-burgundy mb-4">
              {t('prayersSection.prayerPracticeGuidelines', 'Baafata')}
            </h2>
            <div className="h-1 bg-burgundy/20 my-6" />
            <div className="space-y-4">
              <p className="text-gray-700">
                {t('prayersSection.prayerPracticeGuidelines', 'Seensa')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>{t('prayersSection.prayerPracticeGuidelines.guidelines', 'Misirroo Q/Gabra-Kiristoos')}</li>
                <li>{t('prayersSection.prayerPracticeGuidelines.guidelines', 'Hundeefemaa Xofoo')}</li>
                <li>{t('prayersSection.prayerPracticeGuidelines.guidelines', 'Karoora Waldaa ykn Xofoo M/Q/G/K')}</li>
                <li>{t('prayersSection.prayerPracticeGuidelines.guidelines', 'Hojiiwwaan Yeroo Darbaan Xoficha Raawwatamman')}</li>
                <li>{t('prayersSection.prayerPracticeGuidelines.guidelines', 'Ergaa Waligalaa')}</li>
              </ul>
              <p className="text-gray-700 mt-4">
                {t('prayersSection.prayerPracticeGuidelines', 'conclusion')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prayers;
