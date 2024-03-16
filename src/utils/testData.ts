import img1 from '../images/head_heart.jpg';
import img2 from '../images/post_malone.jpg';
import img3 from '../images/futurebirds.jpg';
import img4 from '../images/noah_kahan.jpg';
import img5 from '../images/peteyjpg.jpg';
import img6 from '../images/rayland_baxter.jpg';
import { StaticImageData } from 'next/image';


export const testCardImages = {
    img1: { img: img1, title: 'The Head and the Heart', desc: 'Mar 5 - Red Rocks Amphitheater' },
    img2: { img: img2, title: 'Post Malone', desc: 'Jan 5 - Visulite Theater' },
    img3: { img: img3, title: 'Futurebirds', desc: 'Apr 24 - The Filmore' },
    img4: { img: img4, title: 'Noah Kahan', desc: 'Feb 13 - Bank of America' },
    img5: { img: img5, title: 'Petey', desc: 'Oct 24 - The Underground' },
    img6: { img: img6, title: 'Rayland Baxter', desc: 'Jun 5 - Neighborhood' }
};
//Test commit
export type CardImage = {
    img: StaticImageData,
    title: string,
    desc: string
}
