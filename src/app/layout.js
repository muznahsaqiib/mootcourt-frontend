'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from "primereact/api";
import AppToast from './shared/AppToast';
import { Provider } from 'react-redux';
import store from './store/store';

import LoadingSpinner from '@/components/LoadingSpinner';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
     
          <Provider store={store}>
            <LoadingSpinner/>
          <PrimeReactProvider>
            {children}
            </PrimeReactProvider>
            <AppToast />
          </Provider>
        
      </body>
    </html>
  );
}
