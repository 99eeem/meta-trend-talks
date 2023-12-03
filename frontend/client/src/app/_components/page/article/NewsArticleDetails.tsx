"use client" 
import React, {useEffect } from 'react';

import styles from './NewsArticleDetails.module.scss';


const NewsArticleDetails = ({ news }: any) => {
    useEffect(() => {
    // コンポーネントがマウントされた後にDOMを変更
    const addBlankTargetToLinks = () => {
      const links = document.querySelectorAll(".newsArticleDetails a");
      console.log(links)
      links.forEach(link => {
        link.setAttribute('target', '_blank');
      });
    };
    addBlankTargetToLinks();
  }, [news.body]);
  return ( 
      <div className={`${styles.body} newsArticleDetails`} dangerouslySetInnerHTML={{ __html: news.body }} />
  );
}

export default NewsArticleDetails;