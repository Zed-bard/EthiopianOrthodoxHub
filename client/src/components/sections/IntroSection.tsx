import { BookOpen, Calendar, BookOpen as Prayer } from "lucide-react";

const DecorativeDivider = () => (
  <div className="flex items-center justify-center mb-10">
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

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-16 h-16 rounded-full bg-burgundy text-white flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="font-heading text-xl text-burgundy mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

const IntroSection = () => {
  return (
    <section id="home" className="py-16 container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading text-burgundy text-center mb-8">
          Welcome to Our Spiritual Community
        </h2>
        
        <DecorativeDivider />
        
        <p className="text-lg text-center mb-10 leading-relaxed">
          This platform is dedicated to preserving and sharing the rich traditions, teachings, and practices of the Ethiopian Orthodox Tewahedo Church, one of the oldest Christian denominations in the world with a heritage dating back to the 4th century.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <Feature 
            icon={<BookOpen className="text-xl" />}
            title="Sacred Teachings"
            description="Access ancient spiritual wisdom and theological insights from Ethiopian Orthodox tradition."
          />
          
          <Feature 
            icon={<Calendar className="text-xl" />}
            title="Religious Calendar"
            description="Follow the Ethiopian Orthodox calendar with holy days, festivals, and fasting periods."
          />
          
          <Feature 
            icon={<Prayer className="text-xl" />}
            title="Prayers & Hymns"
            description="Discover traditional prayers, chants, and hymns to enrich your spiritual practice."
          />
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
