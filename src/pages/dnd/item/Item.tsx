import iconField from '@assets/field.png';
import iconFile from '@assets/img/events-group.svg'
import styles from "./Item.module.scss";
import iconArrow from "@assets/Arrow.svg";
import {FC, JSX, useState} from "react";
import cn from 'classnames'
import {IItemDataFree} from "@/utils/variables.ts";


interface IItem extends IItemDataFree {
    children?: JSX.Element,
}

const Item: FC<IItem> = ({title, children, type}) => {
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }

    const isDragging = false

    return (
        <div>
            <div className="flex items-center justify-start text-amber-500 py-1">
                {children ?
                    <div onClick={handleShow}>
                        <img className={cn(styles.image, show ? styles.imageActive : '')} src={iconArrow} alt='icon'/>
                    </div>
                    :
                    <div className='ml-5'></div>
                }
                <button className={cn(isDragging && styles.drag, styles.button)}>
                    <img src={type === 'folder' ? iconField : iconFile} alt='icon' className='pointer-events-none'/>
                    <div className='ml-2'>
                        {title}
                    </div>
                </button>

            </div>
            {show && children}
        </div>
    );
};

export default Item;
