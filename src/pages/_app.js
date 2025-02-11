import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import i18n from '../i18n';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    i18n.init();

    if (typeof window !== 'undefined' && router.pathname === '/') {
      router.replace('/dashboard');
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;