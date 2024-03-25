import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar/navbar';
import { NavbarResults } from '@/components/navbar/navbar-results';

export default function ResultsLayout({
                                          children // will be a page or nested layout
                                      }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavbarResults/>
            {children}
            <Footer/>
        </div>
    );
}