'use client';
import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import styles from './NewsArticleDetails.module.scss';
import ArticleAgenda from './ArticleAgenda';
import Title from '../../ui/title/title';
import NewsArticle from '../article/NewsArticle';
import BackAndForthNews from './BackAndForthNews';
import { NewsWithRelatedNewsType } from '../../../_const/interface/news';
import { FaRegCopy, FaTwitterSquare, FaLinkedin } from 'react-icons/fa';
import { FaLine } from 'react-icons/fa6';
import { BsArrowUpSquareFill } from 'react-icons/bs';
import { getNewsByCreatedAtAndCategory } from '@/app/_features/news/api/getNewsByCreatedAtAndCategory';

const NewsArticleDetails = ({ news }: { news: NewsWithRelatedNewsType }) => {
  type AgendaItem = {
    text: string;
    id: string;
    name: string;
  };
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [backAndForthNews, setBackAndForthNews] = useState<{}>({});
  const goToTop: any = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const backAndForthNews = await getNewsByCreatedAtAndCategory(
          news.createdAt,
          news.category.id,
          news.id
        );
        setBackAndForthNews(backAndForthNews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    // コンポーネントがマウントされた後にDOMを変更
    const addBlankTargetToLinks = () => {
      const links = document.querySelectorAll('.newsArticleDetails a');
      links.forEach((link) => {
        link.setAttribute('target', '_blank');
      });
    };
    const getAgenda = () => {
      const $ = cheerio.load(news.body);
      const headings = $('h2, h3').toArray();
      const toc: any[] = headings.map((data) => ({
        text: (data.children[0] as any).data,
        id: data.attribs.id,
        name: data.name,
      }));
      return toc;
    };
    addBlankTargetToLinks();
    const agenda = getAgenda();
    setAgenda(agenda);
  }, [news.body]);
  return (
    <div className={styles.newsArticleDetails}>
      <div className={styles.details}>
        <ArticleAgenda items={agenda} />
        <div className={styles.mainContentContainer}>
          <div className={styles.sidebar}>
            <a
              href={`https://twitter.com/intent/tweet?text=${news.title}%3F+Learn+more+at%3A+https://${process.env.NEXT_PUBLIC_MTT_DOMAIN}/article/${news.id}&original_referer=https://${process.env.MTT_DOMAIN}/article/${news.id}`}
              target="_blank"
            >
              <FaTwitterSquare color={'#199CF0'}></FaTwitterSquare>
            </a>
            <a
              href={`https://social-plugins.line.me/lineit/share?url=https://${process.env.NEXT_PUBLIC_MTT_DOMAIN}/article/${news.id}&text=${news.title}%3F+Learn+more+at`}
              target="_blank"
            >
              <FaLine color={'#37B900'}></FaLine>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://${process.env.NEXT_PUBLIC_MTT_DOMAIN}/article/${news.id}`}
              target="_blank"
            >
              <FaLinkedin color={'#0A66C2'}></FaLinkedin>
            </a>
            <a onClick={goToTop}>
              <BsArrowUpSquareFill color={'#CCCCCC'}></BsArrowUpSquareFill>
            </a>
          </div>
          <div className={`${styles.body}`} dangerouslySetInnerHTML={{ __html: news.body }} />
        </div>
        <BackAndForthNews item={backAndForthNews} />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.relatedNewsConatiner}>
          <Title title="関連のニュース" />
          <div className={styles.relatedNewsBox}>
            {news.relatedNewsIds.map((item, index) => (
              <div className={styles.relatedNews} key={index}>
                <NewsArticle
                  key={index}
                  date={item.createdAt}
                  title={item.title}
                  id={item.id}
                  category={item.category.name}
                  thumbnail={item.thumbnail.url}
                  isfixedHeight={true}
                  type="related"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticleDetails;
