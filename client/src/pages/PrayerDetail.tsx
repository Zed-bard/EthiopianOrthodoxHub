import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext';
import { prayers } from '../lib/data';
import { Prayer } from '../lib/types';

export const PrayerDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string; }>();
  const { language } = useLanguage();
  const langKey = language as 'en' | 'am' | 'om' | 'ti';

  const prayer = prayers.find(p => p.slug === slug);

  if (!prayer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Prayer not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero Section */}
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <img 
            src={prayer.imageUrl} 
            alt={prayer.title[langKey]} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{prayer.title[langKey]}</h1>
            <p className="text-lg opacity-90">{prayer.content.time}</p>
          </div>
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full">
            {prayer.category[langKey]}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {language === 'en' ? 'Description' :
             language === 'am' ? 'መግለጫ' :
             language === 'om' ? 'Ibsa' :
             'መግለጺ'}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {prayer.description[langKey]}
          </p>
        </div>

        {/* Significance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {language === 'en' ? 'Spiritual Significance' :
             language === 'am' ? 'መንፈሳዊ ፋይዳ' :
             language === 'om' ? 'Faayidaa Hafuuraa' :
             'መንፈሳዊ ጥቕሚ'}
          </h2>
          <div className="space-y-4">
            {prayer.content.significance[langKey].map((point: string, index: number) => (
              <div key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 mt-2 mr-3 bg-blue-500 rounded-full" />
                <p className="text-gray-700 dark:text-gray-300">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Original Title */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {language === 'en' ? 'Original Title' :
             language === 'am' ? 'የመጀመሪያው ስም' :
             language === 'om' ? 'Maqaa Jalqabaa' :
             'መበገሲ ሽም'}
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            {prayer.originalTitle}
          </p>
        </div>
      </div>
    </div>
  );
}; 