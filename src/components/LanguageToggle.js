// src/components/LanguageToggle.js
'use client';

import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button onClick={toggleLanguage} className="px-4 py-2 bg-blue-500 text-white rounded">
      {i18n.language === 'en' ? 'Urdu' : 'English'}
    </button>
  );
};

export default LanguageToggle;