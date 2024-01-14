import { StringDecoder } from "string_decoder";
import { getNewsListByCategory } from "../../../_features/news/api/getNewsListByCategory"
import { getNewsList } from "../../../_features/news/api/getNewsList"
import { getAuthorList } from "../../../_features/news/api/getAuthorList"
import { getAuthor} from "../../../_features/news/api/getAuthor"
import styles from './page.module.scss'; // SCSSファイルを読み込む 
import Title from '../../../_components/ui/title/title'
import CategoryList from "../../../_components/ui/categoryList/categoryList"
import NewsArticle from "../../../_components/page/article/NewsArticle";
import Pagination from "../../../_components/ui/pagination/pagenation"
import ArticleList from  "../../../_components/page/news/ArticleList"
import type { Metadata, ResolvingMetadata } from 'next'
import { FaLinkedin, FaTwitterSquare } from "react-icons/fa";

  
export async function generateMetadata({ params }: { params: { name: string } }, parent: ResolvingMetadata): Promise<Metadata> {
    const author = await getAuthor(params.name)
    let title = author.name
    let description = `ニュースの著者に関してまとめサイト。${author.name}について知る。`
    return {
        title,
        description,
        openGraph: {
        title,
        description,
        url: `https://${process.env.MTT_DOMAIN}`,
        siteName: 'metaTrendTalks.com',
        images: [
            {
            url: author.image.url,
            width: 800,
            height: 600,
            },
            {
            url: author.image.url,
            width: 1800,
            height: 1600,
            },
        ],
        locale: 'ja_JP',
        type: 'website',
        },
    }
  }
  

export default async function Page({params}: {params : {name: string}}){
    try {
        const author = await getAuthor(params.name)
    return (
        <div className={styles.author}>
            <div className={styles.authorContainer}>
                <div className={styles.name}>
                    <h1>
                        About {author.name}    
                    </h1>
                </div>
            </div> 
                <div className={styles.metaContainer}>
                    <div className={styles.image}>
                        <img src={author.image.url} alt={`${author.name}の画像`} />
                    </div>
                    <div className={styles.description}>
                    <div dangerouslySetInnerHTML={{ __html: author.description }} />
                    </div>
                <div className={styles.media}>
                    <div className={styles.mediaTitle}>
                        Social Media
                    </div>
                    <div className={styles.mediaIcon}>
                        <a href={author.linkedin} target='_blank'>
                        <FaLinkedin size={30} color={'#0A66C2'}></FaLinkedin>
                        </a>
                        <a href={author.twitter} target='_blank'>
                            <FaTwitterSquare size={30} color={'#199CF0'}></FaTwitterSquare>
                        </a>
                    </div>
                    </div>
                </div> 
        </div>
      );
    } catch (error) {
        console.log('build error', error)
        return error
    }
}

export async function generateStaticParams(){
    const res = await getAuthorList()
    const params = res.map(item => {
        return { name: item.id.toString()};
    })
    return params
}