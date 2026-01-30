import {NewsType} from "../../../_const/interface/news"
import { toPassedHours } from "../function/toPassedHours"
// データを取得する関数
export const getRecommendNews = async(isRecommend: string): Promise<NewsType[]> =>{
    try {
       const data: any = await fetch(`https://${process.env.MICROCMS_SERVICE_ID}.microcms.io/api/v1/news?filters=isRecommend[equals]${isRecommend}`,  {
        headers: {
          'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY || '',
        },
      },).then(res => res.json())
      .then(json => {
        return json
      })
      const formattedData = data.contents.map((content: any) => {
        return content
      })
      return formattedData
    } catch (error: any) {
       return error
    }
}