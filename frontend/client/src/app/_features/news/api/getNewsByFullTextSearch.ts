import {NewsType} from "../../../_const/interface/news"
import { toPassedHours } from "../function/toPassedHours"
// データを取得する関数
export const getNewsByFullTextSearch = async(query: string | null): Promise<NewsType[]> =>{
    try {
       const data: any = await fetch(`https://${process.env.MICROCMS_SERVICE_ID}.microcms.io/api/v1/news?q=${query}`,  {
        headers: {
          'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY || '',
        }
      },).then(res => res.json())
      .then(json => {
        return json.contents
      })
      const formattedData = data.map((content: any) => {
        return content
      })
      return formattedData
    } catch (error: any) {
       return error
    }
}