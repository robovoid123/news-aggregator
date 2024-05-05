import { ITNYT } from "../apis/tnyt-api/tnyt-api";
import { INewsApi, INewsData } from "../news";

export class TNYTAdapter implements INewsApi {
    private readonly _api!: ITNYT;

    constructor(api: ITNYT) {
        this._api = api
    }

    async getArticles(filters?: { keyword?: string | undefined; categories?: string[] | undefined; author?: string[] | undefined; publishedAfter?: string | undefined; publishedBefore?: string | undefined; } | undefined, pagination?: { page?: number | undefined; pageSize?: number | undefined; } | undefined): Promise<INewsData[]> {

        const keywords = []

        if (filters?.keyword) {
            keywords.push(`("${filters?.keyword}")`)
        }

        if (filters?.categories) {
            filters.categories.forEach(cat => keywords.push(`("${cat}")`))
        }

        const response = await this._api.search(
            {
                keyword: keywords.join(" AND "),
                ...(filters?.publishedBefore ? { endDate: filters.publishedBefore } : {}),
                ...(filters?.publishedAfter ? { beginDate: filters.publishedAfter } : {})

            },
            {
                ...(pagination?.page ? { page: pagination.page > 0 ? --pagination.page : 0 } : {})
            }
        )


        const newsData: INewsData[] = response.map(article => {
            let imageUrl: string | null = null

            if (article.multimedia && article.multimedia.length > 0) {
                imageUrl = `${this._api.getStaticUrl()}/${article.multimedia[0].url}`
            }


            return ({
                title: article.headline?.main,
                source: {
                    name: article.source
                },
                body: article.abstract,
                publishedAt: article.pub_date,
                url: article.web_url,
                ...(imageUrl ? { image: { url: imageUrl } } : {}),
                author: [
                    {
                        name: article.byline?.original
                    }
                ]
            })
        }
        )

        return newsData
    }
}