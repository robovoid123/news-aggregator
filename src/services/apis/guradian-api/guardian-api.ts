import { IAxios } from "../../axios";

export interface IGuardianData {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
    fields?: {
        headline?: string;
        thumbnail?: string;
        body?: string;
        publication?: string;
        byline: string;
    }
}

export interface IGuardianApi {
    search(
        filters?: {
            keyword?: string;
            section?: string;
            tags?: string;
            toDate?: string;
            fromDate?: string;
            orderBy?: "newest" | "oldest" | "relevance"
        },
        pagination?: {
            page?: number;
            pageSize?: number;
        }
    ): Promise<IGuardianData[]>
}

export class GuardianApi implements IGuardianApi {
    private readonly _apiKey!: string;
    private readonly _baseUrl!: string;
    private readonly _axios!: IAxios;

    constructor(apiKey: string, axios: IAxios) {
        this._baseUrl = " https://content.guardianapis.com"
        this._apiKey = apiKey
        this._axios = axios
    }

    async search(filters?: { keyword?: string | undefined; section?: string | undefined; tags?: string | undefined; toDate?: string | undefined; fromDate?: string | undefined; orderBy?: "newest" | "oldest" | "relevance" | undefined; } | undefined, pagination?: { page: number; pageSize: number; } | undefined): Promise<IGuardianData[]> {
        try {
            let url = `${this._baseUrl}/search`

            const options: string[] = []

            options.push(`api-key=${this._apiKey}`)
            options.push(`show-fields=body,thumbnail,headline,publication,byline`)
            options.push(`page=${pagination?.page ? pagination.page : 1}`)
            options.push(`page-size=${pagination?.pageSize ? pagination.pageSize : 10}`)

            if (filters?.keyword) {
                options.push(`q=${filters.keyword}`)
            }

            if (filters?.section) {
                options.push(`section=${filters.section}`)
            }

            if (filters?.tags) {
                options.push(`tags=${filters.tags}`)
            }

            if (filters?.fromDate) {
                options.push(`from-date=${filters.fromDate}`)
            }

            if (filters?.toDate) {
                options.push(`to-date=${filters.toDate}`)
            }

            if (filters?.orderBy) {
                options.push(`order-by=${filters.orderBy}`)
            }

            url = `${url}${options.length > 0 ? `?${options.join('&')}` : ''}`

            const response = await this._axios.request.get(url)

            const articles: IGuardianData[] = response.data.response.results

            return articles
        } catch (error: any) {
            throw new Error(error)
        }
    }
}