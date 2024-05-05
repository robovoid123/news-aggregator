import { INewsApiOrg } from "../apis/news-api-org/news-api-org";
import { INewsApi, INewsData } from "../news";

export class NewsApiOrgAdapter implements INewsApi {
    private readonly _api!: INewsApiOrg;

    constructor(api: INewsApiOrg) {
        this._api = api
    }

    async getArticles(filters?: { keyword?: string | undefined; categories?: string[] | undefined; author?: string[] | undefined; publishedAfter?: string | undefined; publishedBefore?: string | undefined; } | undefined, pagination?: { page?: number | undefined; pageSize?: number | undefined; } | undefined): Promise<INewsData[]> {
        const keywords = []

        if (filters?.keyword) {
            keywords.push(`+${filters?.keyword}`)
        }

        if (filters?.categories) {
            filters.categories.forEach(cat => keywords.push(`+${cat}`))
        }

        const response = await this._api.getEverything(
            {
                keyword: keywords.join(''),
                ...(filters?.publishedBefore ? { to: filters.publishedBefore } : {}),
                ...(filters?.publishedAfter ? { from: filters.publishedAfter } : {})
            },
            {
                page: pagination?.page,
                pageSize: pagination?.pageSize
            }
        )

        const newsData: INewsData[] = response.map(article => ({
            title: article.title,
            source: {
                name: article.source?.name
            },
            body: article.content,
            publishedAt: article.publishedAt,
            author: [{
                name: article.author
            }],
            image: {
                url: article.urlToImage,
            },
            url: article.url
        }))

        return newsData
    }
}