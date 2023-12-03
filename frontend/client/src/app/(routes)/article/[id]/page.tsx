import { StringDecoder } from "string_decoder";
import { getNews } from "../../../_features/news/api/getNews"
import { getNewsList } from "../../../_features/news/api/getNewsList"
import styles from './page.module.scss'; // SCSSファイルを読み込む 
import { NewsType } from "../../../_const/interface/news"
import  NewsArticleDetails from "../../../_components/page/article/NewsArticleDetails"
import { Metadata } from 'next'

export async function generateMetadata({params}: {params : {id: string}}): Promise<Metadata> {
    // read route params
    const id = params.id
   
    // fetch data
    const news = await getNews(params.id)
   
    return {
      title: news.title,
    }
  }


export default async function Page({ params }: { params: { id: string } }) {
    try {
        const news: NewsType = await getNews(params.id)
        return (
          <div className={styles.newsContainer}>
            <h1 className={styles.title}>{news.title}</h1>
             <div className={styles.authorContainer}>
                    <img className={styles.authorImage} src={news.author.image.url}/>
                    <p className={styles.authorName}>{news.author.name}</p>
              </div>
            <p className={styles.date}>{news.createdAt}</p>
            <img className={styles.thumbnail} src={news.thumbnail.url} />
            <NewsArticleDetails news={news}/>
            </div>
          );  
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function generateStaticParams(){
    const res = await getNewsList()
    const params = res.map(item => {
        return { id: item.id.toString() };
      })
    return params
}