import { Searchbar } from '@/components/searchbar';
import { PerformerSlider } from '@/components/performer/performer-slider';
import { APIService } from '@/services/apiService';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar/navbar';
import { LocalizedSuggestions } from '@/components/localized-suggestions';

interface PageProps {
    searchParams: { lat?: string, lon?: string, city?: string, region?: string, country?: string };
}

export default async function Home(props: PageProps) {


    const categories = await APIService.getHomeSuggestions();
    const localSuggestions = await APIService.getLocalSuggestions(
        props.searchParams.lat,
        props.searchParams.lon,
        props.searchParams.region,
        props.searchParams.city,
        props.searchParams.country
    );

    /**
     * If there are local suggestions use them to populate the local suggestions component
     */
    return (
        <div>
            <Navbar/>
            <div className="flex flex-col items-center my-20">
                <div className="font-semibold text-xl md:text-3xl mb-10">
                    Compare tickets, save money.
                </div>
                <div className="w-11/12 lg:w-1/2">
                    <Searchbar color={'#15AB99'} borderRadius={15} height={55}/>
                </div>
                {
                    localSuggestions && <LocalizedSuggestions suggestions={localSuggestions}/>
                }

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
            <Footer/>
        </div>

    );
}
