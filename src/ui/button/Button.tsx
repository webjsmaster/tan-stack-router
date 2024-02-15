import {FC} from 'react';
import styles from './Button.module.scss'

interface IButton {
    title: string,
    callback: () => void
    type?: 'error' | 'warning'
}

const Button: FC<IButton> = ({callback, title, type}) => {
    return (
        <button className={type === 'error' ? styles.btnError : type === 'warning' ? styles.btnWar : styles.btn} onClick={callback}>
            <div>{title}</div>
        </button>
    );
};

export default Button;
