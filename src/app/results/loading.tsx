import {PuffLoader} from 'react-spinners';
import { Progress } from '@/components/ui/progress';

export default function Loading() {
    return (
        <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]">
            {/*<Progress value={75}/>*/} Finding Events...
            <Progress value={66}></Progress>
        </div>
    );

}