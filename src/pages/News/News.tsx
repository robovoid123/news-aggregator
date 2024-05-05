import { Link, useLocation } from 'react-router-dom'
import { INewsData } from '../../services/news'
import { PrimaryLayout } from '../../components/layouts/PrimaryLayout/PrimaryLayout'

import styles from './News.module.scss';
import { time_ago } from '../../helpers/time-since';

import { FaLink } from "react-icons/fa";

export const News = () => {
    const data = useLocation().state.data as INewsData

    return (
        <PrimaryLayout>
            <div className={styles.container}>
                <div className={styles.image}>
                    <img
                        src={data.image?.url}
                        alt=""
                    />
                </div>
                <div className={styles.body}>
                    <div className={styles.title}>
                        <h1>
                            {data.title}
                        </h1>
                    </div>
                    <div className={styles.meta}>
                        <div className={styles.detail}>
                            {data.author && data?.author.length > 0 && (
                                <>
                                    {data.author.map((value, idx) => (
                                        <div key={idx} className="">{value.name}</div>
                                    ))}
                                </>
                            )}
                            {data?.publishedAt && (
                                <div className="">
                                    {time_ago(data.publishedAt)}
                                </div>
                            )}
                        </div>
                        <div className="">
                            <Link className={styles.link} to={data?.url ? data.url : ''}>
                                <FaLink />
                            </Link>
                        </div>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data.body ? data.body : ''
                        }}
                        className="">
                    </div>
                </div>
            </div>
        </PrimaryLayout>
    )
}
