import { teachings, getTeachingsByLanguage } from "@/lib/data";
import { ArrowRight, Filter } from "lucide-react";
import { PatternBorder } from "@/components/ui/pattern-border";
import { Helmet } from 'react-helmet';
import { useLanguage, translations } from "@/lib/LanguageContext";
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';

// Type for the localized teaching object returned by getTeachingsByLanguage
type LocalizedTeaching = {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  imageUrl: string;
};

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

const TeachingCard = ({ 
  title, 
  description, 
  image,
  slug
}: { 
  title: string; 
  description: string; 
  image: string;
  slug: string;
}) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
    <div className="h-48 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <h3 className="font-heading text-xl text-burgundy mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <a href={`/teachings/${slug}`} className="inline-block text-darkblue font-semibold hover:text-burgundy transition">
        Read More <ArrowRight className="inline-block ml-1 h-4 w-4" />
      </a>
    </div>
  </div>
);

const Teachings = () => {
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const [filteredTeachings, setFilteredTeachings] = useState<LocalizedTeaching[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Get teachings from our helper function
  const localizedTeachings = getTeachingsByLanguage(language);
  
  // Get the category title translations from LanguageContext
  const categoryTitleTranslations = translations.teachingsSection.categories as Record<string, Record<string, string>>;

  // Parse URL params to get category filter
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    const categorySlug = params.get('category');
    
    if (categorySlug) {
      setActiveCategory(categorySlug);
      // Ensure teaching.slug is compared accurately
      setFilteredTeachings(localizedTeachings.filter(teaching => teaching.slug === categorySlug));
    } else {
      setActiveCategory(null);
      setFilteredTeachings(localizedTeachings);
    }
  }, [location, localizedTeachings, language]); // language dependency added for getActiveCategoryName consistency if it were to re-render
  
  // Get the active category name to display
  const getActiveCategoryName = () => {
    if (!activeCategory || !categoryTitleTranslations[activeCategory]) return '';
    return categoryTitleTranslations[activeCategory][language] || categoryTitleTranslations[activeCategory]['en'];
  };

  return (
    <>
      <Helmet>
        <title>
          {activeCategory 
            ? `${getActiveCategoryName()} | ${t('teachingsSection', 'title')}`
            : `${t('teachingsSection', 'title')} | Ethiopian Orthodox Portal`
          }
        </title>
        <meta name="description" content={t('teachingsSection', 'subtitle')} />
      </Helmet>
      <div className="py-16 min-h-screen">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-heading text-burgundy text-center mb-2">
            {activeCategory 
              ? getActiveCategoryName()
              : t('teachingsSection', 'title')
            }
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {t('teachingsSection', 'subtitle')}
          </p>
          
          <DecorativeDivider />
          
          {/* Category filters */}
          <div className="mb-10">
            <div className="flex items-center justify-center flex-wrap gap-3">
              <a href="/teachings"> {/* Changed to <a> for simplicity, can be <Link> from wouter */}
                <Button 
                  variant={!activeCategory ? "default" : "outline"} 
                  className={!activeCategory ? "bg-burgundy text-white" : "border-burgundy text-burgundy hover:bg-burgundy hover:text-white"}
                >
                  All
                </Button>
              </a>
              {Object.entries(categoryTitleTranslations).map(([slug, titlesByLang]) => (
                <a key={slug} href={`/teachings?category=${slug}`}> {/* Changed to <a> for simplicity */}
                  <Button 
                    variant={activeCategory === slug ? "default" : "outline"} 
                    className={activeCategory === slug ? "bg-burgundy text-white" : "border-burgundy text-burgundy hover:bg-burgundy hover:text-white"}
                  >
                    {titlesByLang[language] || titlesByLang['en']}
                  </Button>
                </a>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredTeachings.map((teaching) => (
              <TeachingCard 
                key={teaching.id}
                title={teaching.title}
                description={teaching.shortDescription}
                image={teaching.imageUrl}
                slug={teaching.slug}
              />
            ))}
            
            {filteredTeachings.length === 0 && (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No teachings found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Teachings;
