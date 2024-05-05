import axios, { AxiosInstance } from "axios";

export interface IAxios {
    get request(): AxiosInstance
    setAuthorization(authorization: string): void
}

export class Axios implements IAxios {
    private readonly _request: AxiosInstance;

    constructor(baseUrl?: string) {
        this._request = axios.create({
            ...(baseUrl ? {baseURL: baseUrl}: {}),
            timeout: 30000,
            timeoutErrorMessage: 'axios request timeout'
        })

    }

    public setAuthorization(authorization: string): void {
        this._request.interceptors.request.use(async (config) => {
            config.headers['Authorization'] = authorization

            return config
        })
    }

    public get request(): AxiosInstance {
        return this._request
    } 
}