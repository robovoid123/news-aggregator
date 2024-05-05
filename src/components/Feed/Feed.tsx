import { useEffect, useState } from 'react'

import styles from './Feed.module.scss';
import { NewsCard } from '../NewsCard/NewsCard';

import { IoSettingsSharp } from "react-icons/io5";
import { Button } from '../forms/Button/Button';
import { PersonalizationDrawer } from './PersonalizationDrawer/PersonalizationDrawer';
import { INewsData } from '../../services/news';
import { useNews } from '../../hooks/useNews';
import { sources } from '../../services/constants/setting';

export interface IPersonalization {
    sources: string[];
    categories: string[];
}

export const Feed = () => {
    const [personalization, setPersonalization] = useState<IPersonalization>({
        categories: [],
        sources: sources.map(s => s.key),
    })
    const [newsList, setNewsList] = useState<INewsData[] | null>(null)
    const [isShowDrawer, setIsShowDrawer] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)

    const { getApi } = useNews()

    useEffect(() => {
        const dataFromLocal = localStorage.getItem('personalization')

        if (dataFromLocal) {
            setPersonalization(JSON.parse(dataFromLocal))
        }
        else {
            localStorage.setItem('personalization', JSON.stringify(personalization))
        }

    }, [])

    const getArticle = async (page: number, personalizationData: IPersonalization) => {
        if (personalizationData) {
            personalizationData.sources.forEach(async (source) => {
                const api = getApi(source)

                const articles = await api.getArticles(
                    {
                        categories: personalizationData.categories
                    },
                    { page: page, pageSize: 10 }
                )

                setNewsList(prevState => {
                    return ([
                        ...(prevState ? prevState : []),
                        ...articles])
                })
            })

        }
    }

    useEffect(() => {
        getArticle(1, personalization)
    }, [personalization])

    const handleLoadMore = async () => {
        await getArticle(pageNumber + 1, personalization)
        setPageNumber(prevState => ++prevState)
    }

    const addFeedCustomization = (option: keyof IPersonalization, item: string) => {
        setPersonalization(prevState => {
            const newPersonalization = { ...prevState }

            newPersonalization[option] = Array.from(new Set([...prevState[option], item]))

            localStorage.setItem('personalization', JSON.stringify(newPersonalization))

            return newPersonalization
        })
    }

    const removeFeedCustomization = (option: keyof IPersonalization, item: string) => {

        setPersonalization(prevState => {

            const newPersonalization = { ...prevState }

            newPersonalization[option] = prevState[option].filter(value => value !== item)

            localStorage.setItem('personalization', JSON.stringify(newPersonalization))

            return newPersonalization
        })
    }

    return (
        <div
            className={styles.container}
        >
            <div className={styles.personalizeButton}>
                <button onClick={() => setIsShowDrawer(true)}>
                    <IoSettingsSharp />
                    Personalize
                </button>
            </div>
            {isShowDrawer && (
                <PersonalizationDrawer
                    onClose={() => setIsShowDrawer(false)}
                    personalization={personalization}
                    addFeedCustomization={addFeedCustomization}
                    removeFeedCustomization={removeFeedCustomization} />
            )}

            {!newsList ? (
                <div className={styles.loading}>Loading...</div>
            ) : (
                <div className="">
                    {newsList && newsList.length > 0 && (
                        <div className={styles.newsList}>
                            {newsList.map((news, idx) => (<NewsCard key={idx} data={news} />))}
                        </div>
                    )}

                    <div className={styles.loadMore}>
                        <Button
                            onClick={handleLoadMore}
                        >Load More</Button>
                    </div>
                </div>
            )}

        </div>
    )
}
