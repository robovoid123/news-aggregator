import React from 'react'
import { CheckBox } from '../../../components/forms/Checkbox/CheckBox'
import { MultiTextSelector } from '../../../components/forms/MultiTextSelector/MultiTextSelector'

import styles from './Filter.module.scss';
import { sources } from '../../../services/constants/setting';

export interface IFilterData {
    sources: string[];
    categories: string[];
    publishedAfter: string;
    publishedBefore: string;
}

export interface IFilter {
    filterData: IFilterData;
    addFilterData: (key: keyof IFilterData, data: string) => void
    removeFilterData: (key: keyof IFilterData, data: string) => void
}



export const Filter: React.FC<IFilter> = ({
    filterData,
    addFilterData,
    removeFilterData
}) => {


    const handleSourceSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            addFilterData("sources", e.target.value)
        } else {
            removeFilterData("sources", e.target.value)
        }
    }

    return (
        <div className={`${styles.filterOptions}`}>
            <div className={styles.sourceSelect}>
                <h1>Source Select</h1>
                <div className={styles.sourceList}>
                    {sources.map(source => (
                        <CheckBox
                            key={source.key}
                            value={source.key}
                            checked={!!filterData.sources.find((value) => value === source.key)}
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
                    items={filterData.categories}
                    addItem={(value) => addFilterData("categories", value)}
                    removeItem={(value) => removeFilterData("categories", value)}
                />
            </div>
            <div className={styles.dateFilters}>
                <div className={styles.dateFilter}>
                    <h1>Published Before</h1>
                    <input
                        type="date"
                        name=""
                        id=""
                        value={filterData.publishedBefore}
                        onChange={(e) => addFilterData("publishedBefore", e.target.value)}
                    />
                </div>
                <div className={styles.dateFilter}>
                    <h1>Published After</h1>
                    <input
                        type="date"
                        name=""
                        id=""
                        value={filterData.publishedAfter}
                        onChange={(e) => addFilterData("publishedAfter", e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
