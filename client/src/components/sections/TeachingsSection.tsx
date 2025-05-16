import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { teachings, getLocalizedContent, getTeachingsByLanguage } from "@/lib/data";
import { useLanguage, translations } from "@/lib/LanguageContext";

const DecorativeDivider = () => (
  <div className="flex items-center justify-center mb-8 sm:mb-12">
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
    <div className="h-40 sm:h-48 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4 sm:p-6">
      <h3 className="font-heading text-lg sm:text-xl text-burgundy mb-2 line-clamp-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-700 mb-4 line-clamp-3">{description}</p>
      <Link href={`/teachings/${slug}`}>
        <a className="inline-flex items-center text-sm sm:text-base text-darkblue font-semibold hover:text-burgundy transition">
          Read More <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </Link>
    </div>
  </div>
);

const TeachingsSection = () => {
  const { t, language } = useLanguage();
  
  // Get localized teachings using our helper function and display only first 3
  const localizedTeachings = getTeachingsByLanguage(language).slice(0, 3);

  // Get the categories object from translations
  const categoryTitleTranslations = translations.teachingsSection.categories as Record<string, Record<string, string>>;

  return (
    <section id="teachings" className="py-10 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-burgundy text-center mb-2 leading-tight">
          {t('teachingsSection', 'title')}
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-[90%] mx-auto">
          {t('teachingsSection', 'subtitle')}
        </p>
        
        <DecorativeDivider />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {localizedTeachings.map((teaching) => (
            <TeachingCard 
              key={teaching.id}
              title={teaching.title}
              description={teaching.shortDescription}
              image={teaching.imageUrl}
              slug={teaching.slug}
            />
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {Object.entries(categoryTitleTranslations).map(([slug, translationsByLang]) => (
              <Link key={slug} href={`/teachings?category=${slug}`}>
                <Button variant="outline" className="w-full border-burgundy text-burgundy hover:bg-burgundy hover:text-white transition">
                  {translationsByLang[language] || translationsByLang['en']} 
                </Button>
              </Link>
            ))}
          </div>
          
          <Link href="/teachings">
            <Button className="bg-burgundy text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-md hover:bg-opacity-90 text-sm sm:text-base w-full sm:w-auto">
              {t('teachingsSection', 'viewAllTeachings')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeachingsSection;
