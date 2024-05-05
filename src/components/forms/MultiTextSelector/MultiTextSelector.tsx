import React, { useState } from 'react'

import { TextInput } from '../TextInput/TextInput'

import { MdOutlineClose } from "react-icons/md";

import styles from './MultiTextSelector.module.scss';

export interface IMultiTextSelector {
    placeholder?: string;
    items: string[];
    addItem: (item: string) => void
    removeItem: (item: string) => void
}

export const MultiTextSelector: React.FC<IMultiTextSelector> = ({ addItem, removeItem, items, placeholder }) => {
    const [text, setText] = useState('')

    return (
        <div className={styles.container}>
            <form onSubmit={e => {
                e.preventDefault()
                addItem(text)
                setText('')
            }}>
                <TextInput
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder={placeholder}
                />
            </form>
            <div className={styles.itemList}>
                {items.map((item, idx) => (
                    <div key={idx} className={styles.item}>
                        {item}
                        <button
                            onClick={() => removeItem(item)}
                        >
                            <MdOutlineClose />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
