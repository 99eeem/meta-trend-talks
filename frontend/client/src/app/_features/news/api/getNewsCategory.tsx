import {CategoryType} from "../../../_const/interface/category"

// データを取得する関数
export const getCategoryList = async(): Promise<[CategoryType]> =>{
    try {
       const data: any = await fetch(`https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_ID}.microcms.io/api/v1/categories?limit=10`,  {
        headers: {
          'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '',
        },
      },).then(res => res.json())
      .then(json => {
        return json
      })
      return data.contents
    } catch (error: any) {
       return error
    }
}
export const getCategory = async(link: string): Promise<[CategoryType]> =>{
  try {
     const data: any = await fetch(`https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_ID}.microcms.io/api/v1/categories?filters=link[equals]${link}`,  {
      headers: {
        'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '',
      }
    },).then(res => res.json())
    .then(json => {
      return json
    })
    return data.contents
  } catch (error: any) {
     return error
  }
}
