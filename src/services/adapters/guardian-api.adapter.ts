import { IGuardianApi } from "../apis/guradian-api/guardian-api";
import { INewsApi, INewsData } from "../news";

export class GuardianApiAdapter implements INewsApi {
    private readonly _api!: IGuardianApi;

    constructor(api: IGuardianApi) {
        this._api = api
    }

    async getArticles(filters?: { keyword?: string | undefined; categories?: string[] | undefined; author?: string[] | undefined; publishedAfter?: string | undefined; publishedBefore?: string | undefined; } | undefined, pagination?: { page?: number | undefined; pageSize?: number | undefined; } | undefined): Promise<INewsData[]> {
        const keywords = []

        if (filters?.keyword) {
            keywords.push(`${filters?.keyword}`)
        }

        if (filters?.categories) {
            filters.categories.forEach(cat => keywords.push(`${cat}`))
        }


        const response = await this._api.search(
            {
                keyword: keywords.join(' AND '),
                ...(filters?.publishedBefore ? { toDate: filters.publishedBefore } : {}),
                ...(filters?.publishedAfter ? { fromDate: filters.publishedAfter } : {})
            }
            ,
            {
                page: pagination?.page,
                pageSize: pagination?.pageSize
            }
        )

        const newsData: INewsData[] = response.map(article => ({
            title: article.fields?.headline,
            body: article.fields?.body,
            publishedAt: article.webPublicationDate,
            image: {
                url: article.fields?.thumbnail
            },
            source: {
                name: article.fields?.publication
            },
            url: article.webUrl,
            author: [
                { name: article.fields?.byline }
            ]
        }))

        return newsData
    }

}