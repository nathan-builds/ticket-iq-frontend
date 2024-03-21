import type { Metadata } from 'next';
import { Graduate, Inter } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'TicketHero - Compare tickets, save money.'
};

export default function RootLayout({
                                       children
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <meta name="impact-site-verification" content="0239144c-12e6-41a0-9bda-c45e4e9664f7"/>
            <meta name="description"
                  key="desc"
                  content="Compare tickets, save money. Find the best deals for tickets to your next event!
                  We show you tickets and fees from multiple sites so you better understand your options."/>
            <link rel="icon" href="/favicon.ico" sizes="any"/>
        </head>
        <body className={`{inter.className`}>
        {children}
        </body>
        <GoogleAnalytics gaId="G-3KSJG057G7"/>
        </html>
    );
}
