import './globals.scss';
import { Inter } from 'next/font/google';
import Header from '../_components/base/Header';
import Footer from '../_components/base/Footer';
import GoogleAnalytics from '../_components/base/GoogleAnalytics';
import { Metadata } from 'next';
import { StateContextProvider } from '../context';

export const metadata: Metadata = {
  title: {
    template: '%s | metaTrendTalks.com',
    default: 'metaTrendTalks.com - メタトレンドトークス',
  },
};

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <StateContextProvider>
          <Header></Header>
          <main>{children}</main>
          <Footer></Footer>
        </StateContextProvider>
      </body>
    </html>
  );
}
