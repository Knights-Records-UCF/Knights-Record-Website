import Vinyl from "../components/Vinyl";

interface Record {
    sleeveColor: number;
    vinylColor: number;
    
}

const recordArr: Record[] = [
    {
        sleeveColor: 0,
        vinylColor: 0,
    },
    
]

export default function Artists() {
    return (
        <div>
            Artists
            <Vinyl/>
        </div>
    )
}