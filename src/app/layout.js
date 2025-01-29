// src/app/layout.js
'use client';

import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import LanguageToggle from '../components/LanguageToggle';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

export default function RootLayout({ children }) {
  const { t } = useTranslation();

  return (
    <html lang={i18n.language}>
      <body>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <div className="flex justify-end p-4">
              <LanguageToggle />
            </div>
            {children}
          </AuthProvider>
        </I18nextProvider>
      </body>
    </html>
  );
}