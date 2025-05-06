import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { prayers, PrayerCategory } from "@/lib/data";

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
  image, 
  category,
  slug
}: { 
  title: string; 
  originalTitle: string; 
  description: string; 
  image: string; 
  category: PrayerCategory;
  slug: string;
}) => (
  <div className="prayer-card relative bg-white rounded-lg overflow-hidden shadow-md group">
    <div className="h-48 overflow-hidden">
      <img 
        src={image} 
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
        <h3 className="font-heading text-xl text-burgundy">{originalTitle}</h3>
        <span className="text-xs bg-gold bg-opacity-20 text-burgundy px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  </div>
);

const PrayersSection = () => {
  const [activeCategory, setActiveCategory] = useState<PrayerCategory | "All">("All");
  
  // Get all unique categories
  const categories: (PrayerCategory | "All")[] = ["All", ...new Set(prayers.map(prayer => prayer.category))];
  
  // Filter prayers by active category
  const filteredPrayers = activeCategory === "All" 
    ? prayers.slice(0, 3) 
    : prayers.filter(prayer => prayer.category === activeCategory).slice(0, 3);

  return (
    <section id="prayers" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-heading text-burgundy text-center mb-2">Prayers & Hymns</h2>
        <p className="text-center text-gray-600 mb-8">Sacred texts for devotion and worship</p>
        
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
              image={prayer.imageUrl}
              category={prayer.category}
              slug={prayer.slug}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/prayers">
            <Button className="bg-burgundy text-white font-semibold py-3 px-8 rounded-md hover:bg-opacity-90">
              View All Prayers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PrayersSection;
