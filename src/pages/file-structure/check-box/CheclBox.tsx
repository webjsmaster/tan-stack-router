import styles from './CheckBox.module.scss'
import cn from "classnames";
import {FC, JSX} from "react";

interface ICheckBox {
    checked?: boolean,
    value?: string,
    children?: JSX.Element,
    onChange?: () => void
}


const Checkbox: FC<ICheckBox> = ({
                                     checked, value, children, onChange = () => {

    }
                                 }) => (
    <div className={styles.wrapper}>
        <input className={cn(styles.input)} style={checked ? {backgroundImage: 'red'} : {backgroundColor: 'green'}}
               type='checkbox'
               onChange={onChange}
               value={value}
        />

        <div className={cn(styles.box, !children && styles.boxHasNoChildren)}/>
    </div>
)

export default Checkbox
