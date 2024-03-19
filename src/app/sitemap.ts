import { MetadataRoute } from 'next';
import { APIService } from '../services/apiService';


export const getSiteMapDetails = async () => {
    const slugs = await APIService.getSiteMapDetails();
    ;
    return slugs;

};


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const slugs = await getSiteMapDetails();
    const staticURLS = [{
        url: `https://mytickethero.com`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1
    }, {
        url: `https://mytickethero.com/about`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.3
    }
    ];
    const allURLS = [...staticURLS];

    slugs.forEach(slug => {
        allURLS.push({
            url: `https://mytickethero.com/results/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8
        });
    });
    return allURLS as MetadataRoute.Sitemap;
}