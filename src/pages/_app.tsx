import React from 'react';
import type { AppProps } from 'next/app';
import { SearchProvider } from '../contexts/SearchContext';
import GlobalStyles from '../styles/GlobalStyles';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SearchProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </SearchProvider>
  );
};

export default MyApp;
