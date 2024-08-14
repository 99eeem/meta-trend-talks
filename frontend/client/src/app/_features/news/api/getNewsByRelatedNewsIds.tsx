import { NewsType } from "../../../_const/interface/news";
import { getNews } from "./getNews"
// const getNewsById = (id: string) => {
//   return fetch(`https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_ID}.microcms.io/api/v1/news?q=${query}`, {
//     headers: {
//       'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '',
//     }
//   }).then(res => res.json())
//     .then(json => {
//       return json.contents;
//     });
// };

export const getNewsByRelatedNewsIds = async (ids: string[]): Promise<NewsType[]> => {
  try {
    if (ids === undefined) {
      return []
    }
    const news: NewsType[] = await Promise.all(ids.map(async (id) => {
      return getNews(id);
    }));
    // Process the news data if needed
    return news;
  } catch (error: any) {
    return error;
  }
};
