import React from 'react'

import styles from './Button.module.scss'

export interface IButton {
    children?: React.ReactNode
    onClick?: () => void;
}

export const Button: React.FC<IButton> = ({ children, onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    )
}
