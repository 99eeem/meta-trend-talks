'use client';
import React, { useState, useEffect } from 'react';
import styles from './ArticleList.module.scss';
import NewsArticle from '../article/NewsArticle';
import Pagination from '../../ui/pagination/pagenation';
import { toPassedHours } from '../../../_features/news/function/toPassedHours';
const ArticleList = (props: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 1ページあたりのアイテム数
  const [data, setData] = useState([]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  useEffect(() => {
    // データを設定する処理をuseEffect内で行う
    setData(props.news);
  }, [props.news]);
  return (
    <div className={styles.articleList}>
      {currentItems.map((item: any, index: number) => (
        <div className={styles.categoryNews} key={item.id}>
          <NewsArticle
            date={toPassedHours(item.createdAt)}
            title={item.title}
            id={item.id}
            category={item.category.name}
            thumbnail={item.thumbnail.url}
            author={item.author}
            body={item.body}
            type="category"
          />
        </div>
      ))}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ArticleList;
