import {AuthorType} from "../../../_const/interface/author"
export const getAuthor = async(id: string): Promise<AuthorType> =>{
    try {
     const data: any = await fetch(`https://${process.env.MICROCMS_SERVICE_ID}.microcms.io/api/v1/authors/${id}`,  {
      headers: {
        'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY || '',
      }
    },).then(res => res.json())
         .then(json => {
      return json
    })
    return data
  } catch (error: any) {
     return error
  }
}
