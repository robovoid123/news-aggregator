import React, { useState } from 'react'

import { FaRegNewspaper } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

import styles from './Navbar.module.scss'
import { NavLink } from 'react-router-dom';
import { useWindowSize } from '../../hooks/useWindowSize';
import { SearchBar } from '../SearchBar/SearchBar';

export interface INavbar { }

export const Navbar: React.FC<INavbar> = () => {

    const [isSearchButtonActive, setIsSearchButtonActive] = useState(false)

    const { isTabletOrMobile } = useWindowSize()

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <NavLink to={'/'} className={styles.logo}>
                    <FaRegNewspaper />
                    <h1>News</h1>
                </NavLink>
                {!isTabletOrMobile && (
                    <>
                        <div className={styles.searchBar}>
                            <SearchBar bordered={false} />
                        </div>
                        <div className=""></div>
                    </>
                )}
                {isTabletOrMobile && (
                    <>
                        <div className={styles.search}>
                            <button
                                className={styles.searchButton}
                                onClick={() => setIsSearchButtonActive(true)}
                            >
                                <FaSearch />
                            </button>
                        </div>
                        {isSearchButtonActive && (
                            <div className={styles.searchModal}>
                                <button
                                    className={styles.closeButton}
                                    onClick={() => setIsSearchButtonActive(false)}
                                >
                                    <MdOutlineClose />
                                </button>
                                <div className={styles.searchBar}>
                                    <SearchBar onSearch={() => setIsSearchButtonActive(false)} bordered={false} />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
