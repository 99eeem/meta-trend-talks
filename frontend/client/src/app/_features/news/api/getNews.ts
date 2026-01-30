import { formatDateTime } from '../function/formatDateTime';
import { NewsWithRelatedNewsType } from '../../../_const/interface/news';

// データを取得する関数
export const getNews = async (id: string): Promise<NewsWithRelatedNewsType> => {
  try {
    const data: any = await fetch(
      `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_ID}.microcms.io/api/v1/news/${id}?depth=2`,
      {
        headers: {
          'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '',
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        json.relatedNewsIds.forEach((relatedNews: any) => {
        });
        return json;
      });
    return data;
  } catch (error: any) {
    return error;
  }
};
