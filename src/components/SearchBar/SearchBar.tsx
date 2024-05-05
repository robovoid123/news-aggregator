import React, { useEffect, useState } from 'react'

import { FaSearch } from "react-icons/fa";

import styles from './SearchBar.module.scss'
import { useLocation, useNavigate } from 'react-router-dom';

export interface ISearchBar {
    onSearch?: () => void
    bordered: boolean
}

export const SearchBar: React.FC<ISearchBar> = ({ onSearch, bordered = false }) => {
    const [text, setText] = useState("")

    const navigate = useNavigate()

    const location = useLocation()

    useEffect(() => {
        const path = location.pathname.split('/')

        if (path[1] === 'search' && path[2]) {
            setText(decodeURIComponent(path[2]))
        }

    }, [location])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (onSearch) {
            onSearch()
        }

        if (text) {
            navigate(`/search/${text}`)
        }
    }

    return (
        <form
            className={
                `${styles.container}
                ${bordered ? styles.border : ''}`
            }
            onSubmit={handleSubmit} >
            <input
                type="text"
                name=""
                id=""
                className={styles.input}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='Search...'
            />
            <button type="submit" className={styles.icon}>
                <FaSearch />
            </button>
        </form >
    )
}
