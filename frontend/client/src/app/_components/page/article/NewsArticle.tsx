'use client';
import React, { useEffect, useState } from 'react';
import styles from './NewsArticle.module.scss';
import Link from 'next/link';
import { extractFirstPTag } from '../../../_features/news/function/extractFirstPTag';
import { DEVICE_WIDTH } from '../../../_const/value/deviceWidth';

interface Props {
  date: string;
  title: string;
  id: string;
  category: string;
  thumbnail: string;
  type: string;
  author?: {
    name: string | null;
    image: {
      url: string | null;
    };
    id: string | null;
  };
  body?: string;
  isfixedHeight?: boolean;
}

const NewsArticle = ({
  date,
  title,
  id,
  category,
  thumbnail,
  author = { name: null, image: { url: null }, id: null },
  body = undefined,
  type,
  isfixedHeight = false,
}: Props) => {
  const [isShowImage, setIsShowImage] = useState(false);
  const setIsShowImageByType = () => {
    switch (type) {
      case 'new':
        if (window.innerWidth > DEVICE_WIDTH.MD) return true;
        else return false;
      case 'category':
        if (window.innerWidth > DEVICE_WIDTH.MD) return true;
        else return false;
      case 'related':
        return true;
      case 'recommended':
        if (window.innerWidth < DEVICE_WIDTH.MD) return true;
        else return false;
      default:
        return false;
    }
  };
  useEffect(() => {
    function handleWindowWidth() {
      const res = setIsShowImageByType();
      setIsShowImage(res);
    }
    window.addEventListener('resize', handleWindowWidth);
    return () => {
      window.removeEventListener('resize', handleWindowWidth);
    };
  }, []);
  const discription: string = body ? extractFirstPTag(body) : '';
  return (
    <Link
      className={`${styles.newsArticle}  ${isShowImage ? styles.show : ''} `}
      href={`/article/${id}`}
    >
      {isShowImage && (
        <img
          src={thumbnail}
          className={`${styles.newsImage} ${isfixedHeight ? styles.fixed : ''}`}
          alt={`${title}の記事の画像`}
        />
      )}
      <div className={styles.metaInfo}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.category}>{category}</span>
        <span>{date}</span>
        <div className={styles.authorContainer}>
          {author.image.url && (
            <img
              className={styles.authorImage}
              src={author.image.url}
              alt={`${author.name}の画像`}
            />
          )}
          <p className={styles.authorName}>{author.name}</p>
        </div>
        {body && <p className={styles.body}>{discription}</p>}
      </div>
    </Link>
  );
};

export default NewsArticle;
