'use client';
import React from 'react';
import styles from './MainNewsArticle.module.scss';
import NewsArticle from './NewsArticle';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { extractFirst200Word } from '../../../_features/news/function/extractFirst200Word';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles.customNextArrow} onClick={onClick}>
      <FiChevronRight />
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles.customPrevArrow} onClick={onClick}>
      <FiChevronLeft />
    </div>
  );
};
const MainNewsArticle = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplaySpeed: 8000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  return (
    <div className={styles.MainNewsArticle}>
      <Slider {...settings} className={styles.slider}>
        {props.contents.map((item, index) => (
          <Link className={styles.newsArticle} href={`/article/${item.id}`} key={index}>
            <img
              src={item.thumbnail.url}
              className={`${styles.newsThumbnail}`}
              alt={`${item.title}の記事の画像`}
            />
            <div className={styles.metaInfo}>
              <h3 className={styles.title}>{item.title}</h3>
              <span className={styles.category}>{item.category.name}</span>
              <span>{item.createdAt}</span>
              <div className={styles.authorContainer} href={`/author/${item.author.id}`}>
                <img
                  className={styles.authorImage}
                  src={item.author.image.url}
                  alt={`${item.author.name}の画像`}
                />
                <p className={styles.authorName}>{item.author.name}</p>
              </div>
              <p className={styles.body}>{item.body ? extractFirst200Word(item.body) : ''}</p>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default MainNewsArticle;
