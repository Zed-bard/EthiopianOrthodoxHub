import { ArrowRight } from "lucide-react";
import { PatternBorder } from "@/components/ui/pattern-border";
import { useLanguage } from "@/lib/LanguageContext";
import { getChurchesByLanguage } from "@/lib/data";
import { ReactNode } from "react";

const ChurchesSection = () => {
  const { language } = useLanguage();
  const churches = getChurchesByLanguage(language).slice(0, 3); // Show only first 3 churches

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading text-burgundy mb-4">
            Maatiwwaan Misirroo Q/Gabra-Kiristos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jaalala Afuura fi Obbolummaa Dhugaa
          </p>
          <PatternBorder className="mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {churches.map((church) => (
            <div key={church.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src={church.imageUrl}
                  alt={typeof church.name === 'string' ? church.name : 'Church image'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl text-burgundy mb-3">{church.name as unknown as ReactNode}</h3>
                <p className="text-gray-700 mb-4 line-clamp-3">{church.description as unknown as ReactNode}</p>
                <a
                  href={`/churches#${church.slug}`}
                  className="inline-flex items-center text-darkblue font-semibold hover:text-burgundy transition"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/churches"
            className="inline-flex items-center px-6 py-3 bg-burgundy text-white rounded-lg hover:bg-darkblue transition duration-300"
          >
            Explore All Teachings <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ChurchesSection;
