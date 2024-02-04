'use client';
import React from 'react';
import styles from './NewsArticle.module.scss';
import Link from 'next/link';
import { extractFirstPTag } from '../../../_features/news/function/extractFirstPTag';

interface Props {
  date: string;
  title: string;
  id: string;
  category: string;
  thumbnail: string;
  author?: {
    name: string | null;
    image: {
      url: string | null;
    };
    id: string | null;
  };
  body?: string;
  isShowImage?: boolean;
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
  isShowImage = false,
  isfixedHeight = false,
}: Props) => {
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
