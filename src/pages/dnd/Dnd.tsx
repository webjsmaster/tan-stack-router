import {FC} from 'react';
import SortableContextItems from "@/pages/dnd/sortable-context/SortableContext.tsx";
import {freeData} from "@/utils/variables.ts";


const Dnd: FC = () => {
    // const [containers, setContainers] = useState<IItemDataFree[]>([])
    //
    // useEffect(() => {
    //     setContainers()
    // }, []);


    return (
        <div className='max-w-2xl mx-auto mt-4 font-Montserrat flex justify-center'>
            <div className="mt-10">
                <div className="flex flex-col gap-y-2">
                    <div className="flex items-start flex-col">
                        <SortableContextItems items={freeData}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dnd;
