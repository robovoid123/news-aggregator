import React from 'react'
import styles from './CheckBox.module.scss'

export interface ICheckBox {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    name?: string;
    children?: React.ReactNode;
    checked?: boolean
}

export const CheckBox: React.FC<ICheckBox> = ({ onChange, value, name, children, checked }) => {
    return (
        <div className={styles.container}>
            <input
                id='checkbox'
                type={'checkbox'}
                onChange={onChange}
                value={value}
                checked={checked}
                name={name}
            />{children}
        </div>
    )
}
