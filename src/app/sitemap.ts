import { MetadataRoute } from 'next'
import { APIService } from '../services/apiService';



export const getSiteMapDetails=async()=>{
    const slugs = await APIService.getSiteMapDetails();;
    return slugs;

}



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const slugs = await getSiteMapDetails();
    return slugs.map(slug=>({
        url:`https://mytickethero.com/results/${slug}`,
        lastModified: new Date(),
        changeFrequency:'daily',
        priority:1
    }))
}