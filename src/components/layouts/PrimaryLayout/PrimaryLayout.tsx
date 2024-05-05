import React from 'react'
import styles from './PrimaryLayout.module.scss'
import { Navbar } from '../../Navbar/Navbar'

export interface IPrimaryLayout {
    children?: React.ReactNode
}

export const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
    return (
        <div className={styles.container} >
            <Navbar />
            <div className={styles.body}>
                {children}
            </div>
        </div>
    )
}
