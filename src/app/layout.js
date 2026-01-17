'use client';

import './globals.css';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from "primereact/api";
import AppToast from './shared/AppToast';
import { Provider } from 'react-redux';
import store from './store/store';

//import LoadingSpinner from '@/components/LoadingSpinner';
import GlobalLoading from '@/components/GlobalLoading';

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className="antialiased">
     
          <Provider store={store}>
            <GlobalLoading/>
          <PrimeReactProvider>
            {children}
            </PrimeReactProvider>
            <AppToast />
          </Provider>
        
      </body>
    </html>
  );
}
