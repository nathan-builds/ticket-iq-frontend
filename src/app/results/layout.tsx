import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

export default function ResultsLayout({
                                          children // will be a page or nested layout
                                      }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            {children}
            <Toaster/>
            <Footer/>
        </div>
    );
}