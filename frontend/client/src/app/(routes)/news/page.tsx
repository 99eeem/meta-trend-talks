
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
      title: `検索結果` 
    }
  }

export default function Page() {
  return (
    <div className={styles.searchArticle}>
      <SearchArticleList/>
    </div>
  );
}