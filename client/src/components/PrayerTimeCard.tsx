import React from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '../lib/LanguageContext';
import { Prayer } from '../lib/types';

interface PrayerTimeCardProps {
  prayer: Prayer;
}

export const PrayerTimeCard: React.FC<PrayerTimeCardProps> = ({ prayer }) => {
  const [, setLocation] = useLocation();
  const { language } = useLanguage();
  const langKey = language as 'en' | 'am' | 'om' | 'ti';

  const handleClick = () => {
    setLocation(`/prayers/${prayer.slug}`);
  };

  return (
    <div 
      className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white dark:bg-gray-800"
      onClick={handleClick}
    >
      <div className="relative h-48">
        <img 
          src={prayer.imageUrl} 
          alt={prayer.title[langKey]} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-1">{prayer.title[langKey]}</h3>
          <p className="text-sm opacity-90">{prayer.content.time}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {prayer.description[langKey]}
        </p>
        <div className="space-y-2">
          {prayer.content.significance[langKey].map((point, index) => (
            <div key={index} className="flex items-start">
              <span className="inline-block w-2 h-2 mt-1.5 mr-2 bg-blue-500 rounded-full" />
              <p className="text-sm text-gray-700 dark:text-gray-200">{point}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
        {prayer.category[langKey]}
      </div>
    </div>
  );
}; 