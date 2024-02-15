import {DragEvent, FC, useState} from 'react';
import {IItemDataFree} from "../../../utils/variables.ts";
import Item from "@/pages/dnd/item/Item.tsx";


const SortableContextItems: FC<{ items: IItemDataFree[] }> = ({items}) => {

    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [isActiveDraggableItem, setIsActiveDraggableItem] = useState<boolean>(false)


    const [nowDraggingId, setNowDraggingId] = useState<string>('')
    const [nowDragOverId, setNowDragOverId] = useState<string>('')
    const [nowDragOverType, setNowDragOverType] = useState<string>('')

    const handleDragStartNodeRow = (e: DragEvent<HTMLDivElement>) => {
        console.log('[17] 🚧: ', e.currentTarget.id)
        setNowDraggingId(e.currentTarget.id)
        setNowDragOverId(e.currentTarget.id)
    }

    const handleDragEnterNodeRow = (e: DragEvent<HTMLDivElement>) => {

        console.log('[24] 🎯: ', e.currentTarget)
        if (nowDraggingId !== e.currentTarget.id) {
            setNowDragOverId(e.currentTarget.id)

            // setNowDragOverType(e.currentTarget.dataset.type)
        } else {
            setNowDragOverId(nowDraggingId)
        }
    }

    const handleDragEndNodeRow = () => {
        console.log('[33] 🎯: ', nowDraggingId, nowDragOverId)
        if (nowDraggingId !== nowDragOverId) {
            console.log('[38] 🥕: ', nowDraggingId, nowDragOverId)
        }
        setNowDraggingId('')
        setNowDragOverId('')
        setNowDragOverType('')
    }


    return (
        <div className="flex items-start flex-col">
            {items.map(i => {

                if (i.items && i.items.length) {
                    return (
                        <div key={i.id} onDragStart={(e) => handleDragStartNodeRow(e)}
                             onDragEnd={handleDragEndNodeRow}
                             onDragEnter={(e) => handleDragEnterNodeRow(e)}
                             draggable={true}
                             className='px-3'
                             id={i.id}
                        >
                            <Item title={i.title} id={i.id} key={i.id} type={i.type}>
                                <SortableContextItems items={i.items}/>
                            </Item>
                        </div>
                    )
                } else {
                    return (<div key={i.id} onDragStart={handleDragStartNodeRow}
                                 onDragEnd={handleDragEndNodeRow}
                                 onDragEnter={handleDragEnterNodeRow}
                                 draggable={true}
                                 className='px-3'
                                 id={i.id}
                    >
                        <Item key={i.id} items={i.items} title={i.title} type={i.type}/>
                    </div>)
                }
            })}
        </div>

    );
};

export default SortableContextItems;
