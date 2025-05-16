import React from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import { prayers } from '../../lib/data';
import { PrayerTimeCard } from '../PrayerTimeCard';

export const PrayersSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {language === 'en' ? 'Daily Prayer Times' :
           language === 'am' ? 'የዕለት ጸሎት ጊዜያት' :
           language === 'om' ? 'Yeroo Kadhannaa Guyyaa' :
           'ዕለታዊ ግዜያት ጸሎት'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prayers.map((prayer) => (
            <PrayerTimeCard key={prayer.id} prayer={prayer} />
          ))}
        </div>
      </div>
    </section>
  );
};
