import { StringDecoder } from 'string_decoder';
import { getNews } from '../../../_features/news/api/getNews';
import { getNewsList } from '../../../_features/news/api/getNewsList';
import styles from './page.module.scss'; // SCSSファイルを読み込む
import { NewsWithRelatedNewsType } from '../../../_const/interface/news';
import NewsArticleDetails from '../../../_components/page/article/NewsArticleDetails';
import { Metadata } from 'next';
import Link from 'next/link';
// import {getNewsByRelatedNewsIds} from "../../../_features/news/api/getNewsByRelatedNewsIds"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // read route params
  const id = params.id;
  // fetch data
  const news = await getNews(params.id);
  return {
    title: !news.seoTitle ? news.title : news.seoTitle,
    description: !news.seoMeta ? undefined : news.seoMeta,
    openGraph: {
      title: !news.seoTitle ? news.title : news.seoTitle,
      description: !news.seoMeta ? undefined : news.seoMeta,
      url: `https://${process.env.MTT_DOMAIN}`,
      siteName: 'metaTrendTalks.com',
      images: [
        {
          url: news.thumbnail.url,
          width: 800,
          height: 600,
        },
        {
          url: news.thumbnail.url,
          width: 1800,
          height: 1600,
        },
      ],
      locale: 'ja_JP',
      type: 'website',
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const news: NewsWithRelatedNewsType = await getNews(params.id);
    return (
      <div className={styles.newsContainer}>
        <h1 className={styles.title}>{news.title}</h1>
        <Link className={styles.authorContainer} href={`/author/${news.author.id}`}>
          <img
            className={styles.authorImage}
            src={news.author.image.url}
            alt={`${news.author.name}の画像`}
          />
          <p className={styles.authorName}>{news.author.name}</p>
        </Link>
        <p className={styles.date}>{news.createdAt}</p>
        <img
          className={styles.thumbnail}
          src={news.thumbnail.url}
          alt={`${news.title}の記事のサムネイル`}
        />
        <NewsArticleDetails news={news} />
      </div>
    );
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function generateStaticParams() {
  const res = await getNewsList();
  const params = res.map((item) => {
    return { id: item.id.toString() };
  });
  return params;
}
