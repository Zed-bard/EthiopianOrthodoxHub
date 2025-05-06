import { teachings } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { PatternBorder } from "@/components/ui/pattern-border";
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
  return (
    <>
      <Helmet>
        <title>Spiritual Teachings | Ethiopian Orthodox Portal</title>
        <meta name="description" content="Explore the rich theological teachings and traditions of the Ethiopian Orthodox Church including scriptures, saints, doctrine, and ancient wisdom." />
      </Helmet>
      <div className="py-16 min-h-screen">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-heading text-burgundy text-center mb-2">Spiritual Teachings</h1>
          <p className="text-center text-gray-600 mb-8">Ancient wisdom for contemporary life</p>
          
          <DecorativeDivider />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {teachings.map((teaching) => (
              <TeachingCard 
                key={teaching.id}
                title={teaching.title}
                description={teaching.shortDescription}
                image={teaching.imageUrl}
                slug={teaching.slug}
              />
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-heading text-burgundy mb-4">Preserving Sacred Knowledge</h2>
            <PatternBorder className="mb-6" />
            <p className="text-gray-700 mb-4">
              The Ethiopian Orthodox Tewahedo Church has preserved a rich tradition of theological scholarship for centuries. The church maintains a unique biblical canon that includes books not found in other Christian traditions such as the Book of Enoch, Jubilees, and others.
            </p>
            <p className="text-gray-700">
              Our teachings section is dedicated to making these sacred texts and interpretations accessible to a wider audience while maintaining their profound spiritual essence and context within the Ethiopian Orthodox tradition.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Teachings;
