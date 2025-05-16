import { churches, traditions, getChurchesByLanguage, getTraditionsByLanguage } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { PatternBorder } from "@/components/ui/pattern-border";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from 'react-helmet';
import { useLanguage } from "@/lib/LanguageContext";
import { ReactNode } from "react";

const DecorativeDivider = () => (
  <div className="flex items-center justify-center mb-12">
    <div className="h-px bg-gold w-24"></div>
    <div className="mx-4 text-gold">✝️</div>
    <div className="h-px bg-gold w-24"></div>
  </div>
);

interface ChurchCardProps {
  name: ReactNode;
  description: ReactNode;
  image: string;
  slug: string;
}

const ChurchCard = ({ name, description, image, slug }: ChurchCardProps) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md mb-6 hover:shadow-lg transition duration-300">
    <div className="h-64 overflow-hidden">
      <img 
        src={image} 
        alt={typeof name === 'string' ? name : 'Church image'} 
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

interface TraditionItemProps {
  name: ReactNode;
  description: ReactNode;
  icon: string;
}

const TraditionItem = ({ name, description, icon }: TraditionItemProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-4">
    <div className="flex items-center mb-4">
      <div className="bg-burgundy w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
        <span className="text-gold">{icon}</span>
      </div>
      <h4 className="font-heading text-xl text-burgundy">{name}</h4>
    </div>
    <p className="text-gray-700">{description}</p>
  </div>
);

const Churches = () => {
  const { language } = useLanguage();
  const localizedChurches = getChurchesByLanguage(language);
  const localizedTraditions = getTraditionsByLanguage(language);

  return (
    <>
      <Helmet>
        <title>Maatiwwaan M/Q/Gabra-Kiristoos | Ethiopian Orthodox Hub</title>
        <meta name="description" content="Discover the rich theological traditions, doctrinal teachings, and sacred practices of the Ethiopian Orthodox Tewahedo Church." />
      </Helmet>
      <div className="py-16 min-h-screen">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-heading text-burgundy text-center mb-2">Maatiwwaan M/Q/Gabra-Kiristoos</h3>
          <p className="text-center text-gray-700 mb-8">Jaalalaa Afuura fi Obbolummaa Dhugaa</p>
          
          <DecorativeDivider />
          
          <Tabs defaultValue="churches" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="churches" className="text-lg">Doctrinal Teachings</TabsTrigger>
              <TabsTrigger value="traditions" className="text-lg">Sacred Traditions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="churches" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {localizedChurches.map((church) => (
                  <ChurchCard 
                    key={church.id}
                    name={church.name as unknown as ReactNode}
                    description={church.description as unknown as ReactNode}
                    image={church.imageUrl}
                    slug={church.slug}
                  />
                ))}
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200 mt-12">
                <h2 className="text-xl font-heading text-burgundy mb-4">The Seven Sacraments</h2>
                <PatternBorder className="mb-6" />
                <p className="text-gray-700 mb-4">
                  The Ethiopian Orthodox Church recognizes seven holy sacraments (mysteries) that form the foundation of spiritual life:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li><strong>Baptism</strong> (ጥምቀት) - The gateway to Christian life</li>
                  <li><strong>Confirmation</strong> (ሜሮን) - The seal of the Holy Spirit</li>
                  <li><strong>Holy Communion</strong> (ቁርባን) - The body and blood of Christ</li>
                  <li><strong>Confession</strong> (ንስሐ) - The sacrament of reconciliation</li>
                  <li><strong>Holy Orders</strong> (ክህነት) - The sacrament of priesthood</li>
                  <li><strong>Matrimony</strong> (ተክሊል) - The sacred union of marriage</li>
                  <li><strong>Anointing of the Sick</strong> (ቀንዲል) - Healing of body and soul</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="traditions" className="space-y-6">
              {localizedTraditions.map((tradition) => (
                <TraditionItem 
                  key={tradition.id}
                  name={tradition.name as unknown as ReactNode}
                  description={tradition.description as unknown as ReactNode}
                  icon={tradition.icon}
                />
              ))}
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200 mt-8">
                <h2 className="text-2xl font-heading text-burgundy mb-4">Living Faith</h2>
                <PatternBorder className="mb-6" />
                <p className="text-gray-700">
                  The Ethiopian Orthodox Tewahedo Church preserves ancient apostolic traditions and practices that have shaped Ethiopian Christianity for nearly two millennia. These include extensive fasting periods, unique liturgical music, distinctive cross traditions, and the veneration of the Ark of the Covenant (Tabot).
                </p>
                <p className="text-gray-700 mt-4">
                  The Church maintains its distinctive theological position on the nature of Christ (Tewahedo), emphasizing the perfect union of His divine and human natures, while preserving ancient liturgical practices in the Ge'ez language.
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
