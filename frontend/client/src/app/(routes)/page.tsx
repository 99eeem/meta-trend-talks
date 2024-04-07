import styles from './page.module.scss'; // SCSSファイルを読み込む
import NewsArticle from '../_components/page/article/NewsArticle';
import Title from '../_components/ui/title/title';
import { getNewsList } from '../_features/news/api/getNewsList';
import { getRecommendNews } from '../_features/news/api/getRecommendNews';
import MainNewsArticle from '../_components/page/article/MainNewsArticle';
import MoreItems from '../_components/ui/moreItems/moreItems';
import type { Metadata } from 'next';
import CategoryList from '../_components/ui/categoryList/categoryList';
import { NewsType } from '../_const/interface/news';
import CryptoCurrencyRateList from '../_components/ui/cryptoCurrencyRateList/cryptoCurrencyRateList';
import { DEVICE_WIDTH } from '../_const/value/deviceWidth';

export const metadata: Metadata = {
  title: 'Web3ニュースサイト | metaTrendTalks.com',
  description: '様々なジャンルのweb3に関係のあるニュースを発信しています。',
  openGraph: {
    title: 'Web3ニュースサイト | metaTrendTalks.com',
    description: '様々なジャンルのweb3に関係のあるニュースを発信しています。',
    url: `https://${process.env.MTT_DOMAIN}`,
    siteName: 'metaTrendTalks.com',
    images: [
      {
        url: `https://${process.env.MTT_DOMAIN}/images/logo.png`,
        width: 800,
        height: 600,
      },
      {
        url: `https://${process.env.MTT_DOMAIN}/images/logo.png`,
        width: 1800,
        height: 1600,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
};

const Home = async () => {
  const contents = await getNewsList(10);
  const recommendNews: NewsType[] = await getRecommendNews('true');
  return (
    <div className={styles.home}>
      <div className={styles.cryptListContainer}>
        <CryptoCurrencyRateList />
      </div>
      <div className={styles.allContainer}>
        <div className={styles.topContainer}>
          <MainNewsArticle contents={contents.slice(0, 4)} />
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.latestNewsContainer}>
            <Title title="最新のニュース" />
            <div>
              {contents.map((item, index) => (
                <div className={styles.latestNews} key={index}>
                  <NewsArticle
                    key={index}
                    date={item.createdAt}
                    title={item.title}
                    id={item.id}
                    category={item.category.name}
                    thumbnail={item.thumbnail.url}
                    author={item.author}
                    body={item.body}
                    type="new"
                  />
                </div>
              ))}
            </div>
            <MoreItems text="View More" href="news/all" />
          </div>
          <div className={styles.rightContainer}>
            <CategoryList />
            <div className={styles.recommendedNewsConatiner}>
              <Title title="おすすめのニュース" />
              <div className={styles.recommendedNewsBox}>
                {recommendNews.map((item, index) => (
                  <div className={styles.recommendedNews} key={index}>
                    <NewsArticle
                      key={index}
                      date={item.createdAt}
                      title={item.title}
                      id={item.id}
                      category={item.category.name}
                      thumbnail={item.thumbnail.url}
                      isfixedHeight={true}
                      type="recommended"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
