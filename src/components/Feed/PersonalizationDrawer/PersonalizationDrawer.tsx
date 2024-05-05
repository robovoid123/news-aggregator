import React from 'react'

import styles from './PersonalizationDrawer.module.scss'

import { IoIosArrowForward } from "react-icons/io";
import { IPersonalization } from '../Feed';
import { CheckBox } from '../../forms/Checkbox/CheckBox';
import { MultiTextSelector } from '../../forms/MultiTextSelector/MultiTextSelector';
import { sources } from '../../../services/constants/setting';


export interface IPersonalizationDrawer {
    onClose: () => void
    addFeedCustomization: (option: keyof IPersonalization, item: string) => void
    removeFeedCustomization: (option: keyof IPersonalization, item: string) => void
    personalization: IPersonalization
}



export const PersonalizationDrawer: React.FC<IPersonalizationDrawer> = ({ onClose, personalization, addFeedCustomization, removeFeedCustomization }) => {

    const handleSourceSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            addFeedCustomization("sources", e.target.value)
        } else {
            removeFeedCustomization("sources", e.target.value)
        }
    }

    return (
        <div
            className={styles.container}
        >
            <div className={styles.content}>
                <button
                    className={styles.collapseButton}
                    onClick={() => onClose()}
                >
                    <IoIosArrowForward />
                </button>

                <div className={styles.filter}>
                    <h1>Feed Personalize</h1>
                    <div className={styles.sourceSelect}>
                        <h1>Source Select</h1>
                        <div className={styles.sourceList}>
                            {sources.map(source => (
                                <CheckBox
                                    key={source.key}
                                    value={source.key}
                                    checked={!!personalization.sources.find((value) => value === source.key)}
                                    onChange={handleSourceSelect}>
                                    {source.name}
                                </CheckBox>
                            ))}
                        </div>
                    </div>
                    <div className={styles.categoriesSelect}>
                        <h1>Categories Select</h1>
                        <MultiTextSelector
                            placeholder='Categories...'
                            items={personalization.categories}
                            addItem={(value) => addFeedCustomization("categories", value)}
                            removeItem={(value) => removeFeedCustomization("categories", value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
