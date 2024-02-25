import { NewsType } from '../../../_const/interface/news';

// データを取得する関数
export const getNewsByCreatedAtAndCategory = async (
  createdAt: string,
  category: string,
  id: string
): Promise<{}> => {
  try {
    const data: any = await fetch(
      `https://${
        process.env.NEXT_PUBLIC_MICROCMS_SERVICE_ID
      }.microcms.io/api/v1/news?filters=createdAt[begins_with]${createdAt.substring(
        0,
        4
      )}[and]category[equals]${category}`,
      {
        headers: {
          'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '',
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        return json.contents;
      });
    const index = data.findIndex((obj: any) => obj.id === id);
    return {
      back: data[index - 1] === undefined ? data[data.length - 1] : data[index - 1],
      next: data[index + 1] === undefined ? data[0] : data[index + 1],
    };
  } catch (error: any) {
    return error;
  }
};
