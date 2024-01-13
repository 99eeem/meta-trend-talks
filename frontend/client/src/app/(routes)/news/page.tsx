
import { getNewsByFullTextSearch } from "../../_features/news/api/getNewsByFullTextSearch";
import Title from "./../../_components/ui/title/title";
import ArticleList from "./../../_components/page/news/ArticleList";
import SearchArticleList from '../../_components/page/news/SearchArticleList'
import { Metadata } from 'next'
import styles from './page.module.scss'; // SCSSファイルを読み込む 

export async function generateMetadata(
    { params, searchParams }: any,
    parent: any
  ): Promise<Metadata> {
    return {
      title: `検索結果`, 
      description: 'ニュースを検索結果でまとめた情報サイト。Web3、NFT、Defiなど、幅広いトピックを網羅。いち早く最新の出来事をキャッチしよう。',
      openGraph: {
      title: '検索結果',
      description: 'ニュースを検索結果でまとめた情報サイト。Web3、NFT、Defiなど、幅広いトピックを網羅。いち早く最新の出来事をキャッチしよう。',
      url: `https://${process.env.MTT_DOMAIN}`,
      siteName: 'metaTrendTalks.com',
      images: [
        {
          url: '/image/logo.png',
          width: 800,
          height: 600,
        },
        {
          url: '/image/logo.png',
          width: 1800,
          height: 1600,
        },
      ],
      locale: 'ja_JP',
      type: 'website',
    },
    }
  }

export default function Page() {
  return (
    <div className={styles.searchArticle}>
      <SearchArticleList/>
    </div>
  );
}