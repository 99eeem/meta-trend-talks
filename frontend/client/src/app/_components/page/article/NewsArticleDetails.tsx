"use client" 
import React, {useEffect, useState } from 'react';
import cheerio from 'cheerio';
import styles from './NewsArticleDetails.module.scss';
import ArticleAgenda from './ArticleAgenda';


const NewsArticleDetails = ({ news }: any) => {
  type AgendaItem = {
  text: string;
  id: string;
  name: string;
};

const [agenda, setAgenda] = useState<AgendaItem[]>([]);
    useEffect(() => {
    // コンポーネントがマウントされた後にDOMを変更
    const addBlankTargetToLinks = () => {
      const links = document.querySelectorAll(".newsArticleDetails a");
      links.forEach(link => {
        link.setAttribute('target', '_blank');
      });
    };
    const getAgenda = (() => {
      const $ = cheerio.load(news.body);
      const headings = $('h2, h3').toArray();
      const toc: any[] = headings.map(data => ({
        text: (data.children[0] as any).data,
        id: data.attribs.id,
        name: data.name
      }));
      return toc;
    });
      addBlankTargetToLinks();
      const agenda = getAgenda();
      setAgenda(agenda);
    }, [news.body]);
  return ( 
    <div>
     <ArticleAgenda items={agenda} />
      <div className={`${styles.body} newsArticleDetails`} dangerouslySetInnerHTML={{ __html: news.body }} />
    </div>
  );
}

export default NewsArticleDetails;