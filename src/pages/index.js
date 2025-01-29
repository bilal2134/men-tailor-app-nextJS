// src/pages/index.js
import LanguageToggle from '../components/LanguageToggle';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-end p-4">
      <LanguageToggle />
    </div>
    // ...rest of your component
  );
}