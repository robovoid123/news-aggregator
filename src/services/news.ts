export interface INewsData {
    title?: string;
    source?: {
        name?: string;
        url?: string;
        logo?: {
            url: string;
            alt: string;
        }
    };
    body?: string;
    publishedAt?: string;
    author?: {
        name?: string;
    }[],
    image?: {
        url?: string;
        alt?: string;
    },
    url?: string;
}

export interface INewsApi {
    getArticles(
        filters?: {
            keyword?: string,
            categories?: string[];
            author?: string[];
            publishedAfter?: string;
            publishedBefore?: string;
        },
        pagination?: {
            page?: number;
            pageSize?: number;
        }
    ): Promise<INewsData[]>
}