import React from 'react';
import Profile from '@/components/Auth/Profile';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/lib/LanguageContext';

const ProfilePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>      <Helmet>
        <title>{t('profile', 'title')} - Ethiopian Orthodox Hub</title>
        <meta name="description" content="Manage your account settings and access authentication options." />
      </Helmet>
        <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-heading text-burgundy text-center mb-6">
            {t('profile', 'title')}
          </h1>
          
          {/* Decorative divider similar to other pages */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gold w-16 sm:w-24"></div>
            <div className="mx-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-burgundy">
                <path d="M12 21a9 9 0 0 1 0-18"/>
                <path d="M12 21a9 9 0 0 0 0-18"/>
                <path d="M12 3v18"/>
              </svg>
            </div>
            <div className="h-px bg-gold w-16 sm:w-24"></div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
