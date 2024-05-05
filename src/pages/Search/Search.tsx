import { useEffect, useState } from 'react'
import { PrimaryLayout } from '../../components/layouts/PrimaryLayout/PrimaryLayout'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { Filter, IFilterData, } from './Filter/Filter'

import styles from './Search.module.scss'
import { NewsCard } from '../../components/NewsCard/NewsCard'
import { Button } from '../../components/forms/Button/Button'
import { INewsData } from '../../services/news'
import { sources } from '../../services/constants/setting'
import { useNews } from '../../hooks/useNews'
import { useLocation } from 'react-router-dom'


export const Search = () => {
    const [newsList, setNewsList] = useState<INewsData[] | null>(null)
    const [pageNumber, setPageNumber] = useState(1)

    const location = useLocation()
    const keyword = location.pathname.split('/')[2]

    const [filterData, setFilterData] = useState<IFilterData>(
        {
            sources: sources.map(s => s.key),
            categories: [],
            publishedAfter: '',
            publishedBefore: ''
        }
    )

    const { getApi } = useNews()


    const getArticle = async (page: number, filter: IFilterData) => {

        const articles = await Promise.all(filter.sources.map(async (source) => {
            const api = getApi(source)

            const response = await api.getArticles({
                keyword: keyword,
                ...(filter.categories.length > 0 ? { categories: filter.categories } : {}),
                ...(filter.publishedAfter ? { publishedAfter: filter.publishedAfter } : {}),
                ...(filter.publishedBefore ? { publishedBefore: filter.publishedBefore } : {}),
            }, { page: page, pageSize: 10 })

            return response
        }))

        return articles.reduce((prevValue, currentValue) => ([...prevValue, ...currentValue]), [])
    }

    useEffect(() => {
        getArticle(1, filterData).then(articles => setNewsList(articles))
    }, [filterData, keyword])

    const addFilterData = (option: keyof IFilterData, item: string) => {

        setFilterData(prevState => {
            const newFilterOptions = { ...prevState }

            if (option === "publishedAfter") {
                newFilterOptions.publishedAfter = item
            }
            else if (option === "publishedBefore") {
                newFilterOptions.publishedBefore = item
            }
            else {
                newFilterOptions[option] = Array.from(new Set([...prevState[option], item]))
            }

            return newFilterOptions
        })
    }

    const removeFilterData = (option: keyof IFilterData, item: string) => {

        setFilterData(prevState => {
            const newFilterOptions = { ...prevState }


            if (option === "publishedAfter") {
            }
            else if (option === "publishedBefore") {
            }
            else {
                newFilterOptions[option] = prevState[option].filter(value => value !== item)
            }

            return newFilterOptions
        })
    }

    const handleLoadMore = async () => {
        const articles = await getArticle(pageNumber + 1, filterData)

        setNewsList(prevState => {
            if (prevState) {
                return [...prevState, ...articles]
            }

            return prevState
        })

        setPageNumber(prevState => ++prevState)
    }

    return (
        <PrimaryLayout>
            <div
                className={styles.container}
            >
                <div
                    className={styles.content}
                >
                    <SearchBar bordered={true} />
                    <Filter
                        filterData={filterData}
                        addFilterData={addFilterData}
                        removeFilterData={removeFilterData}
                    />
                    <div className={styles.news}>
                        <h1>Results</h1>

                        {!newsList ? (
                            <div className={styles.loading}>Loading...</div>
                        ) : (
                            <>
                                {newsList.length > 0 ? (
                                    <>
                                        <div className={styles.newsList}>
                                            {newsList.map((news, idx) => (<NewsCard key={idx} data={news} />))}
                                        </div>
                                        <div className={styles.loadMore}>
                                            <Button
                                                onClick={handleLoadMore}
                                            >Load More</Button>
                                        </div>
                                    </>
                                ) :
                                    (
                                        <div className={styles.noResult}>
                                            No Results
                                        </div>
                                    )
                                }
                            </>
                        )}

                    </div>
                </div>
            </div>
        </PrimaryLayout>
    )
}
