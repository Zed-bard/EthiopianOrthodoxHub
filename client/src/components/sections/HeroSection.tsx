import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="relative h-96 md:h-[500px] bg-cover bg-center" 
      style={{ backgroundImage: `url('https://pixabay.com/get/g3591fb759308c6609c12b860f18741de4d025f9a013e16f0b77675e8af3f9cc621ccd58bc1e1c554053a15f52ff63078924b0855dbccdd73a90b0585c38d71c7_1280.jpg')` }}
    >
      <div className="absolute inset-0 bg-burgundy bg-opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-heading font-bold drop-shadow-lg">
            Ethiopian Orthodox Faith
          </h2>
          <p className="mt-4 text-white text-xl md:text-2xl font-heading drop-shadow-md max-w-3xl mx-auto">
            Preserving the ancient traditions and spiritual teachings
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/teachings">
              <Button className="bg-gold text-burgundy hover:bg-opacity-90 font-bold py-3 px-8 rounded-md">
                Explore Teachings
              </Button>
            </Link>
            <Link href="/calendar">
              <Button variant="outline" className="bg-white text-burgundy hover:bg-gray-100 font-bold py-3 px-8 rounded-md">
                View Calendar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
