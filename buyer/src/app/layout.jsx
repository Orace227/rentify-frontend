'use client';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RTL from '@/app/(DashboardLayout)/layout/shared/customizer/RTL';
import { ThemeSettings } from '@/utils/theme/Theme';
import { store } from '@/store/store';
import { useSelector } from 'react-redux';
// import { AppState } from "@/store/store";
import { Provider } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import '@/utils/i18n';
import { NextAppDirEmotionCacheProvider } from '@/utils/theme/EmotionCache';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import axios from 'axios';

export const MyApp = ({ children }) => {
  const theme = ThemeSettings();

  const customizer = useSelector((state) => state.customizer);
  axios.defaults.baseURL = 'http://localhost:8000/api/v1';
  axios.defaults.withCredentials = true;
  return (
    <>
      <NextAppDirEmotionCacheProvider options={{ key: 'modernize' }}>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <RTL direction={customizer.activeDir}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {children}
            </RTL>
          </ThemeProvider>
        </SessionProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
};

export default function RootLayout({ children }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setLoading(true), 3000);
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>odoo project</title>
      </Head>

      <body>
        <Provider store={store}>
          {loading ? (
            // eslint-disable-next-line react/no-children-prop
            <MyApp children={children} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Provider>
      </body>
    </html>
  );
}
