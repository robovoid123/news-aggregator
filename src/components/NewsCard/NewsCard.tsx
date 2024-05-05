import React from 'react'

import styles from './NewsCard.module.scss';
import { Link } from 'react-router-dom';
import { INewsData } from '../../services/news';
import { time_ago } from '../../helpers/time-since';

import { FaLink } from "react-icons/fa";

export interface INewsCard {
    data: INewsData;
}

export const NewsCard: React.FC<INewsCard> = ({ data }) => {

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <div className={styles.source}>
                    {data?.source?.name}
                </div>
                {data?.url && (
                    <Link className={styles.link} to={data.url}>
                        <FaLink />
                    </Link>
                )}

            </div>
            <div className={styles.body}>
                {
                    data?.body ? (
                        <Link
                            className={styles.title}
                            to={'/news'}
                            state={{ data }}
                        >
                            {data.title}
                        </Link>
                    ) : (
                        <Link
                            className={styles.title}
                            to={data?.url ? data.url : ''}
                            state={{ data }}
                        >
                            {data.title}
                        </Link>
                    )
                }
                {data?.image?.url && (
                    <div className={styles.image}>
                        <img src={data.image.url} alt={data.image.alt} />
                    </div>
                )}
            </div>
            <div className={styles.footer}>
                {data?.publishedAt && (
                    <div>{time_ago(data.publishedAt)} .</div>
                )}
                {data.author && data?.author?.length && (
                    <div className={styles.authors}>
                        {data.author.map((value, idx) => (
                            <div key={idx}>
                                <div>{value.name}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
