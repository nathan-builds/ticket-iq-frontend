import type { Metadata } from 'next';
import { Graduate, Inter } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'TicketHero',
    description: 'A better way to find tickets'

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
            <link rel="icon" href="/favicon.ico" sizes="any"/>
            <link
                rel="icon"
                href="/src/app/icon.JPG"
                type="image/<generated>"
                sizes="any"
            />
        </head>
        <body className={inter.className}>{children}</body>
        <GoogleAnalytics gaId="G-3KSJG057G7"/>
        </html>
    );
}
