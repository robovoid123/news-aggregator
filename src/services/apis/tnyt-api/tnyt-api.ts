import { IAxios } from "../../axios";

export interface ITNYTData {
    abstract?: string;
    byline?: {
        original?: string;
        organization?: string;
        person: {
            firstname?: string;
            lastname?: string
        }[]
    };
    document_type?: string;
    headline?: {
        main?: string;
        name?: string;
    };
    multimedia?: {
        crop_name?: string;
        url?: string;
        type?: string;
    }[];
    news_desk?: string;
    pub_date?: string;
    snippet?: string;
    source?: string;
    type_of_material?: string;
    uri?: string;
    web_url?: string;
    _id?: string;
}

export interface ITNYT {
    getStaticUrl(): string;
    search(
        filter?: {
            keyword?: string;
            sort?: "newest" | "oldest" | "relevance";
            beginDate?: string;
            endDate?: string;
            source?: string;
        },
        pagination?: {
            page?: number
        }
    ): Promise<ITNYTData[]>
}

export class TNYT implements ITNYT {
    private readonly _apiKey!: string;
    private readonly _baseUrl!: string;
    private readonly _axios!: IAxios;

    constructor(apiKey: string, axios: IAxios) {
        this._baseUrl = "https://api.nytimes.com/svc"
        this._apiKey = apiKey
        this._axios = axios
    }

    getStaticUrl(): string {
        return "https://www.nytimes.com"
    }

    async search(filter?: { keyword?: string | undefined; sort?: "newest" | "oldest" | "relevance" | undefined; beginDate?: string | undefined; endDate?: string | undefined; source?: string | undefined; } | undefined, pagination?: { page: number; } | undefined): Promise<ITNYTData[]> {
        let url = `${this._baseUrl}/search/v2/articlesearch.json`

        const options: string[] = []

        options.push(`api-key=${this._apiKey}`)
        options.push(`page=${pagination?.page ? pagination.page : 0}`)

        if (filter?.keyword) {
            options.push(`q=${filter.keyword}`)
        }

        if (filter?.sort) {
            options.push(`sort=${filter.sort}`)
        }

        if (filter?.source) {
            options.push(`fq=source:("${filter.source}")`)
        }

        url = `${url}${options.length > 0 ? `?${options.join('&')}` : ''}`

        const response = await this._axios.request.get(url)

        const articles: ITNYTData[] = response.data.response.docs

        return articles

    }
}