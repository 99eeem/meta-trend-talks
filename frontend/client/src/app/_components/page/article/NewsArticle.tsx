"use client" 
import React from 'react';
import styles from './NewsArticle.module.scss';
import Link from 'next/link'
import {extractFirstPTag} from '../../../_features/news/function/extractFirstPTag'

interface Props {
  date: string,
  title: string,
  id: string,
  category: string,
  thumbnail: string,
  author?: {
    name: string | null
    image: {
      url: string | null
    }
  }
  body?: string,
  isShowImage?: boolean
}

const NewsArticle = ({date, title, id, category, thumbnail, author = {name: null, image: {url: null}}, body = undefined, isShowImage = false}: Props) => {
  const discription: string | TrustedHTML = body ? extractFirstPTag(body) : '';
  return ( 
    <Link className={`${styles.newsArticle}  ${isShowImage ? styles.show : ''}`} href={`/article/${id}`}>
      { isShowImage && <img src={thumbnail} className={`${styles.newsImage}`}/>}
      <div className={styles.metaInfo}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.category}>{category}</span><span>{date}</span>
        <div className={styles.authorContainer}>
          {author.image.url && <img className={styles.authorImage} src={author.image.url} />}          
          <p className={styles.authorName}>{author.name}</p>
        </div>
        { body && <div className={styles.body} dangerouslySetInnerHTML={{ __html: discription }}/>}
      </div>
    </Link>
  );
}

export default NewsArticle;