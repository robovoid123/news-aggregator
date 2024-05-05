import React from 'react'

import styles from './TextInput.module.scss'

export interface ITextInput {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: string;
    placeholder?: string;
    name?: string;
}

export const TextInput: React.FC<ITextInput> = ({ onChange, value, placeholder, name }) => {
    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                type="text"
                name={name}
                id="text-input" />
        </div>
    )
}
