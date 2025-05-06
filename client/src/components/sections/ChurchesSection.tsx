import { ArrowRight } from "lucide-react";
import { churches, traditions } from "@/lib/data";

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

const ChurchCard = ({ 
  name, 
  description, 
  image, 
  slug 
}: { 
  name: string; 
  description: string; 
  image: string; 
  slug: string;
}) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md mb-6 hover:shadow-lg transition duration-300">
    <div className="h-64 overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <h4 className="font-heading text-xl text-burgundy mb-2">{name}</h4>
      <p className="text-gray-700 mb-4">{description}</p>
      <a href={`/churches/${slug}`} className="inline-block text-darkblue font-semibold hover:text-burgundy transition">
        Learn More <ArrowRight className="inline-block ml-1 h-4 w-4" />
      </a>
    </div>
  </div>
);

const TraditionItem = ({ 
  name, 
  description, 
  icon 
}: { 
  name: string; 
  description: string; 
  icon: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <div className="bg-burgundy w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
        <span className="text-gold">{icon}</span>
      </div>
      <h4 className="font-heading text-xl text-burgundy">{name}</h4>
    </div>
    <p className="text-gray-700 mb-3">{description}</p>
    <a href="#" className="text-darkblue font-semibold hover:text-burgundy transition">Read More</a>
  </div>
);

const ChurchesSection = () => {
  // Get 2 featured churches for display
  const featuredChurches = churches.slice(0, 2);
  
  // Get 4 featured traditions for display
  const featuredTraditions = traditions.slice(0, 4);

  return (
    <section id="churches" className="py-16 container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-heading text-burgundy text-center mb-2">Churches & Traditions</h2>
      <p className="text-center text-gray-600 mb-8">Sacred spaces and cultural heritage</p>
      
      <DecorativeDivider />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Iconic Churches Section */}
        <div>
          <h3 className="text-2xl font-heading text-burgundy mb-6">Iconic Churches</h3>
          
          {featuredChurches.map((church) => (
            <ChurchCard 
              key={church.id}
              name={church.name}
              description={church.description}
              image={church.imageUrl}
              slug={church.slug}
            />
          ))}
        </div>
        
        {/* Traditions Section */}
        <div>
          <h3 className="text-2xl font-heading text-burgundy mb-6">Sacred Traditions</h3>
          
          {/* Traditions List */}
          <div className="space-y-6">
            {featuredTraditions.map((tradition) => (
              <TraditionItem 
                key={tradition.id}
                name={tradition.name}
                description={tradition.description}
                icon={tradition.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChurchesSection;
