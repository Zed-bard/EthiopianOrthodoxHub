import { churches, traditions } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { PatternBorder } from "@/components/ui/pattern-border";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from 'react-helmet';

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

const Churches = () => {
  return (
    <>
      <Helmet>
        <title>Churches & Traditions | Ethiopian Orthodox Portal</title>
        <meta name="description" content="Explore iconic Ethiopian Orthodox churches and sacred traditions, from rock-hewn churches to festivals, liturgical music, and fasting practices." />
      </Helmet>
      <div className="py-16 min-h-screen">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-heading text-burgundy text-center mb-2">Churches & Traditions</h1>
          <p className="text-center text-gray-600 mb-8">Sacred spaces and cultural heritage</p>
          
          <DecorativeDivider />
          
          <Tabs defaultValue="churches" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="churches" className="text-lg">Iconic Churches</TabsTrigger>
              <TabsTrigger value="traditions" className="text-lg">Sacred Traditions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="churches" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {churches.map((church) => (
                  <ChurchCard 
                    key={church.id}
                    name={church.name}
                    description={church.description}
                    image={church.imageUrl}
                    slug={church.slug}
                  />
                ))}
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200 mt-12">
                <h2 className="text-2xl font-heading text-burgundy mb-4">Church Architecture</h2>
                <PatternBorder className="mb-6" />
                <p className="text-gray-700 mb-4">
                  Ethiopian Orthodox church architecture is distinctive, often featuring three concentric circular or octagonal sections:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li><strong>Qene Mahlet</strong> (outer section): Where the choir sings.</li>
                  <li><strong>Kiddist</strong> (middle section): Where the congregation stands for the liturgy.</li>
                  <li><strong>Mekdes</strong> (inner sanctum): Housing the tabot (replica of the Ark of the Covenant), accessible only to priests.</li>
                </ul>
                <p className="text-gray-700">
                  Churches are traditionally oriented east-west, with the sanctuary in the east. The interiors are often decorated with colorful religious paintings depicting biblical scenes and Ethiopian Orthodox saints.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="traditions" className="space-y-6">
              {traditions.map((tradition) => (
                <TraditionItem 
                  key={tradition.id}
                  name={tradition.name}
                  description={tradition.description}
                  icon={tradition.icon}
                />
              ))}
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200 mt-8">
                <h2 className="text-2xl font-heading text-burgundy mb-4">The Importance of Tradition</h2>
                <PatternBorder className="mb-6" />
                <p className="text-gray-700">
                  Traditions in the Ethiopian Orthodox Church are not merely cultural practices but are considered integral to the faith itself. They embody centuries of spiritual wisdom and connect believers to the apostolic origins of Christianity in Ethiopia, traditionally attributed to the conversion of the Ethiopian eunuch by Philip the Evangelist (Acts 8:26-40) and later to the missionary work of Frumentius in the 4th century.
                </p>
                <p className="text-gray-700 mt-4">
                  These sacred traditions have been carefully preserved even through periods of hardship and persecution, serving as a testament to the resilience and devotion of Ethiopian Orthodox believers throughout history.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Churches;
