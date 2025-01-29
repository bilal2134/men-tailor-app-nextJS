import '../styles/globals.css';
import { useEffect } from 'react';
import i18n from '../i18n';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    i18n.init();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;