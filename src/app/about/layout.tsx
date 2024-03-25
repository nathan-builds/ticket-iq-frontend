import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer';


export default function AboutLayout({
                                        children
                                    }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
}