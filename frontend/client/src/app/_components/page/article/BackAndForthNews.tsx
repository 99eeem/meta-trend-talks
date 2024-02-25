import React from 'react';
import styles from './BackAndForthNews.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { NewsWithRelatedNewsType } from '../../../_const/interface/news';
import Link from 'next/link';
import next from 'next';

const BackAndForthNews = ({ item }: { item: any }) => {
  return (
    <>
      {Object.keys(item).length && (
        <div className={styles.backAndForthNews}>
          <Link href={`/article/${item.back.id}`} className={styles.backNews}>
            <FaChevronLeft color={'#CCCCCC'} />
            <div className={styles.news}>
              <div>
                <span>前の記事</span>
                <h5>{item.back.title}</h5>
              </div>
            </div>
          </Link>
          <Link href={`/article/${item.next.id}`} className={styles.nextNews}>
            <div className={styles.news}>
              <div>
                <span>次の記事</span>
                <h5>{item.next.title}</h5>
              </div>
            </div>
            <FaChevronRight color={'#CCCCCC'} />
          </Link>
        </div>
      )}
    </>
  );
};
export default BackAndForthNews;
