import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { teachings } from "@/lib/data";

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
      <Link href={`/teachings/${slug}`}>
        <a className="inline-block text-darkblue font-semibold hover:text-burgundy transition">
          Read More <ArrowRight className="inline-block ml-1 h-4 w-4" />
        </a>
      </Link>
    </div>
  </div>
);

const TeachingsSection = () => {
  // Display only the first 3 teachings
  const featuredTeachings = teachings.slice(0, 3);

  return (
    <section id="teachings" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-heading text-burgundy text-center mb-2">Spiritual Teachings</h2>
        <p className="text-center text-gray-600 mb-8">Ancient wisdom for contemporary life</p>
        
        <DecorativeDivider />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTeachings.map((teaching) => (
            <TeachingCard 
              key={teaching.id}
              title={teaching.title}
              description={teaching.shortDescription}
              image={teaching.imageUrl}
              slug={teaching.slug}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/teachings">
            <Button className="bg-burgundy text-white font-semibold py-3 px-8 rounded-md hover:bg-opacity-90">
              View All Teachings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeachingsSection;
