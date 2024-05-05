import { IAxios } from "../../axios";

export interface INewsApiOrgData {
    author?: string;
    content: string;
    description?: string;
    publishedAt: string;
    title: string;
    url?: string;
    urlToImage?: string;
    source?: {
        name: string;
    }
}

export interface INewsApiOrg {
    getEverything(
        filter?: {
            keyword?: string,
            searchIn?: "title" | "description" | "content",
            from?: string;
            to?: string;
            sortBy?: "relevancy" | "popularity" | "publishedAt"
        },
        pagination?: { pageSize?: number, page?: number }
    ): Promise<INewsApiOrgData[]>
}

export class NewsApiOrg implements INewsApiOrg {
    private readonly _baseUrl!: string;
    private readonly _axios!: IAxios;
    private _sourceKeys: string[] = []

    constructor(apiKey: string, axios: IAxios) {
        this._baseUrl = "https://newsapi.org/v2"
        this._axios = axios
        this._axios.setAuthorization(apiKey)

    }

    private async _getSources(): Promise<{
        category: string;
        country: string;
        id: string;
        language: string;
        name: string;
        url: string;
    }[]> {
        try {
            const url = `${this._baseUrl}/sources?country=us&language=en`

            const response = await this._axios.request.get(url)

            return response.data.sources
        } catch (error: any) {
            throw new Error(error)
        }
    }

    private async getSourceKeys() {
        if (this._sourceKeys.length > 0) {
            return this._sourceKeys
        }

        this._sourceKeys = (await this._getSources()).map(source => source.id)

        return this._sourceKeys
    }

    async getEverything(filter?: { keyword?: string | undefined; searchIn?: "title" | "description" | "content" | undefined; from?: string | undefined; to?: string | undefined; sortBy?: "relevancy" | "popularity" | "publishedAt" | undefined; } | undefined, pagination?: { pageSize: number; page: number; } | undefined): Promise<INewsApiOrgData[]> {
        const sourceKeys = await this.getSourceKeys()

        try {
            let url = `${this._baseUrl}/everything`

            const options: string[] = []

            options.push(`language=en`)
            options.push(`sources=${sourceKeys.join(',')}`)
            options.push(`page=${pagination?.page ? pagination.page : 1}`)
            options.push(`pageSize=${pagination?.pageSize ? pagination.pageSize : 10}`)

            if (filter?.keyword) {
                options.push(`q=${filter.keyword}`)
            }

            if (filter?.searchIn) {
                options.push(`searchIn=${filter.searchIn}`)
            }

            if (filter?.from) {
                options.push(`from=${filter.from}`)
            }

            if (filter?.to) {
                options.push(`from=${filter.to}`)
            }

            if (filter?.sortBy) {
                options.push(`sortBy=${filter.sortBy}`)
            }

            url = `${url}${options.length > 0 ? `?${options.join('&')}` : ''}`

            const response = await this._axios.request.get(url)

            const data = response.data.articles as INewsApiOrgData[]

            return data.filter(article => article.title !== '[Removed]')
        } catch (error: any) {
            throw new Error(error)
        }
    }
}

