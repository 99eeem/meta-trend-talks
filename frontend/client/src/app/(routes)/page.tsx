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
        <img
          className={styles.mainBanner}
          src="/images/web3ConnectJapan.png"
          alt="main page banner"
        />
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
        <div className={styles.aboutUsContainer}>
          <div className={styles.textBox}>
            <h3>BUILDING BRIDGES TO JAPAN'S DECENTRALIZED FUTURE</h3>
            <p>
              <span>MetaTrendTalks</span>
              は、最新のWEB3.0ニュースとメディアを通じて、ブロックチェーンや暗号通貨のテクノロジーと、我々と共存できる未来の架け橋となることを目指しています。我々の目標は、日本と分散型ネットワークの未来を結ぶことです。
            </p>
          </div>
          <div className={styles.imageBox}>
            <div className={styles.backgroundImage}></div>
            <div className={styles.stage}>
              <div className={styles.cube}>
                <div className={`${styles.panel} ${styles.front}`}>
                  <p>Crypto</p>
                </div>
                <div className={`${styles.panel} ${styles.back}`}>
                  <p>NFT</p>
                </div>
                <div className={`${styles.panel} ${styles.left}`}>
                  <p>DeFi</p>
                </div>
                <div className={`${styles.panel} ${styles.right}`}>
                  <p>DAO</p>
                </div>
                <div className={`${styles.panel} ${styles.top}`}>
                  <p>Bitcoin</p>
                </div>
                <div className={`${styles.panel} ${styles.bottom}`}>
                  <p>Meta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
