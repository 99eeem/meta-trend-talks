import { StringDecoder } from 'string_decoder';
import { getNewsListByCategory } from '../../../_features/news/api/getNewsListByCategory';
import { getNewsList } from '../../../_features/news/api/getNewsList';
import { getCategoryList, getCategory } from '../../../_features/news/api/getNewsCategory';
import styles from './page.module.scss'; // SCSSファイルを読み込む
import Title from '../../../_components/ui/title/title';
import CategoryList from '../../../_components/ui/categoryList/categoryList';
import NewsArticle from '../../../_components/page/article/NewsArticle';
import Pagination from '../../../_components/ui/pagination/pagenation';
import ArticleList from '../../../_components/page/news/ArticleList';
import type { Metadata, ResolvingMetadata } from 'next';
import { NewsType } from '../../../_const/interface/news';

export async function generateMetadata(
  { params }: { params: { name: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  let news: NewsType[] = [];
  let title: string | undefined = undefined;
  let description: string | undefined = undefined;
  if (params.name === 'all') {
    title = '全てのニュース';
    description = `ニュースを全てまとめた情報サイト。Web3、NFT、Defiなど、幅広いトピックを網羅。いち早く最新の出来事をキャッチしよう。`;
  } else {
    const category = await getCategory(params.name);
    news = await getNewsListByCategory(category[0].id);
    title = category[0].name;
    description = `ニュースを${category[0].name}の項目でまとめた情報サイト。${category[0].name}のニュースを網羅。いち早く最新の出来事をキャッチしよう。`;
  }
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
          url: `https://${process.env.MTT_DOMAIN}/images/meta.png`,
          width: 800,
          height: 600,
        },
        {
          url: `https://${process.env.MTT_DOMAIN}/images/meta.png`,
          width: 1800,
          height: 1600,
        },
      ],
      locale: 'ja_JP',
      type: 'website',
    },
  };
}

export default async function Page({ params }: { params: { name: string } }) {
  try {
    let news: NewsType[] = [];
    let title: string | undefined = undefined;
    if (params.name === 'all') {
      news = await getNewsList();
      title = '全てのニュース';
    } else {
      const category = await getCategory(params.name);
      if (!category.length) return;
      news = await getNewsListByCategory(category[0].id);
      title = category[0].name;
    }
    return (
      <div className={styles.newsByCategory}>
        <div className={styles.leftContainer}>
          <Title title={title} />
          <ArticleList news={news} />
        </div>
        <div className={styles.rightContainer}>
          <CategoryList />
        </div>
      </div>
    );
  } catch (error) {
    console.log('build error', error);
    return error;
  }
}

export async function generateStaticParams() {
  const res = await getCategoryList();
  const params = res.map((item) => {
    return { name: item.link.toString() };
  });
  params.push({ name: 'all' });
  return params;
}
