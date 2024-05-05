
import { INewsApi } from '../services/news';
import { SourceEnum, sources } from '../services/constants/setting';
import { Axios } from '../services/axios';
import { GuardianApiAdapter } from '../services/adapters/guardian-api.adapter';
import { GuardianApi } from '../services/apis/guradian-api/guardian-api';
import { TNYTAdapter } from '../services/adapters/tnyt-api.adapter';
import { TNYT } from '../services/apis/tnyt-api/tnyt-api';
import { NewsApiOrgAdapter } from '../services/adapters/news-api-org.adapter';
import { NewsApiOrg } from '../services/apis/news-api-org/news-api-org';


const axios = new Axios()
const env = import.meta.env


const guardianAdapter = new GuardianApiAdapter(
    new GuardianApi(
        env.VITE_GUARDIAN_API_KEY,
        axios
    )
)

const tNYTAdapter = new TNYTAdapter(
    new TNYT(
        env.VITE_TNYT_KEY,
        axios
    )
)

const newsApiOrgAdapter = new NewsApiOrgAdapter(
    new NewsApiOrg(
        env.VITE_NEWS_API_KEY,
        axios
    )
)

export const useNews = () => {


    const getApi = (source: string): INewsApi => {


        if (source === sources[SourceEnum.NEWS_API].key) {
            return newsApiOrgAdapter
        }
        else if (source === sources[SourceEnum.TNYT].key) {
            return tNYTAdapter
        }
        else if (source === sources[SourceEnum.THE_GUARDIAN].key) {
            return guardianAdapter
        }
        else {
            throw new Error('no source match that key')
        }
    }

    return { getApi }
}