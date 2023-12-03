import React from 'react';
import styles from './categoryList.module.scss';
import Link from "next/link"
import Title from '../title/title'
import { getCategoryList } from '../../../_features/news/api/getNewsCategory';

const CategoryList = async ({}) => {
  const categories = await getCategoryList()
  return (
    <div className={styles.categoryList}>
          <Title title='カテゴリー'/>
          <Link className={styles.category}  href={`/news/all`}>All</Link>
            { categories.map((item, index)=>{
              return <Link className={styles.category} key={item.name} href={`/news/${item.link}`}>{item.name}</Link>
            })}
    </div>
  );
}

export default CategoryList;