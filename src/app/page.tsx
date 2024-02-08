import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Searchbar } from '@/components/searchbar';
import { PerformerSlider } from '@/components/performer-slider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Category } from '@/utils/models';
import { APIService } from '@/services/apiService';


export default async function Home() {

    const categories = await APIService.getHomeSuggestions();
    return (
        <div>
            <Navbar/>
            <div className="flex flex-col items-center my-20">
                <div className="font-semibold text-xl md:text-3xl mb-10">
                    A smarter way to find tickets.
                </div>
                <div className="w-11/12 lg:w-1/2">
                    <Searchbar color={'#15AB99'} borderRadius={15} height={55}/>
                </div>
                {categories.map((category, idx) => {
                    return (
                        <div key={idx} className="w-11/12">
                            <div className="font-semibold text-xl md:text-3xl align self-start mt-5">
                                {category.title}
                            </div>
                            <PerformerSlider performers={category.performers}/>
                        </div>
                    );
                })}
            </div>
        </div>

    );
}
